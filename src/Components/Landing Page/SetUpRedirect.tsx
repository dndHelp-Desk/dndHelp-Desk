import { FC, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import redirect_img from "./images/redirect_img.webp";

const SetUpRedirect: FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      //Redirect To LogIn ================================
      navigate("/logIn");
    }, 3000);
  });

  //Component ============
  return (
    <div className="bg-gradient-to-b from-slate-50 to-slate-200 h-screen w-screen flex flex-col gap-6 justify-center items-center">
      <section>
        <img src={redirect_img} alt="redirect" className="h-[12rem]" />
        <h1 className="text-2xl font-bold text-slate-800 text-center tracking-normal">
          Hang tight !
        </h1>
        <p className="mt-4 text-base font-semibold text-slate-700 text-center tracking-normal">
          We getting you set up,
          <br />
          you will be redirected to the log-in page in a few seconds.
        </p>
        <div className="mt-2 m-auto border-4 border-r-blue-600 border-slate-300 rounded-full h-10 w-10 animate-spin"></div>
      </section>
    </div>
  );
};

export default SetUpRedirect;
