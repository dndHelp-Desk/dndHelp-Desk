import { FC, memo } from "react";
import { useSelector } from "react-redux";
import Alerts from "./Alerts";
import { RootState } from "../Redux/store";

const AlertsWrapper: FC = memo(() => {
  //Data From the store ====
  const alerts = useSelector(
    (state: RootState) => state.NotificationsData.alerts
  );

  //React Component ===========
  return (
    <div className={`absolute overflow-hidden z-[9999]`}>
      {/* Code block starts */}
      <div className="fixed bottom-24 right-8 flex flex-col space-y-2">
        {alerts?.map((alert: any) => {
          return <Alerts key={alert?.id} alert={alert} />;
        })}
      </div>
    </div>
  );
});
export default AlertsWrapper;
