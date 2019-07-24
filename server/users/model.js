import mongoose from 'mongoose';


const UserSchema = mongoose.Schema({
    email: {
        type: String,
        required: true,
        trim: true,
        unique: 1
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
    },
    username: {
        type: String,
        required: true
    },

    role: {
        type: Number,
        default: 0
    }
});

export default mongoose.model('User', UserSchema);