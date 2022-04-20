import { FC,useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateAlert } from "../../Redux/Slices/NotificationsSlice";
import {
  BsFillExclamationTriangleFill,
  BsExclamationCircleFill,
  BsCheckCircleFill,
} from "react-icons/bs";
import { AppDispatch, RootState } from "../../Redux/store";

const Alert:FC = () => {
  //Data From the store ====
  const dispatch:AppDispatch = useDispatch();
  const alerts = useSelector((state:RootState) => state.NotificationsData.alerts);
  const [flag, setFlag] = useState<boolean>(false);
  
  useEffect(() => {
    setFlag(alerts.length >= 1 ? true : false);
  }, [alerts.length]);

  //Auto Close Alert After 5 sec ==========
  flag === true &&
    alerts.forEach((alert:any) =>
      setTimeout(() => {
        dispatch(
          updateAlert(alerts.filter((data:any) => data.message !== alert.message))
        );
      }, 5000)
    );

  //map through each alert =========
  const alert =
    alerts.length >= 1 &&
    alerts.map((alert:any, index:any) => {
      return (
        <div
        role="alert"
          key={index}
          className={`transition duration-150 max-w-[35rem] min-w-[5rem] ease-in-out mx-auto py-3 px-4 md:flex items-center justify-between shadow-2xl rounded overflow-hidden ${alert.color}`}
        >
          <div className="sm:flex sm:items-start lg:items-center">
            <div className="flex items-center space-x-2 justify-between px-2 border-r border-slate-900">
              {alert.color === "bg-green-200" ? (
                <BsCheckCircleFill className="text-green-600" />
              ) : alert.color === "bg-yellow-200" ? (
                <BsExclamationCircleFill className="text-yellow-400" />
              ) : (
                <BsFillExclamationTriangleFill className="text-red-600" />
              )}
              <p className="mr-2 text-base font-bold text-gray-800">
                {`${
                  alert.color === "bg-green-200"
                    ? "Success"
                    : alert.color === "bg-yellow-200"
                    ? "Warning"
                    : "Error"
                }`}
              </p>
            </div>
            <p className="px-4 text-sm text-gray-800 tracking-wide pt-2 sm:pt-0 pb-2 sm:pb-0 capitalize">
              {alert.message}
            </p>
          </div>
          <div className="flex items-center justify-end sm:mt-4 md:mt-0 ml-4">
            <button
              onClick={() => {
                dispatch(
                  updateAlert(
                    alerts.filter((data:any) => data.message !== alert.message)
                  )
                );
              }}
              className="focus:outline-none mr-8 bg-indigo-700 transition duration-150 ease-in-out hover:bg-indigo-600 rounded text-white px-6 py-2 text-xs"
            >
              Close
            </button>
          </div>
        </div>
      );
    });

  //React Component ===========
  return (
    <div className={`absolute overflow-hidden z-[9999] ${flag ? "" : "hidden"}`}>
      {/* Code block starts */}
      <div className="fixed bottom-24 right-8 flex flex-col space-y-2">
        {alert}
      </div>
    </div>
  );
};
export default Alert;
