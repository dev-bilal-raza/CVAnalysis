"use client"
import React, { useState } from 'react';
import Marquee from "react-fast-marquee";
import { reviews_data } from '@/data/reviews_data';
import Image from 'next/image';

const ReviewsSection = () => {
    const [hovered, setHovered] = useState<number | null>(null);

    const handleMouseEnter = (index: number) => {
        setHovered(index);
    };

    const handleMouseLeave = () => {
        setHovered(null);
    };

    return (
        <div className="py-12">
            {/* <div className='h-0.5 bg-gradient-to-r from-[#2A2755] via-white to-[#2A2755]' /> */}
            <div className="max-w-screen-2xl mx-auto px-4">
                {/* Title Section */}
                <div className="text-center p-8">
                    <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl font-bold text-center">
                        What Our Customers Say?
                    </h2>
                </div>

                {/* Reviews Marquee */}
                <Marquee pauseOnHover gradient={false} speed={40} className="py-8">
                    {reviews_data.map((review, index) => (
                        <div 
                            key={index} 
                            onMouseEnter={() => handleMouseEnter(index)}
                            onMouseLeave={handleMouseLeave}
                            className={`mx-4 bg-gray-50 rounded-lg p-8 w-[400px] shadow-md transition-all duration-300 ease-out ${hovered !== null && hovered !== index && "blur-sm scale-[0.98]"}`}
                        >
                            {/* Profile Image */}
                            <div className="flex justify-center mb-6">
                                <div className="w-24 h-24 rounded-full overflow-hidden">
                                    <Image
                                        src={"/Bilal.jpg"} 
                                        alt={review.name} 
                                        width={100}
                                        height={100}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                            </div>

                            {/* Review Text */}
                            <div className="text-center mb-6">
                                <div className="text-gray-600 italic mb-4">
                                    <span className="text-[#422b72] text-4xl font-serif">"</span>
                                    {review.review}
                                    <span className="text-[#422b72] text-4xl font-serif">"</span>
                                </div>
                            </div>

                            {/* Author Info */}
                            <div className="text-center">
                                <h3 className="text-xl font-semibold text-[#422b72]">
                                    {review.name}
                                </h3>
                                <p className="text-gray-600 text-sm">
                                    {review.position}
                                </p>
                            </div>
                        </div>
                    ))}
                </Marquee>
            </div>
        </div>
    );
};

export default ReviewsSection;