// const Report = require("../model/ReportSchema");
// const Employee = require("../model/EmployeeSchema");
// //post report by id

// exports.createReport = async (req, res) => {
//   const { title, EmployeeId } = req.body;

//   try {
//     const newReport = await Report.create({ title });
//     const User = await Employee.findById(EmployeeId);
//     User.report.push(newReport._id);
//     User.save();
//     res.status(200).json({ status: "success", newReport });
//   } catch (error) {
//     res.status(400).json({ error: error.message });
//     console.log(error);
//   }
// };

// exports.getOneReport = async (req, res) => {
//   const { id } = req.params;
//   try {
//     const getOneReport = await Report.findById(id);
//     if (!this.getOneReport) {
//       return res.status(404).json({ status: "no employee found" });
//     }
//     res.status(200).json({ getOneReport });
//   } catch (error) {
//     res.status(400).json({ error: error.message });
//     console.log(error);
//   }
// };
