const Admin = require("../model/AdminSchema");
const bcrypt=require('bcrypt')
const validator=require('validator')
const jwt=require('jsonwebtoken')
const createToken=(_id)=>{
 return jwt.sign({_id},process.env.SECRET,{expiresIn:'2d'})
  
}
exports.createAdmin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const saltRounds = 10;
    const hash = await bcrypt.hash(password, saltRounds);
    const newAdmin = await Admin.create({ email, password:hash });
    const token=createToken(newAdmin._id)
    if(!validator.isEmail(email)){
      throw Error("Email is not valid")
    }

    res.status(200).json({ status: "success", token });
  } catch (error) {
    res.status(400).json({ error: error.message });
    console.log(error);
  }
};

exports.logInAdmin = async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      throw Error ( "fill email or password");
    }
    const currentUser = await Admin.findOne({ email });
    if (!currentUser) {
      return res.status(401).json({ status: "failed" });
    }
    
    const match =await  bcrypt.compare(password,currentUser.password );
    if (!match) {
      return res.status(401).json({ status: "failed" });
    }
    const token = createToken(currentUser._id);
    res.status(200).json({ status: "success", token });
  } catch (error) {
    res.status(400).json({ error });
    console.log(error);
  }
};
