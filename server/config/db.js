import mongoose from 'mongoose';

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.DATABASE_URL, {
            useNewUrlParser: true,
            useCreateIndex: true,
            useFindAndModify: false
        });
        console.log("MongoDB  is connected successfully");
    } catch (error) {
        console.error(error.message);
        process.exit(1);
    }
}

export default connectDB;