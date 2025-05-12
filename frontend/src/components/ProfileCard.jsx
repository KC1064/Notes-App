import React from 'react';
import { getInitials } from '../utils/helper';

const ProfileCard = ({onLogout}) => {
  return (
    <div className='flex items-center gap-3'>
      <div className='w-12 h-12 flex items-center justify-center rounded-full text-black bg-gray-400/10'>
        {getInitials("John William")}
      </div> 
      <div className='leading-tight'>
        <p>John William</p>
        <button className='text-sm text-slate-700 underline' onClick={onLogout}>
          Logout
        </button>
      </div>
    </div>
  );
};

export default ProfileCard;