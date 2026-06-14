const pool = require("../config/db");

const createOrder = async (req, res) => {
  try {
    const { tiffin_id, quantity, delivery_address } = req.body;

    const tiffinResult = await pool.query(
      "SELECT * FROM tiffins WHERE id = $1",
      [tiffin_id]
    );

    if (tiffinResult.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Tiffin not found",
      });
    }

    const tiffin = tiffinResult.rows[0];

    const total_amount =
      Number(tiffin.price) * Number(quantity);

    const order = await pool.query(
      `INSERT INTO orders
      (
        user_id,
        tiffin_id,
        quantity,
        total_amount,
        delivery_address
      )
      VALUES
      ($1,$2,$3,$4,$5)
      RETURNING *`,
      [
        req.user.id,
        tiffin_id,
        quantity,
        total_amount,
        delivery_address,
      ]
    );

    res.status(201).json({
      success: true,
      message: "Order placed successfully",
      order: order.rows[0],
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};
const getMyOrders = async (req, res) => {
    try {
      const result = await pool.query(
        `
        SELECT
          o.*,
          t.title,
          t.price
        FROM orders o
        JOIN tiffins t
        ON o.tiffin_id = t.id
        WHERE o.user_id = $1
        ORDER BY o.created_at DESC
        `,
        [req.user.id]
      );
  
      res.json({
        success: true,
        count: result.rows.length,
        orders: result.rows,
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
    createOrder,
    getMyOrders,
  };