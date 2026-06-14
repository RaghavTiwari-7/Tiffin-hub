const pool = require("../config/db");

const createTiffin = async (req, res) => {
  try {
    const {
      title,
      description,
      meal_type,
      price,
      image_url,
    } = req.body;

    // Find provider profile
    const providerResult = await pool.query(
      "SELECT * FROM providers WHERE user_id = $1",
      [req.user.id]
    );

    if (providerResult.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Provider profile not found",
      });
    }

    const providerId = providerResult.rows[0].id;

    const tiffin = await pool.query(
      `INSERT INTO tiffins
      (
        provider_id,
        title,
        description,
        meal_type,
        price,
        image_url
      )
      VALUES
      ($1,$2,$3,$4,$5,$6)
      RETURNING *`,
      [
        providerId,
        title,
        description,
        meal_type,
        price,
        image_url,
      ]
    );

    res.status(201).json({
      success: true,
      message: "Tiffin created successfully",
      tiffin: tiffin.rows[0],
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};
const getAllTiffins = async (req, res) => {
    try {
      const result = await pool.query(`
        SELECT
          t.*,
          p.business_name
        FROM tiffins t
        JOIN providers p
        ON t.provider_id = p.id
        ORDER BY t.created_at DESC
      `);
  
      res.json({
        success: true,
        count: result.rows.length,
        tiffins: result.rows,
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
    createTiffin,
    getAllTiffins,
  };