const jwt = require('jsonwebtoken');
const userModel = require('../Models/user');

async function authenticateToken(req, res, next) {
    const token = req.cookies?.jwt
    if (!token) {
        return res.status(401).json({
            success: false,
            message: "No authentication token found."
        })
    }


    if (!token) return res.status(401).json({ message: 'Not authenticated' });

    const decoded = jwt.verify(token, process.env.JWT_SECRET, async (err, jwtUser) => {
        const user = await userModel.findById(jwtUser._id).select('-password')

        if (!user) return res.status(401).json({ message: 'User not found' });

        req.user = user

        next()
    });
}

module.exports = authenticateToken