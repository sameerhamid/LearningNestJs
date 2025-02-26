import { getProfile } from "@/lib/actions";
import React from "react";

const ProfilePage = async () => {
  const profile = await getProfile();
  console.log("profile>>>", profile);
  return (
    <div>
      Profile
      <p>{JSON.stringify(profile ?? {})}</p>
    </div>
  );
};

export default ProfilePage;
