import React from "react";
import styles from "../style";
import { leaf, f } from "../assets";

const Hero = () => {
  return (
    <section className={`flex md:flex-row flex-col   ${styles.paddingY}`}>
      <div
        className={`flex-1 ${styles.flexStart} flex-col xl:px-0 sm:px-16 px-6`}
      >
        <div className="flex flex-row items-center py-6 px-4 bg-gray-800 rounded-[8px] mb-12">
          <img
            src={f}
            alt="f"
            className="w-[34px] h-[34px] mr-2 rounded-full"
          />
          <p className={`${styles.paragraph} ml-2`}>
            <span className="text-white mr-1">ETHIOPIA</span> CO
            <span className="text-gradient">FF</span>EE
          </p>
        </div>

        <div className="flex flex-row justify-between items-center w-full">
          <h1 className="flex-1 font-poppins text-gradient hover:animate-pulse ml-4 font-semibold ss:text-[72px] text-[52px] ss:leading-[95.8px] leading-[75px]">
            "BETTER BEANS <br className="sm:block hidden" />
            <span className="ml-8 mb-20 ss:text-[58px] text-[52px]">
              BETTER COFFEE"
            </span>
          </h1>
          <div className="ss:flex hidden md:mr-4 mr-0"></div>
        </div>

        <h1 className="font-poppins font-semibold ss:text-[68px] text-[52px] text-white ss:leading-[100.8px] leading-[75px] w-full"></h1>
        <p className={`${styles.paragraph} max-w-[470px] mt-5`}>
          Our team of experts uses a methodology to identify the credit cards
          most likely to fit your needs. We examine annual percentage rates,
          annual fees.
        </p>
      </div>

      <div
        className={`flex-1 flex ${styles.flexCenter} md:my-0 my-10 relative`}
      >
        <img
          src={leaf}
          alt="leaf"
          className="w-[90%] h-[80%] relative z-[5] ml-14 mr-14 rounded-[15px] mt-12 hover:animate-pulse"
        />

        {/* gradient start */}
        <div className="absolute z-[0] w-[40%] h-[35%] top-0 pink__gradient" />
        <div className="absolute z-[1] w-[80%] h-[80%] rounded-full white__gradient bottom-40" />
        <div className="absolute z-[0] w-[50%] h-[50%] right-20 bottom-20 blue__gradient" />
        {/* gradient end */}
      </div>

      <div className={`ss:hidden ${styles.flexCenter}`}></div>
    </section>
  );
};

export default Hero;
