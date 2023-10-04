const JWT = require("jsonwebtoken");
const User = require("../model/UserSchema");
const { hashPassword, comparePassword } = require("../helpers/authHelper");
const userModel = require("../model/UserSchema");

//create new employee
exports.createUser = async (req, res) => {
  const { name, password, email } = req.body;
  console.log(password);
  // try {
  //   const newUser = await User.create({
  //     name,
  //     password: hashPassword,
  //     email,
  //   });

  //   res.status(200).json({ status: "success", newUser });
  // } catch (error) {
  //   res.status(400).json({ error: error.message });
  //   console.log(error);
  // }

  try {
    const { name, email, password } = req.body;
    //validation
    if (!name) {
      return res.status(400).send({
        success: false,
        message: "name is required",
      });
    }
    if (!email) {
      return res.status(400).send({
        success: false,
        message: "email is required",
      });
    }
    if (!password || password.length < 6) {
      return res.status(400).send({
        success: false,
        message: "password is required and must be 6 character long",
      });
    }

    // existing user
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(500).send({
        success: false,
        message: "User Already Registered",
      });
    }
    //hashed password
    const hashedPassword = await hashPassword(password);

    //save user to DB
    const user = await userModel({
      name,
      email,
      password: hashedPassword,
    }).save();

    //   res.status(201).send({
    //     success: true,
    //     message: "Registration successful please login",
    //   });
    // } catch (error) {
    //   console.log(error);
    //   return res.status(500).send({
    //     success: false,
    //     message: "Error in Register API",
    //     error,
    //   });
    // }

    res.status(200).json({ status: "success" });
  } catch (error) {
    res.status(400).json({ error: error.message });
    console.log(error);
  }
};

//get all employees

exports.getUsers = async (req, res) => {
  const AllUsers = await User.find({}).sort({ createdAt: -1 });
  try {
    res.status(200).json(AllUsers);
  } catch (error) {
    res.status(400).json({ error: error.message });
    console.log(error);
  }
};

//get employee
exports.getOneUser = async (req, res) => {
  // const { id } = req.params;
  // try {
  //   const getOneUser = await User.findById(id);
  //   if (!getOneUser) {
  //     return res.status(404).json({ status: "no user found" });
  //   }
  //   res.status(200).json({ data: getOneUser });
  // } catch (error) {
  //   res.status(400).json({ error: error.message });
  //   console.log(error);
  // }

  try {
    const { email, password } = req.body;
    //validation
    if (!email || !password) {
      return res.status(500).send({
        success: false,
        message: "please enter your email & password",
      });
    }
    //find user
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(500).send({
        success: false,
        message: "User Not Found",
      });
    }
    //match password
    const match = await comparePassword(password, user.password);
    if (!match) {
      return res.status(500).send({
        success: false,
        message: "invalid username or password",
      });
    }
    //TOKEN JWT
    const token = await JWT.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    //undefined password
    user.password = undefined;

    res.status(200).send({
      success: true,
      message: "login successfully",
      token,
      user,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "error in login api",
      error,
    });
  }
};

//delete employee
exports.deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    const deleteUser = await User.findOneAndDelete({ _id: id });
    if (!deleteUser) {
      return res.status(404).json({ status: "no user found" });
    }
    res.status(200).json({ status: "deleted successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
    console.log(error);
  }
};

//update employee
exports.updateUser = async (req, res) => {
  const { id } = req.params;
  try {
    const updateUser = await User.findOneAndUpdate(
      { _id: id },
      {
        ...req.body,
      }
    );
    if (!updateUser) {
      return res.status(404).json({ status: "no employee found" });
    }
    res.status(200).json({ status: " successfully updated", updateUser });
  } catch (error) {
    res.status(400).json({ error: error.message });
    console.log(error);
  }
};
