import farmerModel from "../models/farmerModel.js";

// Create new farmer
const createFarmer = async (req, res) => {
    try {
        const {farmerName, location, crop, contact, farmName} = req.body;

        const farmer = new farmerModel({farmerName, location, crop, contact, farmName});
        await farmer.save();

        res.status(201).json({
            success: true,
            message: 'Farmer created successfully',
            farmer
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error creating farmer',
            error: error.message,
        })
    }
};

// Get all farmers
const getAllFarmers = async (req, res) => {
    try {
        const farmers = await farmerModel.find();
        res.status(200).json({
            success: true,
            farmers
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching farmers',
            error: error.message
        })
    }
};

// Get a single farmer by ID
const getFarmerById = async (req, res) => {

};

// Update a farmer by ID
const updateFarmerById = async (req, res) => {

};

// Delete a farmer by ID
const deleteAFarmer = async (req, res) => {

};

export {createFarmer, getAllFarmers, getFarmerById, updateFarmerById, deleteAFarmer};

