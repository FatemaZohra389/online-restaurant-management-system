require("dotenv").config();
var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const db = require("./models");
const cors = require("cors");

var app = express();
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});
server.listen(5001, function () {
  console.log("Server running on port 5001");
});

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var menusRouter = require("./routes/menus");
var ordersRouter = require("./routes/orders");
var statsRouter = require("./routes/stats");
var categoriesRouter = require("./routes/categories");

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");
app.use(cors());
app.use(logger("dev"));
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/menus", menusRouter);
app.use("/orders", ordersRouter);
app.use("/stats", statsRouter);
app.use("/categories", categoriesRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

/// db.sequelize.sync(); // enable in production mode
// create all the defined tables in the specified database. ! { force: true } will drop tables
db.sequelize
  .sync({ force: false, alter: true, drop: false })
  .then(() => {
    console.log("re-sync database.");
  })
  .catch((error) => {
    console.log("error: ", error);
  });

let interval;

io.on("connection", (socket) => {
  console.log("New client connected");
  if (interval) {
    clearInterval(interval);
  }
  interval = setInterval(() => getApiAndEmit(socket), 1000);
  socket.on("disconnect", () => {
    console.log("Client disconnected");
    clearInterval(interval);
  });
});

const getApiAndEmit = (socket) => {
  const response = new Date();
  // Emitting a new message. Will be consumed by the client
  socket.emit("FromAPI", response);
};

module.exports = app;
