const express = require("express")
const router = express.Router();
const ucontroller = require("./controller");
let permission = require("../../utilities/permission")

router.post("/register", ucontroller.register);
router.put("/update", ucontroller.update);
// router.post("/login", ucontroller.login)
router.delete("/delete", ucontroller.delete);
router.get("/getuser", ucontroller.getuser);
//api for get user's project 
router.get("/userproject",permission.decodeToken,ucontroller.userproject)

module.exports = router;