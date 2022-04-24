import { FC, Suspense, lazy } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "./components/Landing Page/Landing";
import LogIn from "./components/Auth/LogIn";
import TicketsComponent from "./components/Tickets/TicketsComponent";
import ContactsComponent from "./components/Contacts/ContactsComponent";
import ErrorPage from "./components/Landing Page/ErrorPage";

//Lazy Loading Components || Code Splitting ====================
const MainComponent = lazy(
  () => import("./components/MainComponent/MainComponent")
);
const ReportsComponent = lazy(
  () => import("./components/Reports/ReportComponent")
);
const SettingsComponent = lazy(
  () => import("./components/Settings/SettingsComponents")
);
const SupportHome = lazy(
  () => import("./components/ClientSupport/SupportHome")
);
const NewTicket = lazy(() => import("./components/ClientSupport/NewTicket"));
const KnowledgeBase = lazy(
  () => import("./components/ClientSupport/KnowledgeBase")
);
const Account = lazy(() => import("./components/Settings/Account"));
const Team = lazy(() => import("./components/Settings/Team"));
const SupportOperations = lazy(
  () => import("./components/Settings/Support Operations/SupportOperations")
);
const AutomatedReports = lazy(
  () => import("./components/Settings/AutomatedReports")
);
const Solutions = lazy(() => import("./components/Settings/Solutions"));

//Getting Started Or Setting Up An Account ========================
const Pricing = lazy(() => import("./components/Landing Page/Pricing"));
const CompanySetUp = lazy(
  () => import("./components/Landing Page/CompanySetUp")
);

const App: FC = () => {
  return (
    <div className="overflow-hidden">
      <BrowserRouter>
        <Suspense
          fallback={
            <div className="h-screen w-screen bg-slate-500 gap-4 flex flex-col items-center justify-center">
              {/* <!--card--> */}
              <div className="w-64 bg-slate-200 rounded shadow-2xl">
                {/* <!--image--> */}
                <div className="h-32 bg-slate-400 rounded-tr rounded-tl flex gap-2 flex-col justify-center items-center p-2"></div>
                <div className="p-5">
                  {/* <!--title--> */}
                  <div className="h-6 rounded-sm bg-slate-400 animate-pulse mb-4"></div>
                  {/* <!--content--> */}
                  <div className="grid grid-cols-4 gap-1">
                    <div className="col-span-3 h-4 rounded-sm bg-slate-400 animate-pulse mb-1"></div>
                    <div className="h-4 rounded-sm bg-slate-400 animate-pulse mb-1"></div>
                    <div className="col-span-2 h-4 rounded-sm bg-slate-400 animate-pulse mb-1"></div>
                    <div className="col-span-2h-4 rounded-sm bg-slate-400 animate-pulse mb-1"></div>
                    <div className="h-4 rounded-sm bg-slate-400 animate-pulse mb-1"></div>
                    <div className="h-4 rounded-sm bg-slate-400 animate-pulse mb-1"></div>
                    <div className="col-span-3 h-4 rounded-sm bg-slate-400 animate-pulse mb-1"></div>
                    <div className="h-4 rounded-sm bg-slate-400 animate-pulse mb-1"></div>
                    <div className="h-4 rounded-sm bg-slate-400 animate-pulse mb-1"></div>
                    <div className="col-span-2 h-4 rounded-sm bg-slate-400 animate-pulse mb-1"></div>
                  </div>
                </div>
              </div>
            </div>
          }
        >
          <Routes>
            {/**Landing ======================== */}
            <Route path="/" element={<Landing />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/company-set-up" element={<CompanySetUp />} />

            {/**Error Page ===========================*/}
            <Route path="/error-page" element={<ErrorPage />} />

            {/**LogIn ======================== */}
            <Route path="/logIn" element={<LogIn />} />

            {/**Support ======================== */}
            <Route path="/support" element={<SupportHome />}>
              <Route path="new-ticket" element={<NewTicket />} />
              <Route path="knowledge_base" element={<KnowledgeBase />} />
            </Route>

            {/**App======================== */}
            <Route path="/app" element={<MainComponent />}>
              <Route path="tickets" element={<TicketsComponent />} />
              <Route path="reports" element={<ReportsComponent />} />
              <Route path="contacts" element={<ContactsComponent />} />
              <Route path="settings" element={<SettingsComponent />}>
                <Route path="account" element={<Account />} />
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
          </Routes>
        </Suspense>
      </BrowserRouter>
    </div>
  );
};

export default App;
