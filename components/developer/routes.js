const express = require("express");
const router = express.Router();
const dcontroller = require("./controller");

router.post("/register", dcontroller.register);
router.put("/update", dcontroller.update);
router.delete("/delete", dcontroller.delete);
router.get("/getuser",dcontroller.getuser);
router.get("/devproject",dcontroller.devproject)
module.exports = router;