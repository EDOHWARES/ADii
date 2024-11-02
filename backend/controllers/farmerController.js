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
    try {
        const {id} = req.params;
        const farmer = await farmerModel.findById(id);

        if (!farmer) {
            return res.status(404).json({
                success: false,
                message: 'Farmer not found'
            })
        }

        res.status(200).json({
            success: true,
            farmer
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching farmer',
            error: error.message
        })
    }
};

// Update a farmer by ID
const updateFarmerById = async (req, res) => {
    try {
        const {id} = req.params;
        const {farmerName, location, crop, contact, farmName} = req.body;

        const farmer = await farmerModel.findByIdAndUpdate(
            id,
            {farmerName, location, crop, contact, farmName},
            {new: true, runValidators: true}
        );

        if (!farmer) {
            return res.status(404).json({
                success: false,
                message: 'Farmer not found'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Farmer updated successfully',
            farmer
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error updating farmer',
            error: error.message
        })
    }
};

// Delete a farmer by ID
const deleteAFarmer = async (req, res) => {
    try {
        const {id} = req.params;
        const farmer = await farmerModel.findByIdAndDelete(id);

        if (!farmer) {
            return res.status(404).json({
                success: false,
                message: 'Farmer not found',
            })
        }

        res.status(200).json({
            success: true,
            message: 'Farmer deleted successfully',
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error deleting farmer',
            error: error.message
        })
    }
};

export {createFarmer, getAllFarmers, getFarmerById, updateFarmerById, deleteAFarmer};

