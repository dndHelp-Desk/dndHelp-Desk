import React from 'react';
import featureComingSoon from "./images/featureComingSoon.svg";

const NewTicket = () => {
  return <div className="w-full h-full flex flex-col items-center mt-14 text-2xl font-bold font-sans text-slate-600 tracking-wide capitalize">
    <img src={featureComingSoon} alt="comingSoon" className="w-[60%] h-[20%] md:h-[40%] xl:h-[50%] mt-[50px]"/>
    <h2 className="capitalize"><i>Hang On tight the feauture is Coming Soon!</i></h2>
  </div>;
};

export default NewTicket;
