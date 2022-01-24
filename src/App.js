import React ,{useEffect}from "react";
import { BrowserRouter, Routes, Route} from "react-router-dom";
import LogIn from "./components/authentication/LogIn";
import MainComponent from "./components/MainComponent/MainComponent";
import ReportsComponent from "./components/Reports/ReportComponent";
import TicketsComponent from "./components/Tickects/TickectsComponent";
import { initialLocation } from "./store/UserSlice";

const App = () => {
  useEffect(() => {
    console.log(initialLocation());
  }, [initialLocation]);
  
  
  return (
    <div className="overflow-hidden">
      <BrowserRouter>
        <Routes path="/">
          <Route exact path="/" element={<LogIn />} />
          <Route path="/help-desk" element={<MainComponent />}>
            <Route path="reports" element={<ReportsComponent />} />
            <Route path="tickets" element={<TicketsComponent />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
