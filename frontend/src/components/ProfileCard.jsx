import React from "react";
import { getInitials } from "../utils/helper";

const ProfileCard = ({ onLogout, userInfo }) => {
  // const userName = userInfo;
  const fullName = userInfo?.fullName || "User";
  // console.log(userName);
  console.log("Name:" + fullName);

  return (
    <div className="flex items-center gap-3">
      <div className="w-12 h-12 flex items-center justify-center rounded-full text-black bg-gray-400/10">
        {getInitials(fullName)}
      </div>
      <div className="leading-tight">
        <p>{fullName}</p>
        <button className="text-sm text-slate-700 underline" onClick={onLogout}>
          Logout
        </button>
      </div>
    </div>
  );
};

export default ProfileCard;
