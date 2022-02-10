import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LogIn from "./components/authentication/LogIn";
import MainComponent from "./components/MainComponent/MainComponent";
import ReportsComponent from "./components/Reports/ReportComponent";
import TicketsComponent from "./components/Tickets/TicketsComponent";
import ContactsComponent from "./components/Contacts/ContactsComponent";
import SettingsComponent from "./components/Settings/SettingsComponents";
import SupportHome from "./components/ClientSupport/SupportHome";
import NewTicket from "./components/ClientSupport/NewTicket";

const App = () => {
  return (
    <div className="overflow-hidden">
      <BrowserRouter>
        <Routes>
          <Route exact path="/logIn" element={<LogIn />} />
          <Route exact path="/support" element={<SupportHome />}>
            <Route path="new-ticket" element={<NewTicket />} />
          </Route>
          <Route path="/" element={<MainComponent />}>
            <Route path="tickets" element={<TicketsComponent />} />
            <Route path="reports" element={<ReportsComponent />} />
            <Route path="contacts" element={<ContactsComponent />} />
            <Route path="settings" element={<SettingsComponent />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
