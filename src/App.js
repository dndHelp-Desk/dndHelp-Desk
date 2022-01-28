import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LogIn from "./components/authentication/LogIn";
import MainComponent from "./components/MainComponent/MainComponent";
import ReportsComponent from "./components/Reports/ReportComponent";
import TicketsComponent from "./components/Tickets/TicketsComponent";
import ContactsComponent from "./components/Contacts/ContactsComponent";
import SettingsComponent from "./components/Settings/SettingsComponents";
import MessageThread from "./components/Tickets/MessageThread";

const App = () => {
  return (
    <div className="overflow-hidden">
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<LogIn />} />
          <Route path="/help-desk" element={<MainComponent />}>
            <Route path="reports" element={<ReportsComponent />} />
            <Route path="tickets" element={<TicketsComponent />} />
            <Route path="thread" element={<MessageThread />} />
            <Route path="contacts" element={<ContactsComponent />} />
            <Route path="settings" element={<SettingsComponent />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
