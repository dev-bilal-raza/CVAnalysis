import React from 'react'
import Image from 'next/image';
import HeroImage from "../../../public/heroImage.png"
import Button from '../common/Button';
import { cookies } from 'next/headers';
import Link from 'next/link';

const HeroSection = () => {

    const token = cookies().get("session");

    return (
        <div className='flex justify-around gap-4 items-center lg:flex-row flex-col rounded-lg p-7 mt-6 mb-8'>
            <div className='lg:w-[55%] p-7 flex flex-col gap-3 justify-center items-center'>
                <h2 className='font-heading text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-center'>
                    CV Analysis for Smarter Hiring
                </h2>
                <p className='font-para sm:text-lg md:text-xl '>
                    Simplify your recruitment with our cutting-edge CV Analyzer. Upload job descriptions and CVs, and let our advanced AI model do the rest. It meticulously compares each CV against the job requirements, ensuring you find the perfect match faster and more efficiently. Save time, reduce bias, and hire the best talent with ease.
                </p>
                {
                    token && (
                        <Link href={"/upload_cvs"} >
                            <Button is_delete={false}>
                                Analyze
                            </Button>
                        </Link>
                    )
                    ||
                    <Link href={"/register"} >
                        <Button is_delete={false}>
                            SignIn
                        </Button>
                    </Link>
                }
            </div>
            <div className='h-full order-1'>
                <Image src={HeroImage} className='h-full' alt='CV Analyzer' />
            </div>
        </div>
    )
}

export default HeroSection