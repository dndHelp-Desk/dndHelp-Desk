import React, { Suspense, lazy } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "./components/Landing Page/Landing";
import LogIn from "./components/authentication/LogIn";
import MainComponent from "./components/MainComponent/MainComponent";
import TicketsComponent from "./components/Tickets/TicketsComponent";
import ContactsComponent from "./components/Contacts/ContactsComponent";

//Lazy Loading Components || Code Splitting ====================
const ReportsComponent = lazy(() =>
  import("./components/Reports/ReportComponent")
);
const SettingsComponent = lazy(() =>
  import("./components/Settings/SettingsComponents")
);
const SupportHome = lazy(() =>
  import("./components/ClientSupport/SupportHome")
);
const NewTicket = lazy(() => import("./components/ClientSupport/NewTicket"));
const KnowledgeBase = lazy(() =>
  import("./components/ClientSupport/KnowledgeBase")
);
const Account = lazy(() => import("./components/Settings/Account"));
const Team = lazy(() => import("./components/Settings/Team"));
const SupportOperations = lazy(() =>
  import("./components/Settings/Support Operations/SupportOperations")
);
const AutomatedReports = lazy(() =>
  import("./components/Settings/AutomatedReports")
);
const Solutions = lazy(() => import("./components/Settings/Solutions"));

//Getting Started Or Setting Up An Account ========================
const GettingStarted = lazy(() =>
  import("./components/Landing Page/GettingStarted")
);
const CompanySetUp = lazy(() =>
  import("./components/Landing Page/CompanySetUp")
);

const App = () => {
  return (
    <div className="overflow-hidden">
      <BrowserRouter>
        <Suspense
          fallback={
            <div className="h-screen w-screen bg-slate-900 flex items-center justify-center">
              <div>
                <div
                  style={{ borderTopColor: "transparent" }}
                  className="w-16 h-16 border-4 border-blue-500 border-dashed rounded-full animate-spin"
                ></div>
              </div>
            </div>
          }
        >
          <Routes>
            {/**Landing ======================== */}
            <Route exact path="/" element={<Landing />} />
            <Route exact path="/getting-started" element={<GettingStarted />} />
            <Route path="/company-set-up" element={<CompanySetUp />} />

            {/**LogIn ======================== */}
            <Route exact path="/logIn" element={<LogIn />} />

            {/**Support ======================== */}
            <Route exact path="/support" element={<SupportHome />}>
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
