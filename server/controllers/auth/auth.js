const { StatusCodes } = require("http-status-codes");
const User = require("../../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


const register = async (req, res) => {
   console.log("hello");
  const { email, password, username } = req.body;
  console.log(email, password, username);
  try {
    //Check User Exists Or Not
    const isUserExists = await User.exists({
      email: email.toLowerCase(),
    });

    console.log("hello 1st");

    if (isUserExists) {
      return res.status(StatusCodes.CONFLICT).send("Email Already in use.");
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    console.log("hello 2nd",hashedPassword);
    const user = await User.create({
      email: email.toLowerCase(),
      username,
      password: hashedPassword,
    });
    console.log("hello 3nd",user); 
    user.password = undefined;

    //JWT
    const token = jwt.sign(
      { userId: user._id, email },
      process.env.JWT_SECRET,
      
    );
    console.log("hello 4nd",token); 
    
    await res.status(StatusCodes.CREATED).json({
      userDetails: {
        _id: user._id,
        email: user.email,
        username: user.username,
        token,
      },
    });
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json("Invalid Credentials Please Try Again Later");
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email: email.toLowerCase() });

    if (!user) {
      throw new Error("User not Exists!");
    }

    const dbPassword = user.password;
    const comparePassword = await bcrypt.compare(password, dbPassword);

    user.password = undefined;

    //JWT
    const token = jwt.sign(
      { userId: user._id, email },
      process.env.JWT_SECRET,
      {
        expiresIn: process.env.JWT_LIFETIME,
      }
    );

    res.status(StatusCodes.CREATED).json({
      userDetails: {
        _id: user._id,
        email: user.email,
        username: user.username,
        token,
      },
    });
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json("Invalid Credentials Please Try Again Later");
  }
};

module.exports = { register, login };
