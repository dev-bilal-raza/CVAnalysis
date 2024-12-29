"use client"
import React, { useState } from 'react'
import { faqs } from '@/data/faqs_data'
import { FaRegPlusSquare } from "react-icons/fa";
import { FaRegSquareMinus } from "react-icons/fa6";
import Container from '../layout/Container';

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
      <div className="bg-gradient-to-b from-[#2D1753] via-white via-70% to-white py-8">
        <div className="h-0.5 bg-gradient-to-r from-[#2D1753] via-white to-[#2D1753]" />
        <Container>
          <div className="w-full mt-16 rounded-lg my-6 mx-auto bg-white">
            <div className="py-10">
              <h2 className="font-heading text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold text-center m-3 pb-6">
                Frequently Asked Questions
              </h2>
              {faqsData.map((faq) => (
                <div className="mx-6 my-8 sm:m-8" key={faq.id}>
                  <div
                    className="flex justify-between items-center cursor-pointer"
                    onClick={() => handleShow(faq.id)}
                  >
                    <h1 className="font-heading text-sm exsmall:text-base md:text-lg lg:text-xl font-medium">
                      {faq.question}
                    </h1>
                    {!faq.isShowed ? <FaRegPlusSquare /> : <FaRegSquareMinus />}
                  </div>

                  <div
                    className={`overflow-hidden transition-max-height ${faq.isShowed ? 'max-h-screen duration-[3000ms]' : 'max-h-0 duration-1000'}`}
                  >
                    <p className="font-para md:text-lg mx-3 my-5 text-gray-700">
                      {faq.answer}
                    </p>
                  </div>

                  <div className="h-[1px] bg-gray-400" />
                </div>
              ))}
            </div>
          </div>
        </Container>
      </div>
    );
}

export default FaqUsSection