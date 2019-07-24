import express from 'express';

import Revenue from './model';


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

router.post('/edit-revenue', async (req, res) => {
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

router.delete('/delete-revenue/:id', (req, res) => {
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
})

export default router;