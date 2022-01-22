import React, { useState, useEffect } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  FaDyalog,
  FaSellsy,
  FaHome,
  FaSlack,
  FaAlignRight,
} from "react-icons/fa";
import Background from "./images/welcome.png";
import { login } from "./Firebase";
import {
  updateUser,
  isAuthenticated,
} from "../../store/UserSlice";

//Initialize Services ======
const auth = getAuth();

const LogIn = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [menu, setMenu] = useState(false);
  const [inputValues, setValues] = useState({
    email: "",
    password: "",
  });

  //Log in User =====================
  const handleSubmit = (e) => {
    e.preventDefault();
    login(inputValues.email, inputValues.password);
  };

  //Check If user is logged in ===================
  onAuthStateChanged(auth, (user) => {
    if (user) {
      dispatch(isAuthenticated(true));
    } else {
      dispatch(isAuthenticated(false));
    }
  });

  //Rederect User If logged ==============
  const logged = useSelector((state) => state.UserInfo.authenticated);
  logged && navigate("/help-desk");

  //Add User Details ==============
  const user = auth.currentUser;
  if (user !== null) {
   user && dispatch(updateUser(user));
  }

  //SetPath Location ==========
  useEffect(() => {
    document.title = `Dial n Dine Help-Desk ${location.pathname}`;
  }, [location, logged]);

  //React Component ================
  return (
    <div className="bg-slate-900 w-screen h-screen min-h-[45rem] flex relative overflow-hidden">
      {/**Alert */}

      {/**Top Nav ================= */}
      <nav className="absolute w-[75%] h-[4rem] bg-transparent backdrop-blur-lg rounded-[1.25rem] border border-slate-500 top-4 left-[12%] p-2 px-4 flex justify-between items-center">
        <h3 className="uppercase font-semibold text-lg text-gray-200 flex items-center">
          <FaDyalog className="inline-block" />
          ial n Dine
        </h3>

        {/**Small Screen Menu ================ */}
        <FaAlignRight
          onClick={() => setMenu(menu === false ? true : false)}
          className="font-semibold text-xl text-gray-200 lg:hidden flex cursor-pointer"
        />
        <div
          className={`flex lg:hidden absolute top-14 right-2 w-[16rem] border border-slate-800 shadow-2xl rounded-lg bg-[#131538] ${
            menu ? "h-[10rem]" : "h-0 opacity-0"
          } transition-scale duration-300 flex flex-col space-y-2 p-4 justify-center overflow-hidden`}
        >
          <div className="text-gray-200 md-hidden flex flex-col space-y-2">
            <a
              href="https://call-center-erp.netlify.app"
              target={"_blank"}
              rel="noreferrer"
              className="flex items-center space-x-1 hover:opacity-80 outline-none focus:outline-none font-semibold"
            >
              <FaSellsy
                className="inline-block
			  "
              />
              <span>Dashboard</span>
            </a>
            <a
              href="https://dial-n-dine.netlify.app"
              target={"_blank"}
              rel="noreferrer"
              className="flex items-center space-x-1 hover:opacity-80 outline-none focus:outline-none font-semibold"
            >
              <FaHome
                className="inline-block
			  "
              />
              <span>Home</span>
            </a>
          </div>
          <a
            href="https://join.slack.com/t/dialndine/signup"
            target={"_blank"}
            rel="noreferrer"
            className="lg:hidden flex items-center space-x-1 bg-blue-700 cursor-pointer outline-none focus:outline-none transition-bg duration-300 hover:bg-blue-800 text-gray-200 rounded-xl p-2 px-4"
          >
            <FaSlack className="text-lg inline-block" />
            <span>Our Workspace</span>
          </a>
        </div>

        {/**Large Screens Menu Items===================== */}
        <div className="text-gray-200 hidden lg:flex space-x-10">
          <a
            href="https://call-center-erp.netlify.app"
            target={"_blank"}
            rel="noreferrer"
            className="flex items-center space-x-1 hover:opacity-80 outline-none focus:outline-none font-semibold"
          >
            <FaSellsy
              className="inline-block
			  "
            />
            <span>Dashboard</span>
          </a>
          <a
            href="https://dial-n-dine.netlify.app"
            target={"_blank"}
            rel="noreferrer"
            className="flex items-center space-x-1 hover:opacity-80 outline-none focus:outline-none font-semibold"
          >
            <FaHome
              className="inline-block
			  "
            />
            <span>Home</span>
          </a>
        </div>
        <a
          href="https://join.slack.com/t/dialndine/signup"
          target={"_blank"}
          rel="noreferrer"
          className="hidden lg:flex items-center space-x-1 bg-blue-700 cursor-pointer outline-none focus:outline-none transition-bg duration-300 hover:bg-blue-800 text-gray-200 rounded-xl p-2 px-4"
        >
          <FaSlack className="text-lg inline-block" />
          <span>Our Workspace</span>
        </a>
      </nav>

      {/**First Half ================ */}
      <div
        style={{ backgroundImage: `url(${Background})` }}
        className="hidden lg:flex lg:flex-col w-[50%] h-full  bg-no-repeat bg-cover bg-center items-center justify-center px-4"
      >
        <h2 className="uppercase font-bold text-gray-200 text-2xl tracking-[.5rem]">
          Inspired by the future :
        </h2>
        <h1 className="uppercase font-bold text-gray-200 text-[2.5rem] tracking-[.5rem]">
          Dial & Dine Help-desk
        </h1>
      </div>

      {/**Second Half ==================================== */}
      <div className="w-screen lg:w-[50%] h-full bg-gradient-to-t to-[#0c0c34] from-[#040b22] lg:pl-14 p-2">
        <div className="w-full h-full flex flex-col items-center lg:items-start justify-center p-2 space-y-4">
          <h2 className="font-bold text-gray-200 text-3xl font-['Plus Jakarta','Helvetica','Arial','sans-serif']">
            Nice to see you!
          </h2>
          <h4 className="text-gray-200">
            Enter your email and password to sign in
          </h4>
          <div className="w-[20rem] h-[23rem] border border-slate-600 rounded-[1.25rem] bg-[#131538] p-8">
            <form
              action=""
              className="text-gray-200 flex flex-col justify-center h-full"
              onSubmit={handleSubmit}
            >
              <div className="flex flex-col space-y-2">
                <label className="font-semibold" htmlFor="email">
                  Email
                </label>
                <input
                  type="text"
                  name="email"
                  id="email"
                  placeholder="Your email..."
                  onChange={(e) =>
                    setValues({ ...inputValues, email: e.target.value })
                  }
                  value={inputValues.email}
                  className="log_In_Input input:-webkit-autofill input:-webkit-autofill:hover input:-webkit-autofill:focus textarea:-webkit-autofill textarea:-webkit-autofill:hover textarea:-webkit-autofill:focus select:-webkit-autofill select:-webkit-autofill:hover select:-webkit-autofill:focus"
                />
              </div>
              {/** Password ========================= */}
              <div className="flex flex-col space-y-2 mt-6">
                <label className="font-semibold" htmlFor="password">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="Your password..."
                  onChange={(e) =>
                    setValues({ ...inputValues, password: e.target.value })
                  }
                  value={inputValues.password}
                  className="log_In_Input input:-webkit-autofill input:-webkit-autofill:hover input:-webkit-autofill:focus textarea:-webkit-autofill textarea:-webkit-autofill:hover textarea:-webkit-autofill:focus select:-webkit-autofill select:-webkit-autofill:hover select:-webkit-autofill:focus"
                />
              </div>
              <button
                type="submit"
                className="h-12 mt-6 bg-blue-700 outline-none focus:outline-none hover:bg-blue-800 text-gray-300 transition-bg duration-300 w-full rounded-xl uppercase font-bold text-xs"
              >
                Sing In
              </button>
              <small className="mt-4 text-gray-400 flex justify-center">
                Forgot password ?
                <p className="text-blue-500 pl-1 outline-none focus:outline-none">
                  Reset
                </p>
              </small>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LogIn;
