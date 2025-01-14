import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Button from '../common/Button';
import { getToken } from '@/services/cookie.service';

const Header = async () => {
  const token = await getToken();
  console.log('Token from header file:', token);

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
          {!token ? (
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
          ) : (
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
            </ul>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
