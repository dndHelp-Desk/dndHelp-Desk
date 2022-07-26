import { FC } from "react";
import useClickOutside from "../../Custom-Hooks/useOnClickOutsideRef";

type Props = {
  openWhatsNew: any;
  whatsNewOpen: boolean;
};

const WhatsNew: FC<Props> = ({ whatsNewOpen, openWhatsNew }) => {
  const modalRef = useClickOutside(() => {
    openWhatsNew(false);
  });

  //Component =======================
  return (
    <div
      ref={modalRef}
      role="tooltip"
      className={`${
        whatsNewOpen ? "" : "hidden"
      } absolute h-[30rem] w-[20rem] right-[-6rem] rounded bg-white dark:bg-slate-800 shadow-2xl drop-shadow-2xl border border-slate-300 dark:border-slate-700 top-10 z-[999]`}
    >
      <div className=""></div>
    </div>
  );
};

export default WhatsNew;
