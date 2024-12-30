import React from 'react';
import Image from 'next/image';
import Button from '../common/Button';
import { cookies } from 'next/headers';
import Link from 'next/link';
import Container from '../layout/Container';

const HeroSection = () => {
  const token = cookies().get('session');

  return (
    <Container>
      <div className="flex gap-4 items-center justify-between lg:flex-row flex-col rounded-lg py-7 mb-14">
        <div className="lg:w-[650px] xl:w-[650px] py-7 flex flex-col gap-6 justify-center lg:items-start items-center">
          <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl lg:text-3xl xl:text-4xl font-bold lg:text-left text-center">
            CV Analysis for Smarter Hiring
          </h2>
          <p className="font-para font-medium sm:text-lg md:text-xl lg:text-left text-center">
            Simplify your recruitment with our cutting-edge CV Analyzer. Upload
            job descriptions and CVs, and let our advanced AI model do the rest.
            It meticulously compares each CV against the job requirements,
            ensuring you find the perfect match faster and more efficiently.
            Save time, reduce bias, and hire the best talent with ease.
          </p>
          <div className="flex gap-5">
            {(token && (
              <Link href={'/upload_cvs'}>
                <Button className="!px-6">Analyze</Button>
              </Link>
            )) || (
              <Link href={'/register'}>
                <Button is_delete={false}>Get Started</Button>
              </Link>
            )}
            <Link href={'http://medium.com/@develperbilalraza'}>
              <Button status="secondary" className="!px-6">
                Blogs
              </Button>
            </Link>
          </div>
        </div>
        <div className="h-full order-1">
          <Image
            src={'/heroImage.png'}
            alt="CV Analyzer"
            width={626}
            height={417}
          />
        </div>
      </div>
    </Container>
  );
};

export default HeroSection;
