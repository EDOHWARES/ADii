import jwt from "jsonwebtoken";
import bcryptjs from "bcryptjs";
import adminModel from "../models/adminModel.js";
import commodityModel from "../models/commodityModel.js";

// Login API
const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Find the admin by username
    const admin = await adminModel.findOne({ username });
    if (!admin) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials - username not found",
      });
    }

    // Compare the provided password with the hashed and stored one
    const isMatch = await bcryptjs.compare(password, admin.password);

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials - wrong secret key",
      });
    }

    // Generate a JWT token
    const token = jwt.sign(
      { id: admin._id, username: admin.username },
      // eslint-disable-next-line no-undef
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    // Send the response with the token
    return res.json({
      success: true,
      message: "Access granted!",
      token,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server Error",
      error: error.message,
    });
  }
};

const dashboard = async (req, res) => {
  res.json({
    success: true,
    message: "dashboard",
  });
};

// Delete Commodity
const deleteCommodity = async (req, res) => {
  try {
    const { name } = req.body;
    let deletedCommodity = await commodityModel.findOneAndDelete({ name });

    if (deletedCommodity) {
      return res.json({
        success: true,
        message: "Commodity Deleted Successfully",
      });
    } else {
      return res.json({
        success: false,
        message: "Commodity Not Found!",
      });
    }
  } catch (error) {
    res.json({
      success: false,
      message: "Server Error",
      error: error.message,
    });
  }
};

// Clear All Commodity
const clearAllCommodities = async (req, res) => {
  try {
    const result = await commodityModel.deleteMany({});

    if (result) {
      return res.json({
        success: true,
        message: "All Commodities Cleared!",
      });
    }
  } catch (error) {
    return res.json({
      success: false,
      message: "Server Error",
      error: error.message,
    });
  }
};

// Update commodity
const updateCommodity = async (req, res) => {
  const { commodityName, updatedPrices } = req.body;

  try {
    // Find the commodity by ID
    const commodity = await commodityModel.findOne({ name: commodityName });

    if (!commodity) {
      return res.status(404).json({
        success: false,
        message: "Commodity not found",
      });
    }

    // Update prices for all states
    const pricesObject = commodity.price[0];

    for (const state in updatedPrices) {
      if (state in pricesObject && updatedPrices[state].length > 1) {
        pricesObject[state] = updatedPrices[state];
      }
    }

    // Save the updated commodity document
    await commodity.save();

    return res.json({
      success: true,
      message: "Prices updated successfully",
      commodity,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server Error",
      error: error.message,
    });
  }
};

// Update or Insert Commodity
const upsertCommodity = async (req, res) => {
  const { name, type, price } = req.body;

  try {
    // Find and update the commodity if it exists
    let commodity = await commodityModel.findOneAndUpdate(
      { name },
      { $set: { type, price } },
      { new: true, upsert: false }
    );

    //If commodity is found, update and save it
    if (commodity) {
      await commodity.save();
      res.status(200).json({
        success: true,
        message: "Successfully updated",
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
        message: "Successfully Added",
        newCommodity,
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};

export {
  login,
  dashboard,
  clearAllCommodities,
  deleteCommodity,
  updateCommodity,
  upsertCommodity,
};
