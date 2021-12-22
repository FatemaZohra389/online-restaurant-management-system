var express = require("express");
var router = express.Router();
const menus = require("../controllers/menu.controller");

// * Get all Menus
router.get("/", menus.findAll);
router.post("/", menus.createMenu);
router.patch("/", menus.updateMenu);

router.get("/:id", menus.findById);
router.delete("/:id", menus.removeMenu);

module.exports = router;
