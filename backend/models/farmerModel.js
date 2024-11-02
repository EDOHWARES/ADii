import mongoose, { mongo } from "mongoose";

const farmerSchema = new mongoose.Schema({
    farmerName: {
        type: String,
        required: true,
        trim: true
    },
    location: {
        type: String,
        required: true,
        trim: true
    },
    crop: {
        type: String,
        required: true,
        trim: true
    },
    contact: {
        type: String,
        required: true,
        trim: true
    },
    farmName: {
        type: String,
        required: true,
        trim: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const farmerModel = mongoose.models.farmer || mongoose.model('farmer', farmerSchema);
export default farmerModel;