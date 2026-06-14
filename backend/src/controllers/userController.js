const pool = require("../config/db");

const selectRole = async (req, res) => {
  try {
    const { role } = req.body;

    if (!["customer", "provider"].includes(role)) {
      return res.status(400).json({
        success: false,
        message: "Invalid role",
      });
    }

    const result = await pool.query(
      `
      UPDATE users
      SET role = $1
      WHERE id = $2
      RETURNING *
      `,
      [role, req.user.id]
    );

    res.json({
      success: true,
      message: "Role updated successfully",
      user: result.rows[0],
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

const updateProfile = async (req, res) => {
  try {
    const {
      full_name,
      email,
      phone,
      address,
    } = req.body;

    const result = await pool.query(
      `
      UPDATE users
      SET
        full_name = $1,
        email = $2,
        phone = $3,
        address = $4
      WHERE id = $5
      RETURNING *
      `,
      [
        full_name,
        email,
        phone,
        address,
        req.user.id,
      ]
    );

    res.json({
      success: true,
      message: "Profile updated",
      user: result.rows[0],
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
  selectRole,
  updateProfile,
};