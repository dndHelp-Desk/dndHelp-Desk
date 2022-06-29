import { FC, useState } from "react";
import { initializeApp } from "firebase/app";
import {
  getAuth,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  setPersistence,
  browserLocalPersistence,
} from "firebase/auth";
import { BiShowAlt } from "react-icons/bi";
//Firestore ===================
import {
  getFirestore,
  collection,
  getDocs,
  where,
  query,
} from "firebase/firestore";
import { updateProfileUrl } from "../../Adapters/Data_Fetching/TicketsnUserData";
import minidarkLogo from "../../Assets/logos/dndHelp-desk_ShortDark.webp";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router";
import {
  isAuthenticated,
  setCompany,
  updateUser,
} from "../../Redux/Slices/UserSlice";
import AlertsWrapper from "../../Components/AlertsWrapper";
import { updateAlert } from "../../Redux/Slices/NotificationsSlice";
import { AppDispatch, RootState } from "../../Redux/store";
import Help from "../../Components/Help";

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
// init services for firestore =========================
const db = getFirestore();

//Initialize Services ======
const auth = getAuth();

interface InputInter {
  email: string;
  password: string;
  company: string;
}

const LogIn: FC = () => {
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();
  const [loading, setLoading] = useState<boolean>(false);
  const [revealPass, setReveal] = useState<boolean>(false);
  const logged = useSelector(
    (state: RootState) => state.UserInfo.authenticated
  );
  const [inputValues, setValues] = useState<InputInter>({
    email: "",
    password: "",
    company: "",
  });

  const alerts = useSelector(
    (state: RootState) => state.NotificationsData.alerts
  );

  //Log in User =====================
  const handleSubmit = (e: React.SyntheticEvent) => {
    setLoading(true);
    e.preventDefault();
    setPersistence(auth, browserLocalPersistence).then(() => {
      signInWithEmailAndPassword(auth, inputValues.email, inputValues.password)
        .then((currentUser: any) => {
          //Check If Workspace or Company Exists ===============
          let companiesRef: any =
            inputValues.company &&
            query(
              collection(
                db,
                `companies/${inputValues.company
                  .toLowerCase()
                  .replace(/\s/g, "")}/members`
              ),
              where(
                "email",
                "==",
                currentUser.user.email?.replace(/\s/g, "")?.toLowerCase()
              )
            );

          //Check if the workspace exist or not ============
          getDocs(companiesRef)
            .then((snapshot) => {
              if (snapshot.docs?.length >= 1) {
                //Notify User To Verify Their Account ========
                if (!currentUser.user.emailVerified) {
                  dispatch(
                    updateAlert([
                      ...alerts,
                      {
                        message: "Please Verify your account",
                        color: "bg-green-200",
                        id: new Date().getTime(),
                      },
                    ])
                  );
                }

                const loggedUser = snapshot.docs
                  .map((doc: any) => ({
                    ...doc.data(),
                    id: doc.id,
                  }))
                  .filter(
                    (member: { email: string }) =>
                      currentUser.user?.email &&
                      member?.email.toLowerCase().replace(/\s/g, "") ===
                        currentUser.user?.email.toLowerCase().replace(/\s/g, "")
                  )[0];

                //Update user Profile ==============
                if (
                  currentUser?.user?.photoURL !== loggedUser?.photoUrl &&
                  currentUser?.user?.photoURL?.length >= 15
                ) {
                  updateProfileUrl(loggedUser?.id, currentUser?.user?.photoURL);
                }

                console.log(currentUser.user);

                //Add User Data =================
                dispatch(
                  updateUser(
                    snapshot.docs
                      .map((doc: any) => ({
                        ...doc.data(),
                        id: doc.id,
                      }))
                      .filter(
                        (member: { email: string }) =>
                          currentUser.user?.email &&
                          member?.email.toLowerCase().replace(/\s/g, "") ===
                            currentUser.user?.email
                              .toLowerCase()
                              .replace(/\s/g, "")
                      )
                  )
                );
                window.localStorage.setItem(
                  "user",
                  JSON.stringify(
                    snapshot.docs
                      .map((doc: any) => ({
                        ...doc.data(),
                        id: doc.id,
                      }))
                      .filter(
                        (member: { email: string }) =>
                          currentUser.user?.email &&
                          member?.email.toLowerCase().replace(/\s/g, "") ===
                            currentUser.user?.email
                              .toLowerCase()
                              .replace(/\s/g, "")
                      )[0]
                  )
                );

                dispatch(
                  updateAlert([
                    ...alerts,
                    {
                      message: "Logged In Succesfully",
                      color: "bg-green-200",
                      id: new Date().getTime(),
                    },
                  ])
                );

                //Login If All Set ==================
                window.localStorage.setItem(
                  "organization_name",
                  `${inputValues.company?.toLowerCase().replace(/\s/g, "")}`
                );
                dispatch(
                  setCompany(
                    inputValues.company?.toLowerCase().replace(/\s/g, "")
                  )
                );
                window.localStorage.setItem("auth", "true");
                dispatch(isAuthenticated(true));
                setLoading(false);
                window.location.reload();
                navigate("/redirect");
              } else {
                setLoading(false);
                dispatch(
                  updateAlert([
                    ...alerts,
                    {
                      message: "Workspace / Account Doesn't Exist",
                      color: "bg-red-200",
                      id: new Date().getTime(),
                    },
                  ])
                );
                dispatch(isAuthenticated(false));
              }
            })
            .catch((err) => {
              setLoading(false);
              console.log(err.message);
            });
        })
        .catch((error) => {
          setLoading(false);
          dispatch(
            updateAlert([
              ...alerts,
              {
                message:
                  error.message.includes(":") === true
                    ? error.message.split(":")[1].replace("Error", "")
                    : error.message,
                color: "bg-red-200",
                id: new Date().getTime(),
              },
            ])
          );
        });
    });
  };

  if (logged === true) {
    return <Navigate to="/redirect" />;
  }

  //React Component =====================================================================================
  return (
    <div className="bg-slate-200 w-screen h-screen min-h-[40rem] flex relative overflow-hidden">
      <div className="absolute top-2 2xl:top-4 right-4 z-[999] text-slate-800 text-sm font-bold flex items-center space-x-4 w-fit h-fil">
        <span>Not a member yet ? </span>
        <Link to="/workspace-setup" className="flex">
          <div className="h-8 px-6 flex justify-center items-center text-slate-50 bg-slate-900 rounded-sm">
            Sign Up
          </div>
        </Link>
      </div>

      <div className="min-h-full w-full flex items-center justify-center pt-4 py-12 px-4 sm:px-6 lg:px-8 z-[99]">
        <div className="max-w-md w-full space-y-8 border border-slate-300 bg-slate-100 rounded shadow-2xl drop-shadow-2xl p-8 py-10">
          <div>
            <Link to="/">
              <img
                className="mx-auto h-12 w-auto"
                src={minidarkLogo}
                alt="dndHelp-Desk"
              />
            </Link>
            <h2 className="mt-6 text-center text-3xl font-bold text-gray-900">
              Sign in to your account
            </h2>
          </div>
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
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
                    window.localStorage.setItem(
                      "organization_name",
                      `${e.target.value.toLowerCase().replace(/\s/g, "")}`
                    );
                    dispatch(
                      setCompany(
                        e.target.value.toLowerCase().replace(/\s/g, "")
                      )
                    );
                    setValues({ ...inputValues, company: e.target.value });
                  }}
                  value={inputValues.company}
                  className="appearance-none bg-slate-100 rounded-none relative block w-full px-3 py-2 border border-slate-400 placeholder-gray-800 text-gray-800 font-medium rounded-t focus:outline-none focus:ring-0 focus:border-blue-800 focus:z-10 sm:text-sm"
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
                  className="appearance-none bg-slate-100 rounded-none relative block w-full px-3 py-2 border border-y-slate-300 border-slate-400 placeholder-gray-800 text-gray-800 font-medium focus:outline-none focus:ring-0 focus:border-blue-800 focus:z-10 sm:text-sm"
                  placeholder="Email address"
                />
              </div>
              <div className="relative">
                <label htmlFor="password" className="sr-only">
                  Password
                </label>
                <input
                  type={revealPass ? "text" : "password"}
                  name="password"
                  id="password"
                  aria-required
                  required
                  autoComplete="off"
                  aria-placeholder="Your password..."
                  onChange={(e) =>
                    setValues({ ...inputValues, password: e.target.value })
                  }
                  value={inputValues.password}
                  className="appearance-none bg-slate-100 rounded-none relative block w-full px-3 py-2 border border-t-slate-300 border-slate-400 placeholder-gray-800 text-gray-800 font-medium rounded-b focus:outline-none focus:ring-0 focus:border-blue-800 focus:z-10 sm:text-sm"
                  placeholder="Password"
                />
                <BiShowAlt
                  onClick={() => {
                    setReveal((prev: boolean) => {
                      if (prev) {
                        return false;
                      } else {
                        return true;
                      }
                    });
                  }}
                  className={`absolute top-2.5 right-2 text-slate-800 cursor-pointer text-lg z-[99] ${
                    inputValues.password?.length >= 2 ? "" : "hidden"
                  }`}
                />
              </div>
            </div>

            <div className="flex items-center justify-center">
              <div className="text-sm">
                <button
                  type="button"
                  onClick={() => {
                    sendPasswordResetEmail(auth, inputValues.email)
                      .then(() => {
                        dispatch(
                          updateAlert([
                            ...alerts,
                            {
                              message: "Password reset email sent!",
                              color: "bg-green-200",
                              id: new Date().getTime(),
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
                              id: new Date().getTime(),
                            },
                          ])
                        );
                      });
                  }}
                  className="font-medium text-blue-800 hover:text-blue-700 outline-none focus:outline-none cursor-pointer"
                >
                  Forgot your password?
                </button>
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="group relative w-full flex items-center justify-center space-x-4 py-2 px-4 border border-transparent text-sm font-medium rounded text-white bg-slate-900 hover:bg-slate-800 focus:outline-none outline-none"
              >
                <span>Sign in</span>
                <div
                  className={`spinner h-4 w-4 rounded-full border-2 border-slate-400 border-l-white animate-spin ${
                    loading ? "" : "hidden"
                  }`}
                ></div>
              </button>
            </div>
          </form>
        </div>
      </div>

      {/**Deco boxes ================================ */}
      <div className="absolute h-full w-[80%] z-[0] rounded bg-slate-300 rotate-45 right-[25%] left-[25%] top-[-60%]"></div>

      {/**Alert */}
      <AlertsWrapper />
      <Help />
    </div>
  );
};

export default LogIn;
