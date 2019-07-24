import mongoose, {
    Schema
} from 'mongoose';
import Revenue from '../revenue/model';


const expenseSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        required: false
    },

    unitPrice: {
        type: String,
        required: false
    },
    Revenue: {
        type: Schema.Types.ObjectId,
        ref: 'Revenue'
    },
    totalPrice: {
        type: String,
        required: true
    }
});

export default mongoose.model('Expense', expenseSchema);