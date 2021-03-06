import { FC } from "react";
import {
  TbBrandSlack,
  TbBrandWhatsapp,
  TbBrandInstagram,
  TbBrandTwitter,
  TbBrandMessenger,
  TbMessage,
  TbMail,
  TbBrandTelegram,
} from "react-icons/tb";
import { Link } from "react-router-dom";

type Props = {
  openAPIModal: any;
};

const Connect: FC<Props> = ({ openAPIModal }) => {
  return (
    <div className="w-[35rem] h-[21rem] rounded dark:bg-slate-800 bg-white border dark:border-slate-800 border-slate-300 p-2 pt-4 overflow-hidden relative">
      <div className="rounded w-full h-full p-2 flex-col flex justify-between space-y-4">
        <article>
          <div className="flex-[1] dark:text-slate-300 text-slate-800 text-lg font-semibold font-sans capitalize">
            Connect
          </div>
          <p className="mt-2 text-xs text-slate-700 dark:text-slate-400 font-medium tracking-normal">
            Set up your preferred channels and start communicating with your
            customers in a single thread.
          </p>
        </article>
        <div className="mt-4 w-full min-h-[15rem] sm:min-h-[8rem] rounded border border-slate-300 dark:border-slate-700 flex-[5] grid grid-cols-3 sm:grid-cols-4 grid-rows-3 sm:grid-rows-2 gap-3 p-3">
          {/**Slack =========================== */}
          <button
            onClick={() => {
              openAPIModal(true);
              document.body.style.overflow = "hidden";
            }}
            className="connect_btn"
          >
            <TbBrandSlack className="text-2xl text-slate-700 dark:text-slate-300" />
            <p className="text-xs capitalize font-medium font-sans text-slate-800 dark:text-slate-400">
              Slack
            </p>
            <span className="h-2.5 w-2.5 rounded-full absolute right-1 top-1 border border-slate-400 dark:border-slate-600 overflow-hidden"></span>
          </button>

          {/**WhatsApp =========================== */}
          <button
            onClick={() => {
              openAPIModal(true);
              document.body.style.overflow = "hidden";
            }}
            className="connect_btn"
          >
            <TbBrandWhatsapp className="text-2xl text-slate-700 dark:text-slate-300" />
            <p className="text-xs capitalize font-medium font-sans text-slate-800 dark:text-slate-400">
              WhatsApp
            </p>
            <span className="h-2.5 w-2.5 rounded-full absolute right-1 top-1 border border-slate-400 dark:border-slate-600 overflow-hidden"></span>
          </button>

          {/**Instagram =========================== */}
          <button
            onClick={() => {
              openAPIModal(true);
              document.body.style.overflow = "hidden";
            }}
            className="connect_btn"
          >
            <TbBrandInstagram className="text-2xl text-slate-700 dark:text-slate-300" />
            <p className="text-xs capitalize font-medium font-sans text-slate-800 dark:text-slate-400">
              Instagram
            </p>
            <span className="h-2.5 w-2.5 rounded-full absolute right-1 top-1 border border-slate-400 dark:border-slate-600 overflow-hidden"></span>
          </button>

          {/**Twitter =========================== */}
          <button
            onClick={() => {
              openAPIModal(true);
              document.body.style.overflow = "hidden";
            }}
            className="connect_btn"
          >
            <TbBrandTwitter className="text-2xl text-slate-700 dark:text-slate-300" />
            <p className="text-xs capitalize font-medium font-sans text-slate-800 dark:text-slate-400">
              Twitter
            </p>
            <span className="h-2.5 w-2.5 rounded-full absolute right-1 top-1 border border-slate-400 dark:border-slate-600 overflow-hidden"></span>
          </button>

          {/**Messenger =========================== */}
          <button
            onClick={() => {
              openAPIModal(true);
              document.body.style.overflow = "hidden";
            }}
            className="connect_btn"
          >
            <TbBrandMessenger className="text-2xl text-slate-700 dark:text-slate-300" />
            <p className="text-xs capitalize font-medium font-sans text-slate-800 dark:text-slate-400">
              Messenger
            </p>
            <span className="h-2.5 w-2.5 rounded-full absolute right-1 top-1 border border-slate-400 dark:border-slate-600 overflow-hidden"></span>
          </button>

          {/**SMS =========================== */}
          <button
            onClick={() => {
              openAPIModal(true);
              document.body.style.overflow = "hidden";
            }}
            className="connect_btn"
          >
            <TbMessage className="text-2xl text-slate-700 dark:text-slate-300" />
            <p className="text-xs capitalize font-medium font-sans text-slate-800 dark:text-slate-400">
              SMS
            </p>
            <span className="h-2.5 w-2.5 rounded-full absolute right-1 top-1 border border-slate-400 dark:border-slate-600 overflow-hidden"></span>
          </button>

          {/**Email =========================== */}
          <Link to="/app/settings/support-operations" className="connect_btn">
            <TbMail className="text-2xl text-slate-700 dark:text-slate-300" />
            <p className="text-xs capitalize font-medium font-sans text-slate-800 dark:text-slate-400">
              Email
            </p>
            <span className="h-2.5 w-2.5 rounded-full absolute right-1 top-1 border border-slate-400 dark:border-slate-600 overflow-hidden bg-green-500"></span>
          </Link>

          {/**Telegram =========================== */}
          <button
            onClick={() => {
              openAPIModal(true);
              document.body.style.overflow = "hidden";
            }}
            className="connect_btn"
          >
            <TbBrandTelegram className="text-2xl text-slate-700 dark:text-slate-300" />
            <p className="text-xs capitalize font-medium font-sans text-slate-800 dark:text-slate-400">
              Telegram
            </p>
            <span className="h-2.5 w-2.5 rounded-full absolute right-1 top-1 border border-slate-400 dark:border-slate-600 overflow-hidden"></span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Connect;
