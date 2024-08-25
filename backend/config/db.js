import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const connectDB = async () => {
    // eslint-disable-next-line no-undef
    await mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('DB connected!'));
};

export default connectDB