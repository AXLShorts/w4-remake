/* eslint-disable @next/next/no-async-client-component */
"use client";

import axios from "axios";
const Signup = async (formData: {
  email: string;
  password: string;
  name: string;
  age: any;
  gender: string;
  profilePicture: string;
}) => {
  try {
    const response = await axios.post(
      "http://127.0.0.1:4000/api/signup",
      {
        email: formData.email,
        password: formData.password,
        name: formData.name,
        age: formData.age,
        gender: formData.gender,
        profilePicture: formData.profilePicture,
      },
      {
        withCredentials: true,
      }
    );
    return response;
  } catch (error: any) {
    console.error(error);
  }
};

export default Signup;
