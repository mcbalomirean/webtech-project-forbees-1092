var createError = require("http-errors");
var express = require("express");
var path = require("path");
var session = require("express-session");
var SequelizeStore = require("connect-session-sequelize")(session.Store);
var db = require("./models/database");
var logger = require("morgan");
var cors = require("cors");

var authRoute = require("./routes/auth");
var groupsRoute = require("./routes/groups");
var notesRoute = require("./routes/notes");
var subjectsRoute = require("./routes/subjects");
var testRoute = require("./routes/test");

var AuthController = require("./controllers/authController");

var app = express();

// allow cross-origin requests, should only be enabled in development
app.use(
  cors({
    origin: true,
    credentials: true, //TODO: check how we can use this
  })
);
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// tell express to use sessions and our own store
var dbStore = new SequelizeStore({
  db: db.sequelize,
  modelKey: "sessions",
});
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    store: dbStore,
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false },
  })
);
// sync store table at start-up
dbStore.sync();

app.use(express.static(path.join(__dirname, "public")));

// tell express to use passport callbacks
app.use(AuthController.passport.initialize());
app.use(AuthController.passport.session());

// routing goes here
app.use("/auth", authRoute);
app.use("/groups", groupsRoute);
app.use("/notes", AuthController.checkAuth, notesRoute);
app.use("/subjects", subjectsRoute);
app.use("/test", testRoute);

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

module.exports = app;
