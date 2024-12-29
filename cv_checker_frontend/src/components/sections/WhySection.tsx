import React from 'react';
import { HeroSvg, HeroBottomSvg } from '../common/Svgs';
import { MdCompare } from 'react-icons/md';
import { SiWeightsandbiases } from 'react-icons/si';
import { IoTimer } from 'react-icons/io5';
import Container from '../layout/Container';

const WhySection = () => {
  return (
    <div className="mt-8">
      <div>
        <HeroSvg />
      </div>
      <div className="bg-gradient-to-t from-[#4F2790] to-black">
        <Container>
          <div className="flex flex-col gap-10 py-4">
            <div className="flex flex-col justify-center items-center gap-4">
              <h3 className="text-2xl sm:text-3xl md:text-4xl font-heading font-bold text-white text-center">
                WHY CHOOSE US?
              </h3>
              <p className="text-xl font-para text-slate-200 text-center font-extralight w-4/6">
                Screening resumes manually is time-consuming and error-prone. CV
                Analyzer uses AI to analyze resumes in seconds, so you can focus
                on the best candidates. Our tool also helps you remove bias in
                the hiring process and improve diversity.
              </p>
            </div>
            <div className="grid md:grid-cols-3 grid-cols-1 gap-8 text-white">
              <div className="flex flex-col justify-center gap-2">
                <MdCompare className="text-white text-6xl" />
                <h4 className="font-heading text-2xl font-medium pl-1">
                  Efficient Matching
                </h4>
              </div>
              <div className="flex flex-col justify-center items-center gap-2">
                <SiWeightsandbiases className="text-white text-6xl" />
                <h4 className="font-heading text-2xl font-medium">
                  Bias Reduction
                </h4>
              </div>
              <div className="flex flex-col justify-center items-end gap-2">
                <IoTimer className="text-white text-6xl" />
                <h4 className="font-heading text-2xl font-medium">
                  Time-Saving
                </h4>
              </div>
            </div>
          </div>
        </Container>
      </div>
      <div>
        <HeroBottomSvg />
      </div>
    </div>
  );
};

export default WhySection;
