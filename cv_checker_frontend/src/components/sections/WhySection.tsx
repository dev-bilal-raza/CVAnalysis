import React from 'react'
import { HeroSvg } from '../common/Svgs'
import { MdCompare } from "react-icons/md";
import { SiWeightsandbiases } from "react-icons/si";
import { IoTimer } from "react-icons/io5";

const WhySection = () => {
  return (
    <div className='mt-8'>
      <div>
        <HeroSvg />
      </div>
      <div className='bg-gradient-to-t from-indigo-950 to-black p-4 flex flex-col gap-10'>
        <h3 className='text-2xl sm:text-3xl md:text-4xl font-heading font-bold text-white text-center'>
          WHY CHOOSE US?
        </h3>
        <div className='grid md:grid-cols-3 grid-cols-1 gap-8 text-white'>
          <div className='flex flex-col justify-center items-center gap-2'>
            <MdCompare className='text-white text-6xl' />
            <h4 className='font-heading text-2xl font-medium'>
              Efficient Matching
            </h4>
          </div>
          <div className='flex flex-col justify-center items-center gap-2'>
            <SiWeightsandbiases className='text-white text-6xl' />
            <h4 className='font-heading text-2xl font-medium'>
              Bias Reduction
            </h4>
          </div>
          <div className='flex flex-col justify-center items-center gap-2'>
            <IoTimer className='text-white text-6xl' />
            <h4 className='font-heading text-2xl font-medium'>
              Time-Saving
            </h4>
          </div>
        </div>
      </div>
    </div>
  )
}

export default WhySection