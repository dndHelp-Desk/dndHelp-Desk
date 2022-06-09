import { FC, useState } from "react";

import Help from "../Others/Help";
import darkLogo from "./images/dndHelp-Desk.webp";
import { Link, useNavigate } from "react-router-dom";
import {
  getAuth,
  signOut,
  createUserWithEmailAndPassword,
} from "firebase/auth";

//Firestore ===================
import { collection, addDoc, getFirestore, getDocs } from "firebase/firestore";
import SignUp from "./SignUp";

const WorkSpaceSetUp: FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();
  const auth = getAuth();
  const [setUpValues, setValues] = useState<any | null>({
    user_name: "",
    user_email: "",
    user_password: "",
    company_name: "",
    companany_address: "",
    department: "",
    sending_email: "",
    password: "njix454%425..0303",
    port: 465,
    host: "serv24.registerdomain.co.za",
  });
  const [companyNameError, setCompanyError] = useState<string>("");
  const [userExistError, setUserExistError] = useState<string>("");

  // init services for firestore =========================
  const db = getFirestore();

  //collectionsRef =======================================
  let membersRef: any =
    setUpValues.company_name &&
    collection(
      db,
      `companies/${setUpValues.company_name
        .toLowerCase()
        .replace(/\s/g, "")}/members`
    );

  let ticketsRef =
    setUpValues.company_name &&
    collection(
      db,
      `companies/${setUpValues.company_name
        .toLowerCase()
        .replace(/\s/g, "")}/tickets`
    );

  let emailAccountsRef =
    setUpValues.company_name &&
    collection(
      db,
      `companies/${setUpValues.company_name
        .toLowerCase()
        .replace(/\s/g, "")}/email_accounts`
    );

  let companyDetailsRef =
    setUpValues.company_name &&
    collection(
      db,
      `companies/${setUpValues.company_name
        .toLowerCase()
        .replace(/\s/g, "")}/settings/all_settings/company_details`
    );

  let categoriesRef =
    setUpValues.company_name &&
    collection(
      db,
      `companies/${setUpValues.company_name
        .toLowerCase()
        .replace(/\s/g, "")}/settings/all_settings/categories`
    );

  //Sing Up Or Create New Accouunt
  const handleSubmit = (
    e: React.SyntheticEvent,
    email: string,
    password: string
  ) => {
    setLoading(true);
    e.preventDefault();
    createUserWithEmailAndPassword(auth, email, password)
      .then((data) => {
        //Check if the workspace exist or not ============
        getDocs(membersRef).then((snapshot) => {
          if (snapshot.docs?.length >= 1) {
            setCompanyError(
              "Company already exists, please try a different company name"
            );
            fetch("https://dndhelp-desk-first.herokuapp.com/delete", {
              method: "POST",
              headers: {
                "Content-type": "application/json",
              },
              body: JSON.stringify({
                uid: data.user.uid,
              }),
            });
            setLoading(false);
          } else {
            // New User =================================
            addDoc(membersRef, {
              name: setUpValues.user_name,
              dept: setUpValues.department,
              email: setUpValues.user_email?.toLowerCase(),
              access: "admin",
              bio: "",
              active: true,
              status: "unavailable",
              photoUrl: "",
              companies: "",
              uid: auth.currentUser?.uid,
              createdAt: new Date().getTime(),
              workspace_owner: true,
            });

            //New  Email Account ==========================
            addDoc(emailAccountsRef, {
              name: "Support",
              email: setUpValues.sending_email,
              password: setUpValues.password,
              host: setUpValues.host,
              port: setUpValues.port,
            });

            //Company Details ==========================
            addDoc(companyDetailsRef, {
              name: setUpValues.company_name,
              address: setUpValues.companany_address,
              subscription: window.localStorage.getItem("plan"),
              creationDate: new Date().getTime(),
            });

            //Support Categories ==========================
            let defaultCategories = [
              { name: "Late Delivery", turnaround_time: 90000 },
              { name: "Failed Order", turnaround_time: 90000 },
              { name: "Incorrect Order", turnaround_time: 90000 },
              { name: "Refund", turnaround_time: 90000 },
              { name: "Poor Service (Driver)", turnaround_time: 90000 },
              { name: "Poor Service (Agent)", turnaround_time: 90000 },
              { name: "Poor Service (Store)", turnaround_time: 90000 },
            ];
            defaultCategories?.forEach((cat) => {
              addDoc(categoriesRef, cat);
            });

            // New Tickects ==============================
            addDoc(ticketsRef, {
              recipient_name: "dndHelp-Desk",
              recipient_email: "support@dndhelpdesk.co.za",
              message_position: 1,
              priority: "Medium",
              agent_name: "dndHelpDesk",
              date: new Date().toLocaleString(),
              category: "Welcome, Get Started",
              branch_company: setUpValues.company_name,
              message:
                '<h1>Great to have you on board!</h1><br/> <h2>The next step is crucial, yet simple</h2><br/> <p>Please watch the video below to get started. We have set default settings for you but there can be adjusted, before changing anything please watch the video to make informed changes.</p><br/> <video width="400" controls><source src="https://firebasestorage.googleapis.com/v0/b/dial-n-dine-help-desk.appspot.com/o/ICON_VERSION9.mp4?alt=media&token=f13b1e17-1909-4aae-9803-6b7e4c8b70ee" type="video/mp4"><source src="https://firebasestorage.googleapis.com/v0/b/dial-n-dine-help-desk.appspot.com/o/ICON_VERSION9.mp4?alt=media&token=f13b1e17-1909-4aae-9803-6b7e4c8b70ee" type="video/ogg">Your browser does not support HTML video.</video>',
              time: `${new Date().getHours()}:${new Date().getMinutes()}`,
              ticket_id: "#123456",
              status: "open",
              due_date: new Date().toLocaleString(),
              from: "agent",
              agent_email: "support@dndhelpdesk.co.za",
              readStatus: "delivered",
              complainant_name: "test user",
              complainant_email: "testuser@example.com",
              complainant_number: "0123457892",
              closed_time: "",
              fcr: "no",
              hasRecording: false,
              solution: "",
              reopened: false,
              assigned: true,
              assignee: "Help Desk Support",
              assigner: "Help Desk Support",
              team: "dndHelpDesk",
              origin: "Help Desk",
            });

            //Sign-Out  and Redirect to login ================================
            setLoading(false);
            setTimeout(() => {
              signOut(auth).then(() => {
                //Redirect To LogIn ================================
                navigate("/setup-redirect");
              });
            }, 1000);
          }
        });
      })
      .catch((err) => {
        setUserExistError(err.message.split(":")[1]);
        setLoading(false);
      });
  };

  //Component  =================================
  return (
    <div className="h-screen w-screen min-h-[40rem] bg-slate-300 grid grid-cols-3 2xl:grid-cols-5 overflow-hidden overflow-y-scroll relative">
      {/**Contents Fist Half ================================= */}
      <div className="col-span-2 bg-slate-900 hidden 2xl:flex items-center justify-center p-4 relative">
        <div className="w-[80%] h-[20rem] grid grid-rows-6">
          <div className="row-span-4 flex justify-center pt-6 relative">
            <div className="ml-4 w-[15rem] h-[6.5rem] rounded bg-slate-300 dark:bg-slate-700 flex flex-col space-y-2 justify-center p-6">
              <div className="h-2 w-2/5 rounded dark:bg-slate-500 bg-slate-700"></div>
              <div className="h-2 w-full rounded dark:bg-slate-900 bg-slate-100"></div>
            </div>
            <div className="absolute bottom-[8%] left-[20%] w-[15rem] h-[6.5rem] rounded bg-slate-200 dark:bg-slate-600 flex flex-col space-y-2 justify-center p-6 shadow-2xl drop-shadow-2xl">
              <div className="h-2 w-2/5 rounded dark:bg-slate-800 bg-slate-400"></div>
              <div className="h-2 w-full rounded dark:bg-slate-400 bg-slate-400"></div>
            </div>
          </div>
          <div className="row-span-2 flex flex-col space-y-2 justify-center items-center">
            <h3 className="text-slate-300 text-xl text-center whitespace-nowrap font-semibold">
              It's nice to see you
            </h3>
            <div className="text-slate-400 text-sm tracking-tight font-medium text-center whitespace-nowrap leading-5">
              <p> We build software to meet customer needs,</p>
              <p>set your team up for success, </p>
              <p>and keep your business in sync.</p>
            </div>
          </div>
        </div>
        {/**Deco boxes ================================ */}
        <div className="absolute h-14 w-14 rounded bg-slate-300 dark:bg-[#33415569] rotate-12 left-10 bottom-10"></div>
        <div className="absolute h-8 w-8 rounded bg-slate-300 dark:bg-[#33415569] rotate-12 left-10 bottom-40"></div>
        <div className="absolute h-14 w-14 rounded bg-slate-300 dark:bg-[#33415569] rotate-45 right-14 bottom-24"></div>
      </div>

      {/**Contents Second Half ================================= */}
      <div className="col-span-3 bg-inherit flex flex-col items-center justify-center p-4 pt-28 relative">
        <div className="absolute top-2 2xl:top-8 right-6 text-slate-800 text-sm font-semibold">
          Already have an account ?{" "}
          <Link to="/logIn" className="text-blue-600">
            Login now !
          </Link>
        </div>

        <div className="flex justify-center w-full">
          <img src={darkLogo} alt="logo" className="w-24 mt-auto" />
        </div>
        <h1 className="text-xl font-bold text-center capitalize text-slate-800">
          Create Your Account
        </h1>

        <SignUp setValues={setValues} setUpValues={setUpValues} />

        {/**Form ============================================== */}
        <form
          onSubmit={(e) =>
            handleSubmit(e, setUpValues.user_email, setUpValues.user_password)
          }
          className="w-full max-w-[40rem] gap-4 hflex flex-col p-2 hidden"
        >
          {/**Start =========================== */}
          <h2 className="mt-4 text-sm font-semibold text-center uppercase text-slate-600">
            Personal Info
          </h2>
          <small
            className={`text-center text-red-600 ${
              userExistError?.length >= 3 ? "" : "hidden"
            }`}
          >
            {userExistError}
          </small>
          <hr className="bg-slate-400 border-0 h-[1px]" />
          {/**Name & Email Address ========================= */}
          <div className="flex w-full justify-between items-center space-x-4">
            <label
              htmlFor="user_name"
              className="w-2/4 text-xs font-medium text-slate-800"
            >
              <span className="uppercase text-[0.65rem] font-semibold">
                Full-Name
              </span>
              <input
                type="text"
                name="user_name"
                id="user_name"
                placeholder="Your name"
                required
                value={setUpValues.user_name}
                onChange={(e) =>
                  setValues({ ...setUpValues, user_name: e.target.value })
                }
                className="outline-none focus:outline-none rounded-md placeholder:text-xs text-sm w-full bg-slate-200 border-slate-400 focus:ring-0 focus:border-slate-400 h-10"
              />
            </label>
            <label
              htmlFor="user_email"
              className="w-2/4 text-xs font-medium text-slate-800"
            >
              <span className="uppercase text-[0.65rem] font-semibold">
                Email Address
              </span>
              <input
                type="email"
                name="user_email"
                id="user_email"
                placeholder="youremail@email.com"
                required
                value={setUpValues.user_email}
                onChange={(e) =>
                  setValues({ ...setUpValues, user_email: e.target.value })
                }
                className="outline-none focus:outline-none rounded-md placeholder:text-xs text-sm w-full bg-slate-200 border-slate-400 focus:ring-0 focus:border-slate-400 h-10"
              />
            </label>
          </div>

          {/**Password & Home Address ========================= */}
          <div className="flex w-full justify-between items-center space-x-4">
            <label
              htmlFor="user_password"
              className="w-2/4 text-xs font-medium text-slate-800"
            >
              <span className="uppercase text-[0.65rem] font-semibold">
                Password
              </span>
              <input
                type="password"
                name="user_password"
                id="user_password"
                required
                pattern=".{8,}"
                title="Enter at least 8 characters"
                placeholder="⁎⁎⁎⁎⁎⁎⁎⁎⁎⁎⁎"
                value={setUpValues.user_password}
                onChange={(e) =>
                  setValues({ ...setUpValues, user_password: e.target.value })
                }
                className="outline-none focus:outline-none rounded-md placeholder:text-xs text-sm w-full bg-slate-200 border-slate-400 focus:ring-0 focus:border-slate-400 h-10"
              />
            </label>
            <label
              htmlFor="department"
              className="w-2/4 text-xs font-medium text-slate-800"
            >
              <span className="uppercase text-[0.65rem] font-semibold">
                Department
              </span>
              <input
                type="text"
                name="department"
                id="department"
                required
                placeholder="Co-Founder ..."
                value={setUpValues.department}
                onChange={(e) =>
                  setValues({ ...setUpValues, department: e.target.value })
                }
                className="outline-none focus:outline-none rounded-md placeholder:text-xs text-sm w-full bg-slate-200 border-slate-400 focus:ring-0 focus:border-slate-400 h-10"
              />
            </label>
          </div>

          <h2 className="mt-8 text-sm font-semibold text-center uppercase text-slate-600">
            Your Company
          </h2>
          <small
            className={`text-center text-red-600 ${
              companyNameError?.length >= 3 ? "" : "hidden"
            }`}
          >
            {companyNameError}
          </small>
          <hr className="bg-slate-400 border-0 h-[1px]" />

          {/**Company Name & Company Address ========================= */}
          <div className="flex w-full justify-between items-center space-x-4">
            <label
              htmlFor="company_name"
              className="w-2/4 text-xs font-medium text-slate-800"
            >
              <span className="uppercase text-[0.65rem] font-semibold">
                Company name
              </span>
              <input
                type="text"
                name="company_name"
                id="company_name"
                placeholder="dndHelp-Desk"
                pattern="[A-Za-z0-9\s]*"
                title="It must contain letters only and space if needed."
                required
                value={setUpValues.company_name}
                onChange={(e) =>
                  setValues({ ...setUpValues, company_name: e.target.value })
                }
                className="outline-none focus:outline-none rounded-md placeholder:text-xs text-sm w-full bg-slate-200 border-slate-400 focus:ring-0 focus:border-slate-400 h-10"
              />
            </label>
            <label
              htmlFor="companany_address"
              className="w-2/4 text-xs font-medium text-slate-800"
            >
              <span className="uppercase text-[0.65rem] font-semibold">
                Company Address
              </span>
              <input
                type="text"
                name="companany_address"
                id="companany_address"
                required
                placeholder="14 Lily Road, JP North"
                value={setUpValues.companany_address}
                onChange={(e) =>
                  setValues({
                    ...setUpValues,
                    companany_address: e.target.value,
                  })
                }
                className="outline-none focus:outline-none rounded-md placeholder:text-xs text-sm w-full bg-slate-200 border-slate-400 focus:ring-0 focus:border-slate-400 h-10"
              />
            </label>
          </div>

          {/**Company Outgoing Email & Server host ========================= */}
          <div className="flex w-full justify-between items-center space-x-4">
            <label
              htmlFor="sending_email"
              className="w-2/4 text-xs font-medium text-slate-800"
            >
              <span className="uppercase text-[0.65rem] font-semibold">
                Email Account
              </span>
              <input
                type="text"
                name="sending_email"
                id="sending_email"
                placeholder="support@company.com"
                required
                value={setUpValues.sending_email}
                onChange={(e) =>
                  setValues({ ...setUpValues, sending_email: e.target.value })
                }
                className="outline-none focus:outline-none rounded-md placeholder:text-xs text-sm w-full bg-slate-200 border-slate-400 focus:ring-0 focus:border-slate-400 h-10"
              />
            </label>
            <label
              htmlFor="host"
              className="w-2/4 text-xs font-medium text-slate-800"
            >
              <span className="uppercase text-[0.65rem] font-semibold">
                Outgoing Mail Server Host
              </span>
              <input
                type="text"
                name="host"
                id="host"
                placeholder="server.domain.com"
                required
                value={setUpValues.host}
                onChange={(e) =>
                  setValues({
                    ...setUpValues,
                    host: e.target.value,
                  })
                }
                className="outline-none focus:outline-none rounded-md placeholder:text-xs text-sm w-full bg-slate-200 border-slate-400 focus:ring-0 focus:border-slate-400 h-10"
              />
            </label>
          </div>

          {/**Port  & password ========================= */}
          <div className="flex w-full justify-between items-center space-x-4">
            <label
              htmlFor="port"
              className="w-2/4 text-xs font-medium text-slate-800"
            >
              <span className="uppercase text-[0.65rem] font-semibold">
                OUTGOING MAIL SERVER PORT
              </span>
              <input
                type="text"
                name="port"
                id="port"
                placeholder="465"
                required
                value={setUpValues.port}
                onChange={(e) =>
                  setValues({ ...setUpValues, port: e.target.value })
                }
                className="outline-none focus:outline-none rounded-md placeholder:text-xs text-sm w-full bg-slate-200 border-slate-400 focus:ring-0 focus:border-slate-400 h-10"
              />
            </label>
            <label
              htmlFor="password"
              className="w-2/4 text-xs font-medium text-slate-800"
            >
              <span className="uppercase text-[0.65rem] font-semibold">
                Email Account password
              </span>
              <input
                type="password"
                name="password"
                id="password"
                placeholder="⁎⁎⁎⁎⁎⁎⁎⁎⁎⁎"
                required
                value={setUpValues.password}
                onChange={(e) =>
                  setValues({
                    ...setUpValues,
                    password: e.target.value,
                  })
                }
                className="outline-none focus:outline-none rounded-md placeholder:text-xs text-sm w-full bg-slate-200 border-slate-400 focus:ring-0 focus:border-slate-400 h-10"
              />
            </label>
          </div>

          {/**Create Account */}
          <div className="w-full flex justify-center items-center space-x-4">
            <button className="mt-2 h-10 px-10 bg-slate-900 rounded text-slate-100 font-bold hover:opacity-90 outliq focus:outline-none transition-all uppercase text-sm  flex justify-center items-center space-x-2">
              <span>SignUp</span>
              <div
                className={`h-5 w-5 rounded-full border-2 border-slate-200 border-l-blue-600 animate-spin  ${
                  loading ? "" : "hidden"
                }`}
              ></div>
            </button>
          </div>

          <div className="flex justify-center space-x-1 font-medium text-sm">
            <span>By creating an account you agree to our</span>{" "}
            <Link to="" className="text-blue-600">
              Terms and Conditions
            </Link>{" "}
            <span>and </span>
            <Link to="" className="text-blue-600">
              Privacy Policy.
            </Link>
          </div>
        </form>
      </div>

      {/**Help Chat ============ */}
      <Help />
    </div>
  );
};

export default WorkSpaceSetUp;
