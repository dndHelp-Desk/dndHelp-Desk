import { FC, useEffect } from "react";
import { onAuthStateChanged, getAuth } from "firebase/auth";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AppDispatch, RootState } from "../../Redux/store";
import redirect_img from "./images/redirect_img.webp";
import { setCompany } from "../../Redux/Slices/UserSlice";

const Redirect: FC = () => {
  const auth = getAuth();
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();
  const workspace = localStorage.getItem("organization_name");
  const routeLocation = useSelector(
    (state: RootState) => state.UserInfo.routeLocation
  );

  //Rederect User If logged ==============
  useEffect(() => {
    setTimeout(() => {
      onAuthStateChanged(auth, (user) => {
        if (workspace && user) {
          dispatch(setCompany(workspace?.toLowerCase().replace(/\s/g, "")));
          routeLocation === "dndHelp-Desk"
            ? navigate("/app")
            : navigate(routeLocation);
          console.log(localStorage.getItem("organization_name"));
        } else {
          navigate("/login");
        }
      });
    }, 3000);
  }, [auth, dispatch, navigate, routeLocation, workspace]);

  //component ========
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
          you will be logged in a few seconds.
        </p>
        <div className="mt-2 m-auto border-4 border-r-blue-600 border-slate-300 rounded-full h-10 w-10 animate-spin"></div>
      </section>
    </div>
  );
};

export default Redirect;
