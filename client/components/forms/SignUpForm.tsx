"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { signUpFormSchema as formSchema } from "../validation/signUpFormValidation";
import {
  SignupFormField,
  SignupFormSelect,
} from "./formComponents/SignupFormFields";
import Signup from "@/api/signup";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { useState } from "react";

const SignupForm = () => {
  const [imageURL, setImageURL] = useState<string | null>(null);
  const router = useRouter();
  const { login } = useAuth();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      age: undefined,
      gender: "",
      role: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const formData = {
      ...values,
      age: values.age ? parseInt(values.age, 10) : undefined,
      profilePicture: imageURL,
    };
    const response = await Signup(formData);
    if (response?.status === 201) {
      login(response);
      router.push("/profile");
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const data = new FormData();
    data.append("file", file as Blob);
    data.append("upload_preset", "nextcld");
    data.append("cloud_name", "dpojhlbg3");

    await fetch("https://api.cloudinary.com/v1_1/dpojhlbg3/image/upload", {
      method: "POST",
      body: data,
    })
      .then((res) => res.json())
      .then((res) => {
        setImageURL(res.secure_url);
      });
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-4 text-left w-full"
      >
        <input
          type="file"
          accept="image/*"
          onChange={(e) => handleImageUpload(e)}
        />
        <SignupFormField
          name="name"
          label="Name"
          placeholder="Name"
          description="At least 3 characters."
          formControl={form.control}
        />
        <SignupFormField
          name="email"
          label="Email"
          placeholder="Email"
          inputType="email"
          formControl={form.control}
        />
        <SignupFormField
          name="password"
          label="Password"
          placeholder="Password"
          description="At least 8 characters."
          inputType="password"
          formControl={form.control}
        />
        <SignupFormField
          name="confirmPassword"
          label="Confirm Password"
          placeholder="Confirm Password"
          description="Must match the password."
          inputType="password"
          formControl={form.control}
        />
        <SignupFormField
          name="age"
          label="Age"
          placeholder="Age"
          description="Must be at least 18 years old."
          formControl={form.control}
          inputType="number"
        />
        <SignupFormSelect
          name="gender"
          label="Gender"
          placeholder="Select Gender"
          formControl={form.control}
          options={[
            { value: "male", label: "Male" },
            { value: "female", label: "Female" },
          ]}
        />
        <SignupFormSelect
          name="role"
          label="Role"
          placeholder="Select Role"
          formControl={form.control}
          options={[
            { value: "USER", label: "User" },
            { value: "ADMIN", label: "Admin" },
          ]}
        />
        <Button type="submit">Signup</Button>
      </form>
    </Form>
  );
};

export default SignupForm;
