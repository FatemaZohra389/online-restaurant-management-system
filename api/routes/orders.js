var express = require("express");
var router = express.Router();
const orders = require("../controllers/order.controller");

// * Get all Menus
router.get("/", orders.findAll);
router.get("/user/:userId", orders.findByUser);
router.post("/", orders.create);
router.patch("/", orders.update);

// router.get("/:id", menus.findById);
// router.delete("/:id", menus.removeMenu);

module.exports = router;
