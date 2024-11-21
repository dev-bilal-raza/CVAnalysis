import React, { useState, useEffect } from 'react'
import { IPopUpdata } from '@/types/PopUpData.types'
import Image from 'next/image'
import Container from '@/components/layout/Container'

const ShowDataPopup = ({ data, setData }: {
    data: IPopUpdata,
    setData: React.Dispatch<React.SetStateAction<IPopUpdata | undefined>>
}) => {
    const [isVisible, setIsVisible] = useState(false);
    const [isClosing, setIsClosing] = useState(false);

    useEffect(() => {
        if (data.hasAllowed) {
            setIsVisible(true);
        }
    }, [data.hasAllowed]);

    const handleClose = () => {
        setIsClosing(true);
        setTimeout(() => {
            setIsVisible(false);
            setIsClosing(false);
            setData({ hasAllowed: false, content: "" });
        }, 300);
    };

    if (!data.hasAllowed || !data.content || !isVisible) {
        return null;
    }

    return (
        <div className={`fixed inset-0 z-50 flex backdrop-blur-md items-center justify-center
            ${isVisible ? 'animate-fadeIn' : ''}`}>
            {/* Backdrop */}
            <div
                className={`absolute inset-0 bg-black/30
                    ${isClosing ? 'animate-fadeOut' : 'animate-fadeIn'}`}
                onClick={handleClose}
            />

            {/* Modal Content */}
            <div className={`relative w-full max-w-4xl mx-4  bg-[#FFFFFF] rounded-lg ${isClosing ? 'animate-slideOutDown' : 'animate-slideInUp'}`}>
                <Container>
                    <div className="flex flex-col p-1 py-3 exsmall:p-3 sm:p-6">
                        {/* Header */}
                        <div className="flex items-center justify-between mb-6">
                            {
                                data.heading &&
                                <div className="flex-1 pr-4">
                                    <h3 className="hidden sm:block text-center font-heading text-lg exsmall:text-xl sm:text-2xl md:text-3xl font-semibold text-gray-900 group-hover:text-gray-600 transition-colors">
                                        {data.heading}
                                    </h3>
                                    <h3 aria-valuetext={data.heading} className='exsmall:block sm:hidden hidden text-tooltip relative text-center font-heading text-lg exsmall:text-xl sm:text-2xl md:text-3xl font-semibold text-gray-900 group-hover:text-gray-600 transition-colors'>
                                        {data.heading?.length > 20 ? data.heading?.slice(0, 20) + "..." : data.heading}
                                    </h3>
                                    <h3 aria-valuetext={data.heading} className='exsmall:hidden block text-tooltip relative text-center font-heading text-lg exsmall:text-xl sm:text-2xl md:text-3xl font-semibold text-gray-900 group-hover:text-gray-600 transition-colors'>
                                        {data.heading?.length > 10 ? data.heading?.slice(0, 10) + "..." : data.heading}
                                    </h3>
                                </div>
                            }
                            <button
                                onClick={handleClose}
                                className="transform hover:scale-110 hover:rotate-90 transition-all
                                    duration-300 p-2 rounded-full hover:bg-gray-100"
                                aria-label="Close popup"
                            >
                                <Image
                                    className="w-5 h-5"
                                    src="/Icons/CrossIcon.png"
                                    alt="Close popup"
                                    width={20}
                                    height={20}
                                />
                            </button>
                        </div>

                        {/* Content */}
                        <div className="relative overflow-hidden">
                            <div className="absolute inset-0 bg-gradient-to-r from-[#F0E8F5] to-white opacity-50" />
                            <div className="relative">
                                <div className="p-3 exsmall:p-6 bg-[#F0E8F5] rounded-sm 
                                     transition-shadow duration-300 border border-[#8b80a9] exsmall:shadow-[inset_0px_0px_40px_1px_#7c5eaa] shadow-[inset_0px_0px_25px_1px_#7c5eaa]">
                                    <div className="max-h-[60vh] overflow-auto">
                                        <p className="font-para text-[14px]  md:text-[16px] font-light text-gray-800 leading-relaxed
                                            hover:text-gray-900 transition-colors mr-2">
                                            {data.content.endsWith('.') ? data.content : data.content + "."}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </Container>
            </div>
        </div>
    );
};

export default ShowDataPopup;