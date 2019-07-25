import express from 'express';

//model
import Revenue from './model';
import Expense from '../expenses/model';

import authCheck from '../auth/authCheck';
const router = express.Router();

router.post('/add-revenue', async (req, res) => {
    const {
        amount
    } = req.body;
    try {
        const revenue = new Revenue({
            amount
        });
        await revenue.save();
        res.json({
            message: "A new revenue is added successfully"
        });
    } catch (error) {
        console.error(error.message);
    }

});

router.post('/edit-revenue', authCheck, async (req, res) => {
    Revenue.findByIdAndUpdate(req.body._id, req.body, {
        new: true
    }, (error, revenue) => {
        if (error) return res.status(400).send(error);
        res.json({
            success: true,
            "message": "Revenue is updated successfully",
            revenue
        });
    });
});

router.delete('/delete-revenue/:id', authCheck, (req, res) => {
    Revenue.findByIdAndDelete(req.params.id)
        .then(revenue => {
            if (!revenue) {
                return res.status(404).json({
                    "message": 'Book not found. Please try again'
                });
            }

            res.json({
                "message": 'Revenue is deleted successfully'
            });
        })
        .catch(error => {
            if (error.kind === 'ObjectId' || error.name === 'NotFound') {
                return res.status(404).send({
                    message: 'Revenue not found with id ' + req.params.id
                });
            }
            return res.status(500).send({
                message: 'Could not delete revenue with id ' + req.params.id
            });
        });
});

router.get('/revenue/:id', async (req, res) => {
    let totalExpenses = 0;
    let revenue = 0;
    Revenue.findById(req.params.id, (error, data) => {
        revenue = data.amount;
    });
    Expense.find({
        Revenue: req.params.id
    }, (error, data) => {
        data.filter(expense => {
            totalExpenses += parseInt(expense.totalPrice);
        });
        res.status(200).json({
            "totalExpenses": totalExpenses,
            "revenue": revenue
        })
    });
});

export default router;