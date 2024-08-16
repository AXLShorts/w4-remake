"use client";

import SignInForm from "@/components/forms/SignInForm";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import GoogleAuthButton from "@/components/GoogleAuthButton";

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
          <h2 className="text-2xl font-bold">Sign In</h2>
          <p>
            Don&#39;t Have an Account Yet?{" "}
            <Link className="underline" href="/signup">
              Sign Up
            </Link>
          </p>
        </div>
        <SignInForm />
        <GoogleAuthButton />
      </div>
    </div>
  );
};

export default Page;
