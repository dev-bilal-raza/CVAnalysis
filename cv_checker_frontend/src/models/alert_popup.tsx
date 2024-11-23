import React, { useState } from 'react'
import Image from 'next/image'
import Button from '@/components/common/Button'
import Loader from '@/components/layout/loader/Loader';

const DeletePopup = ({ message, onDelete, isAllowed, setIsAllowed }: { message?: string, onDelete?: () => Promise<any>, isAllowed: boolean, setIsAllowed: React.Dispatch<React.SetStateAction<boolean>> }) => {
    const [loading, setLoading] = useState(false);
    const actionHandler = async () => {
        if (isAllowed && onDelete) {
            setLoading(true);

            try {
                await onDelete?.();
            } finally {
                setLoading(false);
            }
        }
    }
    return (
        isAllowed &&
        <div className={`${isAllowed? 'animate-fadeIn animate-slideInUp' : 'animate-slideOutDown'} absolute z-10 h-full right-0 left-0 bg-white transition-all duration-1000 flex justify-center items-start`}>
            <div className='transition-all duration-1000 w-[80%] sm:w-[70%] md:w-[50%] lg:w-[40%] bg-[#FFFFFF] shadow-[0_8px_30px_rgb(0,0,0,0.12)] rounded-md p-5 exsmall:p-7 sm:p-10 mt-12'>
                <div className='flex flex-col gap-4 items-center'>
                    <div className='bg-[#FFE4E6] rounded-full p-2'>
                        <Image className='' src={"/Icons/AlertIcon.png"} alt='Danger' width={25} height={19} />
                    </div>
                    <div className='flex flex-col gap-3 text-center'>
                        <h3 className='font-heading font-bold text-lg exsmall:text-xl md:text-3xl'>
                            Are You Sure?
                        </h3>
                        <p className='font-para text-gray-600 text-sm exsmall:text-base sm:text-lg md:text-xl'>
                            {message ?? message}
                        </p>
                    </div>
                    {
                        loading ?
                            <div className='flex justify-center items-center w-full mt-3'>
                                <Loader />
                            </div>
                            :
                            <div className='w-full flex flex-col gap-2 mt-3'>
                                <Button is_delete={true} other_css='w-full' click_func={() => actionHandler()}>
                                    Delete
                                </Button>
                                <Button is_delete={false} other_css='w-full' click_func={() => setIsAllowed(false)}>
                                    Cancel
                                </Button>
                            </div>
                    }
                </div>
            </div>
        </div>
    )
}

export default DeletePopup