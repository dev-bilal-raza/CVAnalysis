'use client';
import Image from 'next/image';
import { useState } from 'react';
import { SettingsSvg } from '../common/Svgs';

export const ProfileIcon = ({
  src,
  alt = 'User Profile',
  className,
  size = 50,
}: {
  src: string;
  alt: string;
  className?: string;
  size?: number;
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        className="focus:outline-none group"
      >
        <Image
          className={`border-4 rounded-full transform transition-all duration-500 hover:border-opacity-70 hover:scale-110 hover:shadow-lg active:scale-95
            ${className}
          `}
          src={src || '/Icons/ProfileIcon.png'}
          alt={alt}
          width={size}
          height={size}
        />
      </button>

      {isMenuOpen && (
        <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-xl border border-gray-100 overflow-hidden z-50">
          <div
            className="
            px-4 
            py-3 
            bg-gray-50 
            text-sm 
            text-gray-600 
            font-semibold
          "
          >
            Account Options
          </div>

          <button className="w-full flex items-center px-4 py-3 hover:bg-gray-100 transition-colors">
            <SettingsSvg />
            <span>Settings</span>
          </button>

          <button className="w-full flex items-center px-4 py-3 hover:bg-gray-100 transition-colors">
            <Image
              src="/Icons/AuthIcon.png"
              alt="Logout"
              width={30}
              height={30}
            />
            <span>Logout</span>
          </button>

          <button
            className="
            w-full 
            flex 
            items-center 
            px-4 
            py-3 
            hover:bg-gray-100 
            transition-colors 
            text-blue-600
          "
          >
            <Image
              src="/Icons/UpgradeIcon.png"
              alt="Upgrade to Pro"
              width={30}
              height={30}
            />
            <span>Upgrade to Pro</span>
          </button>
        </div>
      )}
    </div>
  );
};

export default ProfileIcon;
