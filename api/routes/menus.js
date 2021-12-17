var express = require("express");
var router = express.Router();
const menus = require("../controllers/menu.controller");

// * Get all Menus
router.get("/", menus.findAll);

module.exports = router;
