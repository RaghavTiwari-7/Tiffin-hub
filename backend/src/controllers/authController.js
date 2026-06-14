const pool = require("../config/db");
const bcrypt = require("bcryptjs");
const generateToken = require("../utils/generateToken");

const registerUser = async (req, res) => {
  try {
    const { full_name, email, phone, password } = req.body;

    // Step 1: Check if user already exists
    const existingUser = await pool.query(
      `SELECT * FROM users
       WHERE email = $1 OR phone = $2`,
      [email, phone]
    );
    
    if (existingUser.rows.length > 0) {
      const user = existingUser.rows[0];
    
      if (user.email === email) {
        return res.status(400).json({
          success: false,
          message: "Email already registered",
        });
      }
    
      if (user.phone === phone) {
        return res.status(400).json({
          success: false,
          message: "Phone number already registered",
        });
      }
    }

    // Step 2: Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Step 3: Insert user
    const newUser = await pool.query(
      `INSERT INTO users
      (full_name, email, phone, password)
      VALUES ($1, $2, $3, $4)
      RETURNING id, full_name, email, phone, role`,
      [full_name, email, phone, hashedPassword]
    );

    // Step 4: Generate JWT
    const token = generateToken(newUser.rows[0].id);

    // Step 5: Return response
    res.status(201).json({
      success: true,
      message: "User registered successfully",
      token,
      user: newUser.rows[0],
    });

  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};
const loginUser = async (req, res) => {
  try {
    const { identifier, password } = req.body;

    const userResult = await pool.query(
      `
      SELECT *
      FROM users
      WHERE email = $1
      OR phone = $1
      `,
      [identifier]
    );
  
      if (userResult.rows.length === 0) {
        return res.status(401).json({
          success: false,
          message: "Invalid email or password",
        });
      }
  
      const user = userResult.rows[0];
  
      // Compare password
      const isMatch = await bcrypt.compare(
        password,
        user.password
      );
  
      if (!isMatch) {
        return res.status(401).json({
          success: false,
          message: "Invalid email or password",
        });
      }
  
      // Generate token
      const token = generateToken(user.id);
  
      // Return response
      res.status(200).json({
        success: true,
        message: "Login successful",
        token,
        user: {
          id: user.id,
          full_name: user.full_name,
          email: user.email,
          phone: user.phone,
          role: user.role,
        },
      });
    } catch (error) {
      console.log(error);
  
      res.status(500).json({
        success: false,
        message: "Server Error",
      });
    }
  };
  const getMe = async (req, res) => {
    try {
      const result = await pool.query(
        `SELECT id, full_name, email, phone, role
         FROM users
         WHERE id = $1`,
        [req.user.id]
      );
  
      res.json({
        success: true,
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
  registerUser,
  loginUser,
  getMe,
};