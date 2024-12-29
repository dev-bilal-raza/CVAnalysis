import React from 'react';
import { NotFoundDataSvg } from '../common/Svgs';
const DataNotFound = ({ message }: { message?: string }) => {
  return (
    <div className="flex flex-col justify-center items-center w-full h-80 text-black sm:mt-6">
      <NotFoundDataSvg />
      <h3 className=" text-[#422966] text-xl exsmall:text-2xl sm:text-3xl md:text-4xl text-center font-heading font-extrabold">
        {message ? message : 'No results found'}
      </h3>
    </div>
  );
};

export default DataNotFound;
