import React from "react";
import darkLogo from "./images/dndHelp-Desk_Dark.png";
import { Link } from "react-router-dom";
import { BsTwitter, BsLinkedin, BsYoutube } from "react-icons/bs";
import { FaInstagramSquare } from "react-icons/fa";



function Footer() {

  //Component =============================
  return (
    <>
      <footer className=" bg-linear-pink-invert pb-12 w-[90%] md:w-full container mt-4 m-auto 2xl:w-[75rem] overflow-hidden border-t border-slate-400">
        <div className="w-full grid grid-cols-7 pb-2">
          <div className="col-span-4 flex flex-col py-2">
            {/**Logo ==================== */}
            <img
              src={darkLogo}
              alt="logo"
              className="object-cover object-center w-[10rem]"
            />
            <small className="text-slate-700 w-3/4">
              A business absolutely devoted to Customer Service Excellence will
              have only one worry about profits. The purpose of business is to
              create and keep a customer.
            </small>
          </div>
          <div className="col-span-1 py-2">
            <h4 className="mt-4 font-bold text-base text-slate-800">About</h4>
            <div className="space-y-2 pt-2 flex flex-col">
              <Link to="" className="text-xs text-slate-600 outline-none focus:outline-none">Features</Link>
              <Link to="" className="text-xs text-slate-600 outline-none focus:outline-none">Support</Link>
              <Link to="" className="text-xs text-slate-600 outline-none focus:outline-none">Pricing</Link>
              <Link to="" className="text-xs text-slate-600 outline-none focus:outline-none">Privacy policy</Link>
            </div>
          </div>
          <div className="col-span-1 py-2">
            <h4 className="mt-4 font-bold text-base text-slate-800">Project</h4>
            <div className="space-y-2 pt-2 flex flex-col">
              <Link to="" className="text-xs text-slate-600 outline-none focus:outline-none">Contibute</Link>
              <Link to="" className="text-xs text-slate-600 outline-none focus:outline-none">Media assets</Link>
              <Link to="" className="text-xs text-slate-600 outline-none focus:outline-none">Changelog</Link>
              <Link to="" className="text-xs text-slate-600 outline-none focus:outline-none">Releases</Link>
            </div>
          </div>
          <div className="col-span-1 py-2">
            <h4 className="mt-4 font-bold text-base text-slate-800">
              Community
            </h4>
            <div className="space-y-2 pt-2 flex flex-col">
              <Link to="" className="text-xs text-slate-600 outline-none focus:outline-none">Join Discord</Link>
              <Link to="" className="text-xs text-slate-600 outline-none focus:outline-none">Follow on Twitter</Link>
              <Link to="" className="text-xs text-slate-600 outline-none focus:outline-none">Email newsletter</Link>
              <Link to="" className="text-xs text-slate-600 outline-none focus:outline-none">Github discussions</Link>
            </div>
          </div>
        </div>
        <div className="w-full flex justify-between items-center p-2 border-t border-[#94a3b869] text-xs text-slate-600">
          <p>
            &copy; {new Date().getFullYear} dndhelp-desk. All rights reserved.
          </p>
          <div className="flex item-center gap-2">
            <Link
              to=""
              className="text-base text-slate-600 outline-none focus:outline-none"
            >
              <BsTwitter />
            </Link>
            <Link
              to=""
              className="text-base text-slate-600 outline-none focus:outline-none"
            >
              <BsLinkedin />
            </Link>
            <Link
              to=""
              className="text-base text-slate-600 outline-none focus:outline-none"
            >
              <FaInstagramSquare />
            </Link>
            <Link
              to=""
              className="text-base text-slate-600 outline-none focus:outline-none"
            >
              <BsYoutube />
            </Link>
          </div>
        </div>
      </footer>
    </>
  );
}

export default Footer;
