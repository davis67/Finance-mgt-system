import express from 'express';

import Sales from './model';
import Revenue from '../revenue/model';
const router = express.Router();


router.post('/add-sales', async (req, res) => {
    const {
        name,
        amount,
        Revenue
    } = req.body;

    try {

        const date_of_sales = new Date();

        const sales = new Sales({
            name,
            amount,
            date_of_sales,
            Revenue
        });

        await sales.save();

        res.json({
            "message": "A sale has been recorded successfully"
        });

    } catch (error) {
        res.status(404).json({
            message: "something went wrong..Please try again later"
        })
    }
});

router.get('/revenue/:id', (req, res) => {
    let totalSales = 0;
    let revenue = 0;
    let revenueId;
    Revenue.findById(req.params.id, (error, data) => {
        revenueId = data._id;
        revenue = data.amount
        Sales.find({
            Revenue: req.params.id
        }, (error, sales_data) => {
            if (error) {
                res.json({
                    "message": "An error has been encountered"
                });
            }
            sales_data.filter(data => {
                totalSales += parseInt(data.amount);
            })
            res.status(200).json({
                data: sales_data,
                totalSales: totalSales,
                revenue: revenue,
                revenueId: revenueId
            });
        });
    });

});

router.put("/edit/:id", (req, res) => {
    Sales.findByIdAndUpdate(req.params.id, req.body, {
            new: true
        })
        .then(sale => {
            if (!sale) {
                return res.status(404)
                    .json({
                        error: "Failed Updating Sale.Please check and try again!"
                    });
            }
            res.json({
                message: "Sale Updated SuccessFully"
            });
        })
        .catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).json({
                    message: 'Sale not found with id ' + req.params.id
                });
            }
            return res.status(500).json({
                message: 'Error updating note with id ' + req.params.id
            });
        });
});

router.get("/:id", (req, res) => {
    Sales.findById(req.params.id)
        .then(sale => {
            if (!sale) {
                return res.status(404).json({
                    message: 'Sale not found with id ' + req.params.id
                });
            }
            res.json(sale);
        })
        .catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).json({
                    message: 'Sale not found with id ' + req.params.id
                });
            }
            return res.status(500).json({
                message: 'Error retrieving sale with id ' + req.params.id
            });
        });
})

router.delete('/delete/:id', (req, res) => {
    Sales.findByIdAndDelete(req.params.id)
        .then(sale => {
            res.json({
                message: "Expense deleted successfully"
            });
        })
        .catch(err => {
            if (err.kind === 'ObjectId' || err.name === 'NotFound') {
                return res.status(404).send({
                    message: 'Sale not found with id ' + req.params.id
                });
            }
            return res.status(500).send({
                message: 'Could not delete Sale with id ' + req.params.id
            });
        });
});

export default router;