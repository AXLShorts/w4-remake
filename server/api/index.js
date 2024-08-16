import express from "express";
import session from "express-session";
import passport from "passport";
import apiLimiter from "../src/middleware/rateLimiter.js";
import authRoutes from "../src/routes/authRoutes.js";
import "../src/utils/google-strategy.js";
import cors from "cors";
import { setCookie } from "../src/utils/setCookie.js";

const app = express();

app.use(
  cors({
    origin: "http://127.0.0.1:3000",
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  session({
    secret: process.env.JWT_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use(apiLimiter);

app.use("/api", authRoutes);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get(
  "/auth/google",
  passport.authenticate("google", {
    session: false,
    scope: ["profile", "email"],
  })
);

app.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    session: false,
    failureRedirect: "http://127.0.0.1:3000/signin",
  }),
  (req, res) => {
    // Access user object and tokens from req.user
    const { user, token } = req.user;
    setCookie(res, token);

    // Successful authentication, redirect home.
    res.redirect("http://127.0.0.1:3000/profile");
  }
);

const PORT = 4000;
app.listen(PORT, () => {
  console.log(`Server running on port http://127.0.0.1:${PORT}`);
});
