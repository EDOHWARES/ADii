import commodityModel from "../models/commodityModel.js";


// Get all commodities
const getAllCommodities = async (req, res) => {
    try {
        const commodities = await commodityModel.find();

        if (commodities.length > 0) {
            return res.status(200).json({
                success: true,
                commodities,
            });
        } else {
            return res.status(201).json({
                success: true,
                commodities: [],
                message: 'No available commdity!'
            })
        }

        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch commodities',
            error: error.message,
        });
    };
};


export {getAllCommodities};