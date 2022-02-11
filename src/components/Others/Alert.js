import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateAlert } from "../../store/NotificationsSlice";
import {
  BsFillExclamationTriangleFill,
  BsExclamationCircleFill,
  BsCheckCircleFill,
} from "react-icons/bs";

const Alert = () => {
  //Data From the store ====
  const dispatch = useDispatch();
  const alerts = useSelector((state) => state.NotificationsData.alert);
  const [flag, setFlag] = useState(false);

  useEffect(() => {
    setFlag(alerts.message === "" ? false : true);
  }, [alerts.message]);

  //Auto Close Alert After 5 sec ==========
  flag === true &&
    setTimeout(() => {
      dispatch(updateAlert({ message: "", color: "bg-green-300" }));
    }, 5000);

  //React Component ===========
  return (
    <div
      className={`absolute left-[64.5%] top-[102%] z-[999] ${
        flag ? "" : "hidden"
      }`}
    >
      {/* Code block starts */}
      <div
        id="alert"
        className={`transition duration-150 ease-in-out mx-auto py-3 px-4 md:flex items-center justify-between shadow rounded overflow-hidden ${alerts.color}`}
      >
        <div className="sm:flex sm:items-start lg:items-center">
          <div className="flex items-center space-x-2 justify-between px-2 border-r border-slate-900">
            {alerts.color === "bg-green-200" ? (
              <BsCheckCircleFill className="text-green-600" />
            ) : alerts.color === "bg-yellow-200" ? (
              <BsExclamationCircleFill className="text-yellow-400" />
            ) : (
              <BsFillExclamationTriangleFill className="text-red-600" />
            )}
            <p className="mr-2 text-base font-bold text-gray-800">
              {`${
                alerts.color === "bg-green-200"
                  ? "Success"
                  : alerts.color === "bg-yellow-200"
                  ? "Warning"
                  : "Error"
              }`}
            </p>
          </div>
          <p className="px-4 text-sm text-gray-800 tracking-wide pt-2 sm:pt-0 pb-2 sm:pb-0 capitalize">
            {alerts.message}
          </p>
        </div>
        <div className="flex items-center justify-end sm:mt-4 md:mt-0 ml-4">
          <button
            onClick={() => {
              setFlag(false);
              dispatch(updateAlert({ message: "", color: "bg-green-300" }));
            }}
            className="focus:outline-none mr-8 bg-indigo-700 transition duration-150 ease-in-out hover:bg-indigo-600 rounded text-white px-6 py-2 text-xs"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
export default Alert;
