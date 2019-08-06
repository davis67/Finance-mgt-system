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
        await expense.save();
        res.json({
            "message": "An expense has been successfully saved"
        })

    } catch (error) {
        console.log(error.message)
    }


});
router.get("/:id", (req, res) => {
    Expense.findById(req.params.id)
        .then(expense => {
            if (!expense) {
                return res.status(404).json({
                    message: 'Expense not found with id ' + req.params.id
                });
            }
            res.json(expense);
        })
        .catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).json({
                    message: 'Expense not found with id ' + req.params.id
                });
            }
            return res.status(500).json({
                message: 'Error retrieving expense with id ' + req.params.id
            });
        });
})
router.put("/edit/:id", (req, res) => {
    Expense.findByIdAndUpdate(req.params.id, req.body, {
            new: true
        })
        .then(expense => {
            if (!expense) {
                return res.status(404).json({
                    error: 'Failed Updating Expense.Please check and try again!'
                });
            }
            res.json({
                message: 'Expense Updated Successfully',
                expense
            });
        })
        .catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).json({
                    message: 'Expense not found with id ' + req.params.id
                });
            }
            return res.status(500).json({
                message: 'Error updating note with id ' + req.params.id
            });
        })
});

router.delete('/delete/:id', (req, res) => {
    Expense.findByIdAndRemove(req.params.id)
        .then(expense => {
            if (!expense) {
                return res.status(404).json({
                    message: 'Expense not found with id ' + req.params.id
                });
            }
            res.json({
                message: 'Expense deleted successfully!'
            });
        })
        .catch(err => {
            if (err.kind === 'ObjectId' || err.name === 'NotFound') {
                return res.status(404).send({
                    message: 'Expense not found with id ' + req.params.id
                });
            }
            return res.status(500).send({
                message: 'Could not delete Expense with id ' + req.params.id
            });
        });
});

// set the total price

function setTotalPrice(quantity, unitPrice) {
    return quantity * unitPrice;
};

export default router