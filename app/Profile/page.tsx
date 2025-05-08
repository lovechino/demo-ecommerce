import Loading from "@/components/Loading/Loading";
import dynamic from "next/dynamic";
import { Suspense } from "react";

const ProfileUI = dynamic(() => import("@/UI/Profile/profile"));

const ProfilePage = () => {
  return (
    <Suspense fallback={<Loading />}>
      <ProfileUI />
    </Suspense>
  );
};

export default ProfilePage;
