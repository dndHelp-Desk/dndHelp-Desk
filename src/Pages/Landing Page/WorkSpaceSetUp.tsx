import { FC, useState } from "react";
import Help from "../../Components/Help";
import darkLogo from "../../Assets/logos/dndHelp-desk_ShortDark.webp";
import { Link } from "react-router-dom";
import {
  getAuth,
  signOut,
  createUserWithEmailAndPassword,
} from "firebase/auth";

//Firestore ===================
import { collection, addDoc, getFirestore, getDocs } from "firebase/firestore";
import SignUp from "./SignUp";
import { updateAlert } from "../../Redux/Slices/NotificationsSlice";
import AlertsWrapper from "../../Components/AlertsWrapper";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../Redux/store";

const WorkSpaceSetUp: FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const auth = getAuth();
  const dispatch: AppDispatch = useDispatch();
  const alerts = useSelector(
    (state: RootState) => state.NotificationsData.alerts
  );
  const [active, setActive] = useState<number>(0);
  const [logged, setLogged] = useState<boolean>(false);
  const [setUpValues, setValues] = useState<any | null>({
    user_name: "",
    user_email: "",
    user_password: "",
    company_name: "",
    companany_address: "",
    department: "",
    company_url: "",
    password: "njix454%425..0303",
    port: 465,
    host: "serv24.registerdomain.co.za",
  });

  // init services for firestore =========================
  const db = getFirestore();

  //collectionsRef =======================================
  let membersRef: any =
    setUpValues.company_name &&
    collection(
      db,
      `companies/${setUpValues.company_name
        ?.replace(/[^a-zA-Z0-9]/g, "")
        ?.replace(/\s/g, "")
        ?.toLowerCase()}/members`
    );

  let ticketsRef =
    setUpValues.company_name &&
    collection(
      db,
      `companies/${setUpValues.company_name
        ?.replace(/[^a-zA-Z0-9]/g, "")
        ?.replace(/\s/g, "")
        ?.toLowerCase()}/tickets`
    );

  let emailAccountsRef =
    setUpValues.company_name &&
    collection(
      db,
      `companies/${setUpValues.company_name
        ?.replace(/[^a-zA-Z0-9]/g, "")
        ?.replace(/\s/g, "")
        ?.toLowerCase()}/email_accounts`
    );

  let companyDetailsRef =
    setUpValues.company_name &&
    collection(
      db,
      `companies/${setUpValues.company_name
        ?.replace(/[^a-zA-Z0-9]/g, "")
        ?.replace(/\s/g, "")
        ?.toLowerCase()}/settings/all_settings/company_details`
    );

  let categoriesRef =
    setUpValues.company_name &&
    collection(
      db,
      `companies/${setUpValues.company_name
        ?.replace(/[^a-zA-Z0-9]/g, "")
        ?.replace(/\s/g, "")
        ?.toLowerCase()}/settings/all_settings/categories`
    );

  //Sing Up Or Create New Accouunt
  const handleSubmit = (email: string, password: string) => {
    setLoading(true);
    if (
      setUpValues.company_name?.length >= 3 &&
      setUpValues?.user_email?.length >= 3 &&
      setUpValues?.user_name?.length >= 3
    ) {
      createUserWithEmailAndPassword(auth, email, password)
        .then((data) => {
          //Check if the workspace exist or not ============
          getDocs(membersRef).then((snapshot) => {
            if (snapshot.docs?.length >= 1) {
              dispatch(
                updateAlert([
                  ...alerts,
                  {
                    message:
                      "Company already exists, please try a different company name",
                    color: "bg-red-200",
                    id: new Date().getTime(),
                  },
                ])
              );
              setActive(1);
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
                email:
                  "support@" +
                  setUpValues.company_name
                    ?.replace(/[^a-zA-Z0-9]/g, "")
                    ?.replace(/\s/g, "")
                    ?.toLowerCase() +
                  ".dndhelp-desk.co.za",
                password: setUpValues.password,
                host: setUpValues.host,
                port: setUpValues.port,
              });

              //Company Details ==========================
              addDoc(companyDetailsRef, {
                name: setUpValues.company_name,
                address: setUpValues.companany_address,
                company_url:
                  setUpValues?.company_url
                    ?.replace(/[^a-zA-Z0-9]/g, "")
                    ?.replace(/\s/g, "")
                    ?.toLowerCase() + ".dndhelp-desk.co.za",
                favicon_url: "",
                logo_url: "",
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
                date: new Date().getTime(),
                category: "Welcome, Get Started",
                branch_company: setUpValues.company_name,
                message:
                  '<h1>Great to have you on board!</h1><br/> <h2>The next step is crucial, yet simple</h2><br/> <p>Please watch the video below to get started. We have set default settings for you but there can be adjusted, before changing anything please watch the video to make informed changes.</p><br/> <video width="400" controls><source src="https://firebasestorage.googleapis.com/v0/b/dial-n-dine-help-desk.appspot.com/o/ICON_VERSION9.mp4?alt=media&token=f13b1e17-1909-4aae-9803-6b7e4c8b70ee" type="video/mp4"><source src="https://firebasestorage.googleapis.com/v0/b/dial-n-dine-help-desk.appspot.com/o/ICON_VERSION9.mp4?alt=media&token=f13b1e17-1909-4aae-9803-6b7e4c8b70ee" type="video/ogg">Your browser does not support HTML video.</video>',
                time: `${new Date().getHours()}:${new Date().getMinutes()}`,
                ticket_id: "#123456",
                status: "open",
                due_date: new Date().getTime(),
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
              setTimeout(() => {
                signOut(auth).then(() => {
                  setLogged(true);
                });
                setLoading(false);
              }, 5000);
            }
          });
        })
        .catch((err) => {
          dispatch(
            updateAlert([
              ...alerts,
              {
                message: err.message.split(":")[1],
                color: "bg-red-200",
                id: new Date().getTime(),
              },
            ])
          );
          setLoading(false);
          setActive(0);
        });
    } else {
      dispatch(
        updateAlert([
          ...alerts,
          {
            message: "Please make sure all details are filled correctly",
            color: "bg-red-200",
            id: new Date().getTime(),
          },
        ])
      );
    }
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
      <div className="col-span-3 bg-inherit flex flex-col items-center justify-center p-4 py-28 relative">
        <div className="absolute top-2 2xl:top-4 right-4 text-slate-800 text-sm font-bold flex items-center space-x-4 w-fit h-fil">
          <span>Already have an account ? </span>
          <Link to="/login" className="flex">
            <div className="h-8 px-6 flex justify-center items-center text-slate-50 bg-slate-900 rounded-sm">
              Log in
            </div>
          </Link>
        </div>

        <div className="flex justify-center w-full">
          <img src={darkLogo} alt="logo" className="w-16 mt-auto" />
        </div>
        <h1 className="text-xl font-bold text-center capitalize text-slate-800">
          Create Your Account
        </h1>

        <SignUp
          setValues={setValues}
          setUpValues={setUpValues}
          handleSubmit={handleSubmit}
          loading={loading}
          active={active}
          setActive={setActive}
          logged={logged}
        />
      </div>

      {/**Help Chat ============ */}
      <Help />
      {/**Alerts =========== */}
      <AlertsWrapper />
    </div>
  );
};

export default WorkSpaceSetUp;
