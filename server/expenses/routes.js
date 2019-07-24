import express from 'express';

const router = express.Router();

router.post('/add-expense', async (req, res) => {

    const {
        name,
        quantity,
        unitPrice,
        Revenue
    } = req.body;

    try {

        const expense = new expense({
            name,
            quantity,
            unitPrice,
            Revenue,
        })

    } catch (error) {
        console.log(error.message)
    }


});

// set the total price

setTotalPrice = (quantity, unitPrice) => quantity * unitPrice;