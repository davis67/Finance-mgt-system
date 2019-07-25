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

router.get('/revenue/:id', async (req, res) => {
    let totalSales = 0;
    let revenue = 0;
    Revenue.findById(req.params.id, (error, data) => {
        revenue = data.amount
    });
    console.log(revenue)
    Sales.find({
        Revenue: req.params.id
    }, (error, data) => {
        if (error) {
            res.json({
                "message": "An error has been encountered"
            });
        }
        data.filter(data => {
            totalSales += parseInt(data.amount);
        })
        res.json({
            "totalSales": totalSales,
            "revenue": revenue
        });
    });
});

export default router;