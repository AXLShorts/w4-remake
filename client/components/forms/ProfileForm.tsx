"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { updateFormSchema as formSchema } from "../validation/updateFormValidation";
import {
  ProfileFormField,
  ProfileFormSelect,
} from "./formComponents/ProfileFormFields";
import { Form } from "../ui/form";
import update from "@/api/update";
import { useRouter } from "next/navigation";

const ProfileForm = ({ user }: { user: any }) => {
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: user.name,
      email: user.email,
      oldPassword: "",
      newPassword: "",
      confirmPassword: "",
      age: user.age,
      gender: user.gender,
    },
  });

  // Extract isDirty from formState
  const {
    formState: { isDirty, dirtyFields },
  } = form;

  console.log(dirtyFields);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const formData = {
      ...values,
      age: values.age ? parseInt(values.age, 10) : undefined,
    };
    await update(formData).then(() => {
      console.log("Profile updated");
      router.push("/profile");
    });
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-4 text-left w-full flex flex-col"
        autoComplete="off"
      >
        <div className="flex gap-4">
          <ProfileFormField
            name="name"
            label="Name"
            placeholder="Name"
            description="At least 3 characters."
            formControl={form.control}
          />
          <ProfileFormField
            name="email"
            label="Email"
            placeholder="Email"
            inputType="email"
            formControl={form.control}
          />
        </div>

        <ProfileFormField
          name="oldPassword"
          label="Old Password"
          placeholder="Old Password"
          description="At least 8 characters."
          inputType="password"
          formControl={form.control}
        />
        <ProfileFormField
          name="newPassword"
          label="New Password"
          placeholder="New Password"
          description="At least 8 characters."
          inputType="password"
          formControl={form.control}
        />
        <ProfileFormField
          name="confirmPassword"
          label="Confirm Password"
          placeholder="Confirm Password"
          description="Must match the new password."
          inputType="password"
          formControl={form.control}
        />

        <div className="flex gap-4">
          <div className="w-full">
            <ProfileFormField
              name="age"
              label="Age"
              placeholder="Age"
              description="Must be at least 18 years old."
              formControl={form.control}
              inputType="number"
            />
          </div>

          <div className="w-full">
            <ProfileFormSelect
              name="gender"
              label="Gender"
              placeholder="Select Gender"
              formControl={form.control}
              options={[
                { value: "male", label: "Male" },
                { value: "female", label: "Female" },
              ]}
            />
          </div>
        </div>

        <Button type="submit" disabled={!isDirty}>
          Update
        </Button>
      </form>
    </Form>
  );
};
export default ProfileForm;
