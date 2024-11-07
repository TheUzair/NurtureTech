import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import pool from '../config/db.js';

// User registration
export const registerUser = async (req, res) => {
  
  const { username, password } = req.body;

  try {
    const [existingUser] = await pool.execute('SELECT * FROM user WHERE username = ?', [username]);

    if (existingUser.length > 0) {
      return res.status(400).json({ msg: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    await pool.execute('INSERT INTO user (username, password) VALUES (?, ?)', [username, hashedPassword]);

    return res.status(201).json({ msg: 'User registered successfully' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ msg: 'Server error' });
  }
};

// User login
export const loginUser = async (req, res) => {
  console.log('Login attempt:', req.body);
  const { username, password } = req.body;

  try {
    const [user] = await pool.execute('SELECT * FROM user WHERE username = ?', [username]);
    console.log('Users found:', user.length);
    if (user.length === 0) {
      console.log('No user found with username:', username);
      return res.status(400).json({ msg: 'Invalid credentials' });
    }

    const isPasswordValid = await bcrypt.compare(password, user[0].password);
    console.log('Password valid:', isPasswordValid);
    if (!isPasswordValid) {
      console.log('Invalid password for user:', username);
      return res.status(400).json({ msg: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: user[0].id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    console.log('Login successful for user:', username);
    return res.status(200).json({ access_token: token });
  } catch (error) {
    console.error('Login error:', error);
    return res.status(500).json({ msg: 'Server error' });
  }
};

// Protected route
export const protectedRoute = (req, res) => {
  return res.status(200).json({ msg: 'You have accessed a protected route' });
};
