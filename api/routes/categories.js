var express = require("express");
var router = express.Router();
const categories = require("../controllers/category.controller");

// * Get all Menus
router.get("/", categories.findAll);
router.post("/", categories.createCategory);
router.patch("/", categories.updateCategory);

// router.get("/:id", menus.findById);
router.delete("/:id", categories.remove);

module.exports = router;
