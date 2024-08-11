import mongoose from "mongoose";

const priceSchema = new mongoose.Schema({
    Oyo: String,
    Lagos: String,
    Ondo: String,
    Osun: String,
    Ogun: String,
    Benue: String,
    Kano: String,
    Kaduna: String,
    Kogi: String,
    Bauchi: String,
    Abia: String,
    Sokoto: String,
    Ebonyi: String,
    Edo: String,
    Plateau: String,
});

const commoditySchema = new mongoose.Schema({
    name: {type: String, required: true, unique: true},
    type: {type: String, required: true},
    price: [priceSchema],
});

const commodityModel = mongoose.models.commodity || mongoose.model('commodity', commoditySchema);
export default commodityModel;