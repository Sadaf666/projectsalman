const pcontroller = require("./controller");
const express = require("express");
const router = express.Router();

router.post("/create", pcontroller.create);
router.put("/addDeveloper", pcontroller.addDeveloper)
router.get("/getproject", pcontroller.getproject);

module.exports = router;