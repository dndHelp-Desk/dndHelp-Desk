import { FC } from "react";
import useClickOutside from "./../../Custom-Hooks/useOnClickOutsideRef";

type Props = {
  openAPIModal: any;
  apiChannelModal: any;
};

const ConnectModal: FC<Props> = ({ apiChannelModal, openAPIModal }) => {
  const modalRef = useClickOutside(() => {
    openAPIModal(false);
    document.body.style.overflow = "";
  });

  //Component =============================
  return (
    <div
      className={`absolute left-0 right-0 top-0 bottom-0 z-[9999] ${
        apiChannelModal ? "" : "hidden"
      }`}
    >
      <div
        ref={modalRef}
        id="connectModal"
        className={`m-auto mt-24 drop-shadow-2xl bg-slate-50 dark:bg-slate-800 rounded h-[60vh] min-h-[30rem] min-w-[35rem] w-[50vw] flex flex-col justify-between pb-6 border border-slate-200 dark:border-slate-700 transition-all duration-300 z-[999]`}
      >
        <header className="w-full min-h-20 border-b border-slate-300 dark:border-slate-700 p-6 space-y-2">
          <h1 className="text-xl font-bold text-slate-800 dark:text-slate-300">
            Business API
          </h1>
          <p className="text-sm text-slate-600 dark:text-slate-400">
            WhatsApp is one of the most popular communication applications in
            the world. WhatsApp is a Facebook company and requires a Facebook
            account and Facebook Business Manager to set up.
          </p>
        </header>
        <section className="w-full min-h-36 p-6 space-y-2">
          <h2 className="text-lg font-bold text-slate-800 dark:text-slate-300">
            What you'll need
          </h2>
          <ol className="list-decimal px-6 text-slate-600 dark:text-slate-400 text-sm space-y-2">
            <li>Access to Facebook Business Manager</li>
            <li>A viable Phone Number for WhatsApp</li>
            <li>Your business’ legal address and details</li>
            <li>Verify your Facebook Business</li>
          </ol>
        </section>
        <footer className="w-full min-h-16 flex justify-between px-6">
          <button
            onClick={() => {
              openAPIModal(false);
              document.body.style.overflow = "";
            }}
            className="bg-inherit outline-none focus:outline-none border-2 border-blue-600 p-2 px-6 rounded text-blue-700 text-sm font-semibold hover:opacity-90 transition-all"
          >
            Cancel
          </button>
          <button className="bg-blue-700 outline-none focus:outline-none p-2 px-6 rounded text-slate-100 text-sm font-semibold hover:opacity-90 transition-all">
            Continue
          </button>
        </footer>
      </div>
    </div>
  );
};
export default ConnectModal;
