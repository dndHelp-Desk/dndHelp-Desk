import { FC } from "react";
import lightLogo from "../../Assets/logos/dndHelp-desk_Light.png";
import comingSoon from "./images/comingSoon.png";

type Props = {};

const ComingSoon: FC<Props> = () => {
  return (
    <div
      style={{ backgroundImage: `url(${comingSoon})` }}
      className="w-screen h-screen bg-slate-900 relative bg-center bg-cover bg-no-repeat"
    >
      <div className="fixed top-0 left-0 right-0 bottom-0 p-4 bg-[#030d2769] overflow-hidden overflow-y-scroll">
        <div className="w-full h-16 flex justify-center items-center p-2">
          <img
            src={lightLogo}
            alt="logo"
            className="h-full object-cover object-center"
          />
        </div>

        <h1 className="mt-20 text-center text-[5rem] font-extrabold font-sans text-slate-50">
          Coming Soon
        </h1>

        <p className="mt-8 tracking-wide text-center text-xl text-bold font-extrabold font-sans text-slate-300">
          From automation of people processes to creating
          <br /> an engaged and driven culture.
        </p>

        <div className="mt-12 w-full flex items-center justify-center">
          <form className="w-[28rem] h-12 bg-slate-50 rounded overflow-hidden relative">
            <input className="h-full w-full outline-none focus:outline-none border-0 pr-28 text-sm" type="email" name="email" id="email" placeholder="Join the waiting list ..." />
			<button className="absolute w-[6rem] h-full right-0 bg-blue-700 text-slate-50 hover:opacity-90 transition-all">Join now</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ComingSoon;
