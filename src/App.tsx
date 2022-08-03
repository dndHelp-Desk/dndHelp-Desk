import { FC, Suspense, lazy } from "react";
import Redirects from "./Pages/Auth/Redirects";
import ReportsComponent from "./Pages/Reports/ReportComponent";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "./Pages/Landing Page/Landing";
import LogIn from "./Pages/Auth/LogIn";
import TicketsComponent from "./Pages/Tickets/TicketsComponent";
import ContactsComponent from "./Pages/Contacts/ContactsComponent";
import animatedLogo from "./Assets/logos/anim.gif";
import ErrorPage from "./Pages/Landing Page/ErrorPage";
import ComingSoon from "./Pages/Landing Page/ComingSoon";

//Lazy Loading Components || Code Splitting ====================
const TermsConditions = lazy(()=>import("./Pages/Legal/TermsConditions"));
const Dashboard = lazy(() => import("./Pages/Main_Dashboard/MainContainer"));
const SettingsComponent = lazy(
  () => import("./Pages/Settings/SettingsComponents")
);
// const SupportHome = lazy(
//   () => import("./Pages/ClientSupport/SupportHome")
// );
//const NewTicket = lazy(() => import("./Pages/ClientSupport/NewTicket"));
//const KnowledgeBase = lazy(
//  () => import("./Pages/ClientSupport/KnowledgeBase")
//);
const Account = lazy(() => import("./Pages/Settings/User Account/Account"));
const General = lazy(() => import("./Pages/Settings/User Account/General"));
const Security = lazy(() => import("./Pages/Settings/User Account/Security"));
const Applications = lazy(
  () => import("./Pages/Settings/User Account/Applications")
);
const Team = lazy(() => import("./Pages/Settings/Team"));
const SupportOperations = lazy(
  () => import("./Pages/Settings/Support Operations/SupportOperations")
);
const AutomatedReports = lazy(
  () => import("./Pages/Settings/AutomatedReports")
);
const Solutions = lazy(() => import("./Pages/Settings/Solutions"));

//Getting Started Or Setting Up An Account ========================
const Pricing = lazy(() => import("./Pages/Landing Page/Pricing"));
const WorkSpaceSetUp = lazy(
  () => import("./Pages/Landing Page/WorkSpaceSetUp")
);

const App: FC = () => {
  //Component =================
  return (
    <div className="overflow-hidden">
      <BrowserRouter>
        <Suspense
          fallback={
            <div className="h-screen w-screen bg-slate-900 gap-4 flex flex-col items-center justify-center">
              {/* <!--card--> */}
              <img
                src={animatedLogo}
                alt="animatedLogo"
                className="w-64 object-cover object-center"
              />
            </div>
          }
        >
          <Routes>
            {/**Landing ======================== */}
            <Route path="/" element={<Landing />} />
            <Route path="/coming-soon" element={<ComingSoon />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/workspace-setup" element={<WorkSpaceSetUp />} />

            {/**Error Page ===========================*/}
            <Route path="*" element={<ErrorPage />} />

            {/**LogIn ======================== */}
            <Route path="/redirect" element={<Redirects />} />
            <Route path="/logIn" element={<LogIn />} />
            <Route path="/terms_and_conditions" element={<TermsConditions/>}/>

            {/**Support ======================== */}
            {/* <Route path="/support" element={<SupportHome />}>
              <Route path="new-ticket" element={<NewTicket />} />
              <Route path="knowledge_base" element={<KnowledgeBase />} />
            </Route> */}

            {/**App======================== */}
            <Route path="/app" element={<Dashboard />}>
              <Route path="tickets" element={<TicketsComponent />} />
              <Route path="reports" element={<ReportsComponent />} />
              <Route path="contacts" element={<ContactsComponent />} />
              <Route path="settings" element={<SettingsComponent />}>
                <Route path="account" element={<Account />}>
                  <Route path="general" element={<General />} />
                  <Route path="security" element={<Security />} />
                  <Route path="applications" element={<Applications />} />
                </Route>
                <Route path="team" element={<Team />} />
                <Route
                  path="support-operations"
                  element={<SupportOperations />}
                />
                <Route
                  path="automated-reports"
                  element={<AutomatedReports />}
                />
                <Route path="solutions" element={<Solutions />} />
              </Route>
            </Route>
            <Route path="*" element={ErrorPage} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </div>
  );
};

export default App;
