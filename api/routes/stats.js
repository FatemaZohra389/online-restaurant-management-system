var express = require("express");
var router = express.Router();
const stats = require("../controllers/stat.controller");

// * Get all stats
router.get("/", stats.getStats);

// router.get("/:id", menus.findById);
// router.delete("/:id", menus.removeMenu);

module.exports = router;
