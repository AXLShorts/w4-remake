import { z } from "zod";

export const updateFormSchema: any = z
  .object({
    name: z
      .string()
      .min(3, "Name must be at least 3 characters long.")
      .max(50, "Name must be at most 50 characters long.")
      .optional(),
    email: z.string().email("Invalid email address.").optional(),
    oldPassword: z.string().optional(),
    newPassword: z.string().optional(),
    confirmPassword: z.string().optional(),
    age: z
      .number()
      .int("Age must be a number.")
      .min(18, "You must be at least 18 years old to sign up.")
      .max(120, "You must be at most 120 years old to sign up.")
      .optional(),
    gender: z
      .string()
      .regex(/(male|female)/, "Invalid gender.")
      .optional(),
  })
  .refine(
    (data) => {
      // Ensure that all password fields are filled if any one of them is filled
      if (data.oldPassword || data.newPassword || data.confirmPassword) {
        return data.oldPassword && data.newPassword && data.confirmPassword;
      }
      return true;
    },
    {
      message: "All password fields are required to change the password",
      path: ["oldPassword"],
    }
  )
  .refine(
    (data) => {
      // Ensure that all password fields are filled if any one of them is filled
      if (data.oldPassword || data.newPassword || data.confirmPassword) {
        return data.oldPassword && data.newPassword && data.confirmPassword;
      }
      return true;
    },
    {
      message: "All password fields are required to change the password",
      path: ["newPassword"],
    }
  )
  .refine(
    (data) => {
      // Ensure that all password fields are filled if any one of them is filled
      if (data.oldPassword || data.newPassword || data.confirmPassword) {
        return data.oldPassword && data.newPassword && data.confirmPassword;
      }
      return true;
    },
    {
      message: "All password fields are required to change the password",
      path: ["confirmPassword"],
    }
  )
  .refine(
    (data) => {
      // Ensure new password is different from old password
      if (data.oldPassword && data.newPassword) {
        return data.oldPassword !== data.newPassword;
      }
      return true;
    },
    {
      message: "New password must be different from the old password",
      path: ["newPassword"],
    }
  )
  .refine(
    (data) => {
      // Ensure new password and confirm password match
      if (data.newPassword && data.confirmPassword) {
        return data.newPassword === data.confirmPassword;
      }
      return true;
    },
    {
      message: "New password and confirm password must match",
      path: ["confirmPassword"],
    }
  );
