import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Button from '../common/Button';
import { STATUS } from '@/common/constants';
import { getToken } from '@/services/cookie.service';
import { getUserDetails } from '@/apis/user.api';

const Header = async () => {
  const token = await getToken();
  console.log('Token from header file:', token);
  let userDetails;
  if (token) {
    try {
      userDetails = await getUserDetails();
      console.log('User details:', userDetails);
    } catch (error) {
      console.log('Error:', error);
      userDetails = null;
    }
  }
  return (
    <header className="pl-2 px-3 md:pl-5 md:px-8 bg-white">
      <div className="flex justify-between items-center">
        <Link href={'/'}>
          <Image
            src={'/logo.png'}
            className="object-cover"
            alt="CV Analyzer"
            width={80}
            height={80}
          />
        </Link>
        <div className="flex justify-center gap-4">
          {token && userDetails?.status === STATUS.SUCCESS ? (
            <ul className="flex justify-center items-center gap-6 font-medium text-lg font-sans">
              <Link
                href={'/'}
                className="hover:cursor-pointer hover:translate-y-[-3px] transition-transform duration-300 "
              >
                Home
              </Link>
              <Link
                href={'/jobs'}
                className="hover:cursor-pointer hover:translate-y-[-3px] transition-transform duration-300 "
              >
                Jobs
              </Link>
              <Link
                href={'/'}
                className="hover:cursor-pointer hover:translate-y-[-3px] transition-transform duration-300 "
              >
                Applicants
              </Link>

              <Link href={'/upload_cvs'}>
                <Button is_delete={false}>Upload CVs</Button>
              </Link>
              <div className="cursor-pointer">
                <Image
                  className="border-4 rounded-full transform transition-all duration-500 hover:border-opacity-70 hover:scale-110 hover:shadow-lg active:scale-95"
                  src={userDetails?.user?.avatar_url}
                  alt="User Profile"
                  width={55}
                  height={50}
                />
              </div>
            </ul>
          ) : (
            <ul className="flex justify-center items-center gap-6 font-medium text-lg font-sans">
              <Link
                href={'/'}
                className="hover:cursor-pointer hover:translate-y-[-3px] transition-transform duration-300 "
              >
                Home
              </Link>
              <Link href={'/register'}>
                <Image
                  className="bg-white object-cover cursor-pointer hover:translate-y-[-3px] transition-transform duration-300"
                  src={'/Icons/LoginIcon.png'}
                  alt="Get Started"
                  width={32}
                  height={32}
                />
              </Link>
            </ul>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
