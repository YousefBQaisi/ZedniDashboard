require("dotenv").config();
const mongoose = require("mongoose");
const app = require("./app");

app.listen(process.env.PORT, () => {
  console.log("listening 4003");
});
//for security replaced the password with password saved in env
const dataBase = process.env.MONGO_DB.replace(
  "<password>",
  process.env.PASSWORD
);
mongoose.connect(dataBase).then(() => {
  console.log("connected");
});
