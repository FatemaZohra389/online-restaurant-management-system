var express = require("express");
var router = express.Router();
const users = require("../controllers/user.controller");

/* GET users listing. */
/* router.get('/', function(req, res, next) {
  res.send('respond with a resource');
}); */

// * Get all Users
router.get("/", users.findAll);

module.exports = router;
