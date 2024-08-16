"use client";

import SignUpForm from "@/components/forms/SignUpForm";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import React from "react";
import { useRouter } from "next/navigation";

const Page = () => {
  const { isAuthenticated, loading } = useAuth();
  const router = useRouter();

  if (loading) {
    return <p>Loading...</p>;
  }
  if (!loading && isAuthenticated) {
    router.push("/profile");
    return;
  }
  return (
    <div className="w-[100vw] h-[100vh] flex text-center justify-center items-center p-4">
      <div className="flex flex-col gap-8">
        <div>
          <h2 className="text-2xl font-bold">Sign Up</h2>
          <p>
            Already Have an Account Yet?{" "}
            <Link className="underline" href="/signin">
              Sign In
            </Link>
          </p>
        </div>
        <SignUpForm />
      </div>
    </div>
  );
};

export default Page;
