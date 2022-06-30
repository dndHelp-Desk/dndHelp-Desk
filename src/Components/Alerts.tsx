import { FC, useState, useEffect } from "react";
import { BiX } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { updateAlert } from "../Redux/Slices/NotificationsSlice";
import { AppDispatch, RootState } from "../Redux/store";

type Props = {
  alert: any;
};

const Alerts: FC<Props> = ({ alert }) => {
  const [exit, setExit] = useState<boolean>(false);
  const dispatch: AppDispatch = useDispatch();
  //Data From the store ====
  const alerts = useSelector(
    (state: RootState) => state.NotificationsData.alerts
  );
  const [counter, setCounter] = useState<number>(0);

  const handleStartTimer = () => {
    const id = setInterval(() => {
      setCounter((prev) => {
        if (prev < 100) {
          return prev + 50;
        }

        clearInterval(id);
        return prev;
      });
    }, 2500);
  };

  //Remove Alert After Timeout===
  useEffect(() => {
    handleStartTimer();
  }, []);

  useEffect(() => {
    if (counter === 100) {
      // Close notification
      setExit(true);
      setTimeout(() => {
        dispatch(
          updateAlert(alerts?.filter((data: any) => data.id !== alert?.id))
        );
      }, 150);
    }
  }, [counter, alerts, dispatch, alert?.id]);

  //Component ====
  return (
    <div
      role="alert"
      className={`alert transition-all duration-150 w-[25rem] min-w-[15rem] h-[4rem] grid grid-cols-12 shadow-2xl drop-shadow-2xl rounded overflow-hidden bg-slate-100 dark:bg-slate-900 border dark:border-slate-600 border-slate-400 p-2 ${
        exit ? "deleteExit" : ""
      }`}
    >
      <div className="col-span-1">
        <div
          className={`h-full w-1.5 rounded ${
            alert?.color === "bg-green-200"
              ? "bg-green-500"
              : alert?.color === "bg-red-200"
              ? "bg-red-600"
              : "bg-yellow-500"
          }`}
        ></div>
      </div>
      <div className="col-span-9 flex flex-col justify-center px-1 overflow-hidden whitespace-nowrap overflow-ellipsis space-y-[-0.2rem]">
        <span className="text-sm dark:text-slate-300 text-slate-800 font-semibold">
          {alert?.color === "bg-green-200"
            ? "Success"
            : alert?.color === "bg-red-200"
            ? "Warning"
            : "Error"}
        </span>
        <span className="text-xs dark:text-slate-400 text-slate-700 font-medium w-full whitespace-nowrap overflow-hidden overflow-ellipsis capitalize">
          {alert?.message}
        </span>
      </div>
      <div className="col-span-2 flex justify-end items-center p-1">
        <button
          onClick={() => {
            setExit(true);
            setTimeout(() => {
              dispatch(
                updateAlert(
                  alerts?.filter((data: any) => data.id !== alert?.id)
                )
              );
            }, 350);
          }}
          className="outline-none focus:outline-none"
        >
          <BiX className="text-lg dark:text-slate-300 text-slate-800" />
        </button>
      </div>
    </div>
  );
};

export default Alerts;
