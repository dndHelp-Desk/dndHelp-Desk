import { FC } from "react";
import useClickOutside from "../../Custom-Hooks/useOnClickOutsideRef";

type Props = {
  openPhone: any;
  phoneToolTip: boolean;
};

const VoicexVideoCall: FC<Props> = ({ phoneToolTip, openPhone }) => {
  const modalRef = useClickOutside(() => {
    openPhone(false);
  });

  //Component =======================
  return (
    <div
      ref={modalRef}
      role="tooltip"
      className={`${
        phoneToolTip ? "" : "hidden"
      } absolute h-[20rem] w-[15rem] right-[-6.5rem] rounded bg-white dark:bg-slate-800 shadow-2xl drop-shadow-2xl border border-slate-300 dark:border-slate-700 top-10`}
    >
      <div className=""></div>
    </div>
  );
};

export default VoicexVideoCall;
