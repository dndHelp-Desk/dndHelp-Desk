import {FC, useState, useEffect } from "react";
import { initializeApp } from "firebase/app";
import {
  getAuth,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  setPersistence,
  browserLocalPersistence,
} from "firebase/auth";
import darkLogo from "./images/dndHelp-Desk_Dark.webp";
import minidarkLogo from "./images/dndHelp-Desk.webp";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FaSellsy, FaHeadset, FaSlack, FaAlignRight } from "react-icons/fa";
import { isAuthenticated, setCompany } from "../../Redux/Slices/UserSlice";
import Alert from "../Others/Alert";
import { updateAlert } from "../../Redux/Slices/NotificationsSlice";
import {AppDispatch, RootState } from "../../Redux/store";

//Config Firebase ==================================
const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: "dial-n-dine-help-desk",
  storageBucket: "dial-n-dine-help-desk.appspot.com",
  messagingSenderId: process.env.REACT_APP_MS_ID,
  appId: process.env.REACT_APP_APP_ID,
  measurementId: "G-GZCS9SQW3Z",
};

// Initialize Firebase for auth======================
initializeApp(firebaseConfig);

//Initialize Services ======
const auth = getAuth();

interface InputInter {
  email: string;
  password: string;
  company: string;
}

const LogIn:FC = () => {
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();
  const [menu, setMenu] = useState(false);
  const [inputValues, setValues] = useState<InputInter>({
    email: "",
    password: "",
    company: "",
  });

  const routeLocation = useSelector((state:RootState) => state.UserInfo.routeLocation);
  const alerts = useSelector(
    (state: RootState) => state.NotificationsData.alerts
  );
  const user = auth.currentUser;

  //Log in User =====================
  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    setPersistence(auth, browserLocalPersistence).then(() => {
      signInWithEmailAndPassword(auth, inputValues.email, inputValues.password)
        .then((currentUser:any) => {
          if (!currentUser.user.emailVerified) {
                dispatch(
                  updateAlert([
                    ...alerts,
                    {
                      message: "Please Verify your account",
                      color: "bg-green-200",
                    },
                  ])
                );}
          dispatch(
            updateAlert([
              ...alerts,
              {
                message: "Logged In Succesfully",
                color: "bg-green-200",
              },
            ])
          );
          window.location.reload();
        })
        .catch((error) => {
          dispatch(
            updateAlert([
              ...alerts,
              {
                message:
                  error.message.includes(":") === true
                    ? error.message.split(":")[1].replace("Error", "")
                    : error.message,
                color: "bg-red-200",
              },
            ])
          );
        });
    });
  };

  useEffect(() => {
    //Check If user is logged in ===================
    onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(isAuthenticated(true));
        //Rederect User If logged ==============
        routeLocation === "Dial n Dine Help-Desk"
          ? navigate("/app")
          : navigate(routeLocation);
      } else {
        dispatch(isAuthenticated(false));
      }
    });
  }, [user, dispatch, navigate, routeLocation]);

  //React Component =====================================================================================
  return (
    <div className="bg-slate-100 w-screen h-screen min-h-[45rem] flex relative overflow-hidden">
      {/**Top Nav ================= */}
      <nav
        role="navigation"
        className="absolute bg-slate-200 w-[75%] h-[4rem] backdrop-blur-lg rounded-lg border border-slate-300 top-4 left-[12%] p-2 px-4 flex justify-between items-center"
      >
        {/**Logo ==================== */}
        <Link
          to="/"
          className="h-full flex items-center justify-center overflow-hidden pt-1"
        >
          <img
            src={darkLogo}
            alt="logo"
            className="object-cover object-center w-[12rem]"
          />
        </Link>

        {/**Small Screen Menu ================ */}
        <FaAlignRight
          onClick={() => setMenu(menu === false ? true : false)}
          className="font-semibold text-xl text-gray-900 lg:hidden flex cursor-pointer"
        />
        <div
          role="navigation"
          className={`flex lg:hidden absolute top-14 right-2 w-[16rem] border border-slate-400 shadow-2xl rounded-lg bg-slate-300 ${
            menu ? "h-[10rem]" : "h-0 opacity-0"
          } transition-scale duration-300 flex flex-col space-y-2 p-4 justify-center overflow-hidden`}
        >
          <div className="text-gray-900 md-hidden flex flex-col space-y-2">
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
            <Link
              to="/support"
              className="flex items-center space-x-1 hover:opacity-80 outline-none focus:outline-none font-semibold"
            >
              <FaHeadset
                className="inline-block
			  "
              />
              <span>Support</span>
            </Link>
          </div>
          <a
            href="https://join.slack.com/t/dialndine/signup"
            target={"_blank"}
            rel="noreferrer"
            className="lg:hidden flex items-center space-x-1 bg-blue-700 cursor-pointer outline-none focus:outline-none transition-bg duration-300 hover:bg-blue-800 text-gray-100 rounded-md p-2 px-4"
          >
            <FaSlack className="text-lg inline-block" />
            <span>Our Workspace</span>
          </a>
        </div>

        {/**Large Screens Menu Items===================== */}
        <div className="text-gray-900 hidden lg:flex space-x-10">
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
          <Link
            to="/support"
            className="flex items-center space-x-1 hover:opacity-80 outline-none focus:outline-none font-semibold"
          >
            <FaHeadset
              className="inline-block
			  "
            />
            <span>Support</span>
          </Link>
        </div>
        <a
          href="https://join.slack.com/t/dialndine/signup"
          target={"_blank"}
          rel="noreferrer"
          className="hidden lg:flex items-center space-x-1 bg-blue-700 cursor-pointer outline-none focus:outline-none transition-bg duration-300 hover:bg-blue-800 text-gray-100 rounded-md p-2 px-4"
        >
          <FaSlack className="text-lg inline-block" />
          <span>Our Workspace</span>
        </a>
      </nav>

      <>
        <div className="min-h-full w-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-md w-full space-y-8">
            <div>
              <img
                className="mx-auto h-16 w-auto"
                src={minidarkLogo}
                alt="dndHelp-Desk"
              />
              <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                Sign in to your account
              </h2>
            </div>
            <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
              <input type="hidden" name="remember" defaultValue="true" />
              <div className="rounded-md shadow-sm -space-y-px">
                <div>
                  <label htmlFor="email-address" className="sr-only">
                    Your Company name
                  </label>
                  <input
                    type="text"
                    name="company_name"
                    id="company_name"
                    required
                    aria-required
                    aria-placeholder="Company name..."
                    onChange={(e) => {
                      window.localStorage.setItem("organization_name", `${e.target.value.toLowerCase().replace(/\s/g, "")}`);
                      dispatch(
                        setCompany(
                          e.target.value.toLowerCase().replace(/\s/g, "")
                        )
                      );
                      setValues({ ...inputValues, company: e.target.value });
                    }}
                    value={inputValues.company}
                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                    placeholder="Company name"
                  />
                </div>
                <div>
                  <label htmlFor="email-address" className="sr-only">
                    Email address
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    required
                    aria-required
                    aria-placeholder="Your email..."
                    onChange={(e) =>
                      setValues({ ...inputValues, email: e.target.value })
                    }
                    value={inputValues.email}
                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                    placeholder="Email address"
                  />
                </div>
                <div>
                  <label htmlFor="password" className="sr-only">
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    aria-required
                    required
                    autoComplete={inputValues.password}
                    aria-placeholder="Your password..."
                    onChange={(e) =>
                      setValues({ ...inputValues, password: e.target.value })
                    }
                    value={inputValues.password}
                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                    placeholder="Password"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label
                    htmlFor="remember-me"
                    className="ml-2 block text-sm text-gray-900"
                  >
                    Remember me
                  </label>
                </div>

                <div className="text-sm">
                  <button
                    onClick={() => {
                      sendPasswordResetEmail(auth, inputValues.email)
                        .then(() => {
                          dispatch(
                            updateAlert([
                              ...alerts,
                              {
                                message: "Password reset email sent!",
                                color: "bg-green-200",
                              },
                            ])
                          );
                        })
                        .catch((error) => {
                          dispatch(
                            updateAlert([
                              ...alerts,
                              {
                                message: error.message,
                                color: "bg-red-200",
                              },
                            ])
                          );
                        });
                    }}
                    className="font-medium text-blue-600 hover:text-blue-500 outline-none focus:outline-none cursor-pointer"
                  >
                    Forgot your password?
                  </button>
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-700 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  <span className="absolute left-0 inset-y-0 flex items-center pl-3"></span>
                  Sign in
                </button>
              </div>
            </form>
          </div>
        </div>
      </>

      {/**Alert */}
      <Alert />
    </div>
  );
};

export default LogIn;
