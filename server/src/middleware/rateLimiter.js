import rateLimit from "express-rate-limit";

const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 100000,
  max: 10000,
  message: "Too many requests from this IP, please try again later",
});

export default apiLimiter;
