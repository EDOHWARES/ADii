import mongoose from "mongoose";

const priceSchema = new mongoose.Schema({
    Abia: { type: String, default: "0" },
    Adamawa: { type: String, default: "0" },
    AkwaIbom: { type: String, default: "0" },
    Anambra: { type: String, default: "0" },
    Bauchi: { type: String, default: "0" },
    Bayelsa: { type: String, default: "0" },
    Benue: { type: String, default: "0" },
    Borno: { type: String, default: "0" },
    CrossRiver: { type: String, default: "0" },
    Delta: { type: String, default: "0" },
    Ebonyi: { type: String, default: "0" },
    Edo: { type: String, default: "0" },
    Ekiti: { type: String, default: "0" },
    Enugu: { type: String, default: "0" },
    Gombe: { type: String, default: "0" },
    Imo: { type: String, default: "0" },
    Jigawa: { type: String, default: "0" },
    Kaduna: { type: String, default: "0" },
    Kano: { type: String, default: "0" },
    Katsina: { type: String, default: "0" },
    Kebbi: { type: String, default: "0" },
    Kogi: { type: String, default: "0" },
    Kwara: { type: String, default: "0" },
    Lagos: { type: String, default: "0" },
    Nasarawa: { type: String, default: "0" },
    Niger: { type: String, default: "0" },
    Ogun: { type: String, default: "0" },
    Ondo: { type: String, default: "0" },
    Osun: { type: String, default: "0" },
    Oyo: { type: String, default: "0" },
    Plateau: { type: String, default: "0" },
    Rivers: { type: String, default: "0" },
    Sokoto: { type: String, default: "0" },
    Taraba: { type: String, default: "0" },
    Yobe: { type: String, default: "0" },
    Zamfara: { type: String, default: "0" },
    FCT: { type: String, default: "0" },
});

const commoditySchema = new mongoose.Schema({
    name: {type: String, required: true, unique: true},
    type: {type: String, required: true},
    price: { type: [priceSchema], default: [{}] },
});

const commodityModel = mongoose.models.commodity || mongoose.model('commodity', commoditySchema);
export default commodityModel;