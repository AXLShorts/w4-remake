/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useEffect, useState } from "react";
import { getUser } from "@/api/getUser";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import ProfileForm from "@/components/forms/ProfileForm";
import { Button } from "@/components/ui/button";
import Signout from "@/api/signout";

const Page = () => {
  const [user, setUser] = useState<{
    profilePicture: string | undefined;
    name: string;
  } | null>(null);
  const { isAuthenticated, loading, logout } = useAuth();
  const router = useRouter();

  const onSignout = async () => {
    const response = await Signout();

    if (response?.status === 200) {
      logout();
      router.push("/signin");
    }
  };

  useEffect(() => {
    const fetchUser = async () => {
      if (loading) return;

      if (!isAuthenticated) {
        router.push("/signin");
        return;
      }

      const data = await getUser();
      if (data) setUser(data);
    };

    fetchUser();
  }, [isAuthenticated, loading, router]);
  // }, [router]);

  if (loading || !user) {
    // if (!user) {
    return <p>Loading...</p>;
  }

  console.log(user);

  return (
    <div className="w-[100vw] h-[100vh] flex text-center justify-center items-center p-4">
      <div className="flex flex-col gap-8">
        <img
          src={user.profilePicture}
          alt="User Avatar"
          className="w-20 h-20 rounded-full mx-auto"
        />
        <div>Welcome, {user.name}</div>
        <ProfileForm user={user} />
        <Button onClick={onSignout}>Logout</Button>
      </div>
    </div>
  );
};

export default Page;
