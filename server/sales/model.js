import mongoose, {
    Schema
} from 'mongoose';
import Revenue from '../revenue/model';


const salesSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    amount: {
        type: Number,
        required: true
    },
    date_of_sales: {
        type: Date,
        required: true
    },
    Revenue: {
        type: Schema.Types.ObjectId,
        ref: "Revenue"
    }

}, {
    timestamps: true
});

export default mongoose.model('Sales', salesSchema);