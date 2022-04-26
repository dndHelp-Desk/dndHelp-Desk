import { FC } from "react";

type Props = {};

const ConnectModal: FC<Props> = () => {
  return (
    <div className="fixed top-24 hidden z-[999] drop-shadow-2xl bg-slate-50 dark:bg-slate-800 rounded h-[80vh] w-[60vw] shadow-[0 0 0 9999999px rgba(0, 0, 0, 0.3)]"></div>
  );
};
export default ConnectModal;
