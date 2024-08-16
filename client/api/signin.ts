/* eslint-disable @next/next/no-async-client-component */
"use client";

import axios from "axios";

const Signin = async (values: { email: any; password: any }) => {
  try {
    const response = await axios.post(
      "http://127.0.0.1:4000/api/signin",
      { email: values.email, password: values.password },
      {
        withCredentials: true,
      }
    );

    if (response.status === 200) {
      return response;
    }
  } catch (error: any) {
    console.error(error);
  }
};

export default Signin;
