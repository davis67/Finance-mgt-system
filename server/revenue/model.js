import mongoose, {
    Schema
} from 'mongoose';

const revenueSchema = mongoose.Schema({
    amount: {
        type: String,
        required: true
    },
    totalSales: {
        type: Number,
        required: false
    },
    totalExpenses: {
        type: Number,
        required: false
    }
}, {
    timestamps: true
});

export default mongoose.model('Revenue', revenueSchema);