const bcrypt = require('bcryptjs');
const jwt = require ("jsonwebtoken")
const User = require('../models/userModel');
const createError = require('../utils/appError');

// REGISTER USER
exports.signup = async (req, res, next) => {
  try {
    // 1) Check if user already exists
    const user = await User.findOne({ email: req.body.email });

    if (user) {
      return next(new createError('User already exists!', 400));
    }

    // 2) Hash password
    const hashedPassword = await bcrypt.hash(req.body.password, 12);

    // 3) Create new user
    const newUser = await User.create({
      ...req.body,
      password: hashedPassword,
    });
    // 4) Send response
    const token = jwt.sign({_id: newUser._id}, 'secretkey123',{
        expiresIn: '90d',
    });
    res.status(201).json({
        status:'success',
        message: "User Registered successfully",
        token,
        user: {
        _id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        role:newUser.role
      }
    });
} catch (error) {
    next(error);
}
};

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user)  return next(new createError('User not found!', 404));
    

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return next(
        new createError('Invalid email or password', 401)
      );
    }
      const token = jwt.sign({id: user._id}, 'secrectkey123',{
        expiresIn: '90d',
      });

     //Success response
    res.status(200).json({
      status: 'success',
      token,
      message: 'Login successful',
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });

  } catch (error) {
    next(error); // ✅ VERY IMPORTANT
  }
};