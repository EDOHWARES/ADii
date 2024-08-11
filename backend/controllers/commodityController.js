import commodityModel from "../models/commodityModel.js";

const getAllCommodities = async (req, res) => {
    try {
        const commodities = await commodityModel.find();

        res.status(200).json({
            success: true,
            commodities,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch commodities',
            error: error.message,
        });
    };
};

const upsertCommodity = async (req, res) => {
    const {name, type, price} = req.body;

    try {
        // Find and update the commodity if it exists
        let commodity = await commodityModel.findOneAndUpdate(
            {name},
            {$set: {type, price}},
            {new: true, upsert: false}
        );

        //If commodity is found, update and save it
        if (commodity) {
            await commodity.save();
            res.status(200).json({
                success: true,
                message: 'Successfully updated',
                commodity,
            });
        } else {
            const newCommodity = new commodityModel({
                name,
                type,
                price,
            });
            await newCommodity.save();

            res.status(201).json({
                success: true,
                message: 'Successfully Added',
                newCommodity,
            });
        };
    } catch (error) {
        console.log(error)
        res.status(500).json({
            success: false,
            message: 'Server error',
        });
    };
};

export {getAllCommodities, upsertCommodity};