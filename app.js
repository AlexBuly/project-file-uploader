const express = require("express");
const path = require("node:path");
const passport = require("./lib/passport");
require("dotenv").config();
const app = express();

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: true }));

const expressSession = require("express-session");
const prisma = require("./lib/prisma");
const { PrismaSessionStore } = require("@quixo3/prisma-session-store");
app.use(
  expressSession({
    cookie: {
      maxAge: 7 * 24 * 60 * 60 * 1000, // ms
    },
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: new PrismaSessionStore(prisma, {
      checkPeriod: 2 * 60 * 1000, //ms
      dbRecordIdIsSessionId: true,
      dbRecordIdFunction: undefined,
    }),
  })
);

app.use(passport.initialize());
app.use(passport.session());

const loginRouter = require("./routes/loginRouter");
const signupRouter = require("./routes/signupRouter");
const indexRouter = require("./routes/indexRouter");

app.use("/login", loginRouter);
app.use("/sign-up", signupRouter);
app.use("/", indexRouter)

const PORT = process.env.PORT || 3000;
app.listen(PORT, (error) => {
  if (error) {
    throw error;
  }
  console.log(`Express app listening on port ${PORT}!`);
});

