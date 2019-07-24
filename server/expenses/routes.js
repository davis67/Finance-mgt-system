import express from 'express';
import Expense from './model';
const router = express.Router();

router.post('/add-expense', async (req, res) => {

    const {
        name,
        quantity,
        unitPrice,
        Revenue
    } = req.body;
    const totalPrice = setTotalPrice(parseInt(quantity), parseInt(unitPrice));

    try {
        // console.log(totalPrice)

        const expense = new Expense({
            name,
            quantity,
            unitPrice,
            Revenue,
            totalPrice
        })
        // console.log(`total-price-${expense}`)\

        await expense.save();
        res.json({
            "message": "An expense has been successfully saved"
        })

    } catch (error) {
        console.log(error.message)
    }


});

// set the total price

function setTotalPrice(quantity, unitPrice) {
    return quantity * unitPrice;
};

export default router