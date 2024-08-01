"use client"
import React, { useState } from 'react'
import { faqs } from '@/data/faqs_data'
import { FaRegPlusSquare } from "react-icons/fa";
import { FaRegSquareMinus } from "react-icons/fa6";

const FaqUsSection = () => {
    const [faqsData, setFaqsData] = useState(faqs)
    const handleShow = (faq_id: number) => {
        setFaqsData(
            (prev) => (
                prev.map((faq) =>
                    faq.id === faq_id ? { ...faq, isShowed: !faq.isShowed } : faq
                )
            )
        )
    }
    // console.log(faqsData);
    
    return (
        <div className='bg-gradient-to-b from-indigo-950 via-white via-70% to-white p-8'>
            <div className='h-0.5 bg-gradient-to-r from-[#2A2755] via-white to-[#2A2755]' />
            <div className='p-3 mt-16 rounded-lg m-6 mx-auto bg-white'>
                <div className='p-11 '>
                    <h2 className='font-heading text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold text-center'>
                        Frequently Asked Questions
                    </h2>
                    {faqsData.map(((faq) => (
                        <div className='m-8' key={faq.id}>
                            <div className='flex justify-between items-center cursor-pointer' onClick={() => handleShow(faq.id)}>
                                <h1 className='font-heading text-lg md:text-xl font-medium'>
                                    {faq.question}
                                </h1>
                                {
                                    !faq.isShowed ? (
                                        <FaRegPlusSquare />
                                    ) :
                                        <FaRegSquareMinus />
                                }
                            </div>
                            
                                <div className={`overflow-hidden transition-max-height ${faq.isShowed ? 'max-h-screen duration-[3000ms]' : 'max-h-0 duration-1000'}`}>
                                <p className='font-para mx-3 my-5 text-gray-700'>
                                    {faq.answer}
                                </p>
                                </div>
                            
                            <div className='h-[1px] bg-gray-400' />
                        </div>
                    )))}
                </div>
            </div>
        </div>
    )
}

export default FaqUsSection