import dynamic from "next/dynamic";

const ProfileUI = dynamic(() => import("@/UI/Profile/profile"));

const ProfilePage = () => {
  return <ProfileUI />;
};

export default ProfilePage;
