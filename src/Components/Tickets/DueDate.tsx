import { FC, useState } from "react";
import { BiAlarm, BiXCircle } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { updateAlert } from "../../Redux/Slices/NotificationsSlice";
import { AppDispatch, RootState } from "../../Redux/store";

interface Props {
  setValues: (inputValue: any) => any;
  showTimePicker: any;
  setTimePicker: any;
}

const DueDate: FC<Props> = ({
  setValues,
  showTimePicker,
  setTimePicker,
}) => {
  const dispatch: AppDispatch = useDispatch();
  const alerts = useSelector(
    (state: RootState) => state.NotificationsData.alerts
  );
  const [warn, setWarn] = useState<boolean>(false);
  const [values, setDue] = useState<{
    day: number | string;
    hour: number | string;
    min: number | string;
  }>({
    day: "",
    hour: "",
    min: "",
  });

  const handleSubmit = () => {
    const day = Number(values?.day) >= 1 ? Number(values?.day) * 86400000 : 0;
    const hour = Number(values?.hour) >= 1 ? Number(values?.hour) * 3600000 : 0;
    const min = Number(values?.min) >= 1 ? Number(values?.min) * 60000 : 0;
    const milliseconds = day + hour + min;
    if (milliseconds >= 60000) {
      setWarn(false);
      setValues((prev: any) => ({
        ...prev,
        date: new Date(new Date().getTime() + milliseconds).toLocaleString(),
      }));
      setDue({
        day: "",
        hour: "",
        min: "",
      });
      setTimePicker(false);
    } else if (milliseconds < 60000) {
      setWarn(true);
      dispatch(
        updateAlert([
          ...alerts,
          {
            message: "Please enter proper time",
            color: "bg-yellow-200",
            id: new Date().getTime(),
          },
        ])
      );
    }
  };

  //Component ====
  return (
    <div
      className={`${
        showTimePicker ? "" : "hidden"
      } absolute bottom-12 right-3 w-[22rem] h-[10rem] rounded bg-slate-50 dark:bg-slate-700 z-[999] border-2 border-slate-400 dark:border-slate-500 shadow-2xl drop-shadow-2xl after:absolute after:contents-[''] after:h-5 after:w-5 after:bg-inherit after:border-2 after:border-inherit after:border-l-transparent after:border-t-transparent after:bottom-[-0.65rem] after:left-[11.6rem] after:rotate-45`}
    >
      {/**Close Button */}
      <BiXCircle
        onClick={() => {
          setTimePicker(false);
        }}
        className="absolute top-0 right-0 h-5 w-5 flex justify-center items-center text-xs rounded text-slate-500 dark:text-slate-400 cursor-pointer"
      />
      {/**Close Button */}
      <div className="w-full h-full overflow-hidden p-4">
        <h4 className="text-xs uppercase text-slate-800 dark:text-slate-300 font-bold">
          Max time allowed is 8HRS
        </h4>
        <div>
          <div
            className={`h-10 w-full border ${
              warn ? "border-red-600" : "border-slate-300 dark:border-slate-600"
            }  mt-4 m-auto grid grid-cols-3 rounded text-xs uppercase text-slate-800 dark:text-slate-300 font-semibold`}
          >
            {/**Days ========= */}
            <div className="col-span-1 grid grid-cols-5 overflow-hidden">
              <div className="col-span-3 overflow-hidden">
                <label htmlFor="day">
                  <input
                    type="text"
                    name="day"
                    id="day"
                    value={values?.day}
                    onChange={(e) => {
                      setDue((prev: any) => ({ ...prev, day: e.target.value }));
                    }}
                    placeholder="00"
                    autoComplete="off"
                    className="h-full w-full outline-none focus:outline-none focus:border-0 focus:ring-0 border-0 bg-inherit text-inherit text-right tracking-wider px-2"
                  />
                </label>
              </div>
              <div className="col-span-2 border-x border-slate-300 dark:border-slate-600 flex justify-center items-center text-inherit">
                <span>DAY</span>
              </div>
            </div>
            {/**Hours ========= */}
            <div className="col-span-1 grid grid-cols-5 overflow-hidden">
              <div className="col-span-3 overflow-hidden">
                <label htmlFor="hours">
                  <input
                    type="text"
                    name="hours"
                    id="hours"
                    value={values?.hour}
                    onChange={(e) => {
                      setDue((prev: any) => ({
                        ...prev,
                        hour: e.target.value,
                      }));
                    }}
                    placeholder="00"
                    autoComplete="off"
                    className="h-full w-full outline-none focus:outline-none focus:border-0 focus:ring-0 border-0 bg-inherit text-inherit text-right tracking-wider px-2"
                  />
                </label>
              </div>
              <div className="col-span-2 border-x border-slate-300 dark:border-slate-600 flex justify-center items-center text-inherit">
                <span>HRS</span>
              </div>
            </div>
            {/**Minutes ========= */}
            <div className="col-span-1 grid grid-cols-5 overflow-hidden">
              <div className="col-span-3 overflow-hidden">
                <label htmlFor="minutes">
                  <input
                    type="text"
                    name="minutes"
                    id="minutes"
                    value={values?.min}
                    onChange={(e) => {
                      setDue((prev: any) => ({ ...prev, min: e.target.value }));
                    }}
                    placeholder="00"
                    autoComplete="off"
                    className="h-full w-full outline-none focus:outline-none focus:border-0 focus:ring-0 border-0 bg-inherit text-inherit text-right tracking-wider px-2"
                  />
                </label>
              </div>
              <div className="col-span-2 border-l border-slate-300 dark:border-slate-600 flex justify-center items-center text-inherit">
                <span>MIN</span>
              </div>
            </div>
          </div>
          {/***Set Time ======================== */}
          <div className="flex justify-between w-full mt-4">
            <button
              type="button"
              onClick={() => handleSubmit()}
              className="px-6 py-2 rounded bg-slate-800 dark:bg-blue-700 text-slate-50 text-xs uppercase flex justify-center items-center space-x-2 hover:opacity-80 transition-all duration-200"
            >
              <span>set time</span>
              <BiAlarm className="text-lg" />
            </button>
            <button
              type="button"
              onClick={() => handleSubmit()}
              className="px-6 py-2 rounded bg-slate-800 dark:bg-blue-700 text-slate-50 text-xs uppercase flex justify-center items-center space-x-2 hover:opacity-80 transition-all duration-200"
            >
              <span>set reminder</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default DueDate;
