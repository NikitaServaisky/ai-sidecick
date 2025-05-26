const User = require('../models/userSchema');
const hashPassword = require('../utils/security');

const userRegistration = async (req, res,) => {
    try {
        const {firstName, lastName, email, password} = req.body;

        if (!firstName || !lastName || !email || !password) {
            return  res.status(400).json({message: 'All fields are required'});
        }

        const existingUser = await User.findOne({email});
        if (existingUser) {
            return res.status(409).json({ message: 'Email alredy in use'});
        }

        const hashedPassword = await hashPassword(password);

        const user = new User({
            firstName,
            lastName,
            email,
            password: hashedPassword,
        });

        await user.save();

        return res.status(201).json({
            message: 'User has been saved',
            userId: user._id,
        })
        
    } catch (err) {
        console.error('Internal server error', err);
        res.status(500).json({mesaage: 'Internal server error', err});
    };
}

module.exports = { userRegistration, };