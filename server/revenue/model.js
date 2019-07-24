import mongoose, {
    Schema
} from 'mongoose';

const revenueSchema = mongoose.Schema({
    amount: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

export default mongoose.model('Revenue', revenueSchema);