import React from 'react';
import featureComingSoon from "./images/featureComingSoon.svg";

const NewTicket = () => {
  return <div className="w-full h-full flex flex-col items-center mt-4 text-2xl font-bold font-sans text-slate-600 tracking-wide capitalize">
    <img src={featureComingSoon} alt="comingSoon" className="w-[25rem]"/>
    <h2 className="capitalize"><i>Hang On tight the feauture is Coming Soon!</i></h2>
  </div>;
};

export default NewTicket;
