const pool = require("../config/db");

const createProvider = async (req, res) => {
  try {
    const {
      business_name,
      description,
      address,
      city,
      state,
      pincode,
    } = req.body;

    // Check role
    const userResult = await pool.query(
      "SELECT role FROM users WHERE id = $1",
      [req.user.id]
    );

    if (userResult.rows[0].role !== "provider") {
      return res.status(403).json({
        success: false,
        message: "Only providers can create provider profiles",
      });
    }

    // Prevent duplicate profile
    const existingProvider = await pool.query(
      "SELECT * FROM providers WHERE user_id = $1",
      [req.user.id]
    );

    if (existingProvider.rows.length > 0) {
      return res.status(400).json({
        success: false,
        message: "Provider profile already exists",
      });
    }

    // Create profile
    const provider = await pool.query(
      `INSERT INTO providers
      (
        user_id,
        business_name,
        description,
        address,
        city,
        state,
        pincode
      )
      VALUES
      ($1,$2,$3,$4,$5,$6,$7)
      RETURNING *`,
      [
        req.user.id,
        business_name,
        description,
        address,
        city,
        state,
        pincode,
      ]
    );

    res.status(201).json({
      success: true,
      message: "Provider profile created",
      provider: provider.rows[0],
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

module.exports = {
  createProvider,
};