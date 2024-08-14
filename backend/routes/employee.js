const express = require("express");
const { employeeLogin, employeeRegister,updateEmployeeDetails,getallEmployee} = require("../controller/employeeController.js")
router = express.Router();
var upload = require("./multer.js");

router.post("/register",upload.single('f_Image'), employeeRegister);
router.post("/login", employeeLogin);
router.post("/updateEmployeeDetails",upload.single('f_Image'), updateEmployeeDetails);
router.get("/getALlEmployess", getallEmployee);


module.exports = router