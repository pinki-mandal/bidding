// // controllers/userController.js

// const User = require('../models/user');
// const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken');

// const register = async (req, res) => {
//     const { username, password, email } = req.body;

//     try {
//         // Check if the username or email already exists
//         let user = await User.findOne({ where: { username } });
//         if (user) {
//             return res.status(400).json({ error: 'Username already exists' });
//         }

//         user = await User.findOne({ where: { email } });
//         if (user) {
//             return res.status(400).json({ error: 'Email already exists' });
//         }

//         // Hash the password
//         const salt = await bcrypt.genSalt(10);
//         const hashedPassword = await bcrypt.hash(password, salt);

//         // Create new user
//         user = await User.create({
//             username,
//             email,
//             password: hashedPassword
//         });

//         // Return user data (excluding password)
//         res.status(201).json({
//             id: user.id,
//             username: user.username,
//             email: user.email
//         });
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ error: 'Server error' });
//     }
// };

// const login = async (req, res) => {
//     const { username, password } = req.body;

//     try {
//         // Check if the user exists
//         const user = await User.findOne({ where: { username } });
//         if (!user) {
//             return res.status(400).json({ error: 'Invalid credentials' });
//         }

//         // Check password
//         const isMatch = await bcrypt.compare(password, user.password);
//         if (!isMatch) {
//             return res.status(400).json({ error: 'Invalid credentials' });
//         }

//         // Generate and return JWT token
//         const payload = {
//             user: {
//                 id: user.id
//             }
//         };

//         jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' }, (err, token) => {
//             if (err) throw err;
//             res.json({ token });
//         });
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ error: 'Server error' });
//     }
// };

// const profile = async (req, res) => {
//     try {
//         const user = await User.findByPk(req.user.id, {
//             attributes: { exclude: ['password'] }
//         });
//         res.json(user);
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ error: 'Server error' });
//     }
// };

// module.exports = { register, login, profile };


const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { User } = require('../models');

const register = async (req, res) => {
    const { username, password, email } = req.body;
    console.log(req.body)
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({ username, password: hashedPassword, email });
        res.status(201).json(user);
    } catch (error) {
        res.status(400).json({ error: 'User registration failed' });
    }
};

const login = async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await User.findOne({ where: { username } });
        if (!user) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }
        const isValidPassword = await bcrypt.compare(password, user.password);
        if (!isValidPassword) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }
        const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({ token });
    } catch (error) {
        res.status(400).json({ error: 'Login failed' });
    }
};
const profile = async (req, res) => {
    try {
        console.log('User info from token:', req.user); // Add this line to debug
        const userId = req.user.id; // Ensure req.user is defined
        const user = await User.findByPk(userId);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.json(user);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to retrieve user profile' });
    }
};
module.exports = { register, login, profile };
