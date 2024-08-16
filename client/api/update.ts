import axios from "axios";

const update = async (formData: {
  name: any;
  email: any;
  oldPassword: any;
  newPassword: any;
  age: any;
  gender: any;
}) => {
  try {
    await axios.post(
      "http://127.0.0.1:4000/api/profile",
      {
        name: formData.name,
        email: formData.email,
        oldPassword: formData.oldPassword,
        newPassword: formData.newPassword,
        age: formData.age,
        gender: formData.gender,
      },
      {
        withCredentials: true,
      }
    );
  } catch (error: any) {
    console.error(error);
  }
};

export default update;
