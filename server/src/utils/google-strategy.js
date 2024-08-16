import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import passport from "passport";
import bcrypt from "bcryptjs";
import prisma from "../prisma.js";
import { generateToken } from "./jwt.js";

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "/auth/google/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
      // console.log("Profile", profile);
      try {
        // Check if user already exists in the database
        let user = await prisma.user.findUnique({
          where: { email: profile._json.email },
        });
        if (!user) {
          const lastSixDigitsID = profile.id.substring(profile.id.length - 6);
          const lastTwoDigitsName = profile._json.name.substring(
            profile._json.name.length - 2
          );
          const newPass = lastTwoDigitsName + lastSixDigitsID;
          const hashedPassword = await bcrypt.hash(newPass, 10);
          user = await prisma.user.create({
            data: {
              name: profile._json.name || "user",
              email: profile._json.email,
              password: hashedPassword,
              age: 18,
              gender: "Male",
              role: "USER",
              profilePicture: profile._json.picture,
            },
          });
        }
        console.log(user);
        // Generate JWT tokens
        const token = generateToken(user);
        return done(null, {
          user,
          token,
        });
      } catch (error) {
        return done(error);
      }
    }
  )
);
