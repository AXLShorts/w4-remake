/* eslint-disable @next/next/no-async-client-component */
"use client";

import axios from "axios";

const Signout = async () => {
  try {
    const response = await axios.post(
      "http://127.0.0.1:4000/api/logout",
      {},
      { withCredentials: true }
    );
    return response;
  } catch (error) {
    console.error(error);
  }
};

export default Signout;
