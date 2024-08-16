import bcrypt from "bcryptjs";
import prisma from "../prisma.js";
import { generateToken } from "../utils/jwt.js";
import { setCookie } from "../utils/setCookie.js";
import cookie from "cookie";
export const signup = async (req, res) => {
  try {
    const { email, password, name, age, gender, profilePicture } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name,
        age,
        gender,
        profilePicture,
      },
    });

    const token = generateToken(user);
    setCookie(res, token);

    res.status(201).json({ message: ("User created successfully", user) });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const signin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: "Invalid email or password" });
    }
    const token = generateToken(user);
    setCookie(res, token);
    res.status(200).json({
      message: "Logged in successfully",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getProfile = async (req, res) => {
  res.json(req.user);
};

export const updateProfile = async (req, res) => {
  try {
    const {
      name,
      email,
      oldPassword,
      newPassword,
      age,
      gender,
      profilePicture,
    } = req.body;

    // Find the user by email
    const user = await prisma.user.findUnique({ where: { id: req.user.id } });

    if (!user) {
      return res.status(401).json({ message: "Invalid User" });
    }

    if (oldPassword === "" && newPassword === "") {
      const updatedUser = await prisma.user.update({
        where: { id: req.user.id },
        data: {
          name,
          email,
          age,
          gender,
          profilePicture,
        },
      });
    } else if (await bcrypt.compare(oldPassword, user.password)) {
      const hashedPassword = await bcrypt.hash(newPassword, 10);
      const updatedUser = await prisma.user.update({
        where: { id: req.user.id },
        data: {
          name,
          email,
          password: hashedPassword,
          age,
          gender,
          profilePicture,
        },
      });
    }

    res.json({ message: "User Updated Successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const logout = async (req, res) => {
  res.setHeader(
    "Set-Cookie",
    cookie.serialize("token", "", {
      httpOnly: true,
      // secure: true,
      sameSite: "strict",
      maxAge: -1,
      path: "/",
    })
  );
  res.status(200).json({ message: "Logged out successfully" });
};
