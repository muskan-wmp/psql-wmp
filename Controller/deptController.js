const Crud = require("../Crud");
const { models } = require("../Model/index.js");
const deptCrud = new Crud(models.departmentModel);
const { departmentModel } = require("../Model/index.js");


exports.addeptinfo = async (req, res) => {
  const { deptId, depname, WmpId } = req.body;

  try {
    const newDepartment = await departmentModel.create({ deptId, depname, WmpId });
    console.log(newDepartment);
    console.log("Department info added successfully");

    res.status(201).json({
      message: "Department Created Successfully",
      department: newDepartment,
    });
  } catch (error) {
    console.error("Error adding department info:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
