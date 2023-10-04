const express = require("express");
const AdminRoutes = require("./routes/AdminRoute");
const UserRoutes = require("./routes/UserRoute");
// const ReportRoutes = require("./routes/ReportRoute");
const cors=require('cors')
const app = express();

app.use(express.json());
app.use(cors())
//middleware
app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});
app.use("/admin", AdminRoutes);
app.use("/User", UserRoutes);
// app.use("/employee/report", ReportRoutes);

module.exports = app;
