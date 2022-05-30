import { FC } from "react";
import useOnClickOutside from "../../Custom-Hooks/useOnClickOutsideRef";

type Props = {
  zoomImg: any;
  setZoomed: any;
};

const ZoomedImg: FC<Props> = ({ zoomImg, setZoomed }) => {
  const modalRef = useOnClickOutside(() => {
    setZoomed((prev: any) => ({ ...prev, open: false, scr: "" }));
    document.body.style.overflow = "";
  });

  //Component ==========
  return (
    <div
      className={`fixed left-0 right-0 top-0 bottom-0 z-[9999] bg-[#030d27b7] ${
        zoomImg?.open ? "" : "hidden"
      }`}
    >
      <div
        ref={modalRef}
        className={`m-auto mt-20 drop-shadow-2xl bg-slate-50 dark:bg-slate-800 rounded object-center h-[80vh] w-[80vw] min-h-[10rem] flex flex-col border border-slate-500 dark:border-slate-600 transition-all duration-300 z-[999] overflow-hidden p-2 relative`}
      >
        {/**Close Modal Btn */}
        <button
          type="button"
          onClick={() => {
            setZoomed((prev: any) => ({ ...prev, open: false, scr: "" }));
            document.body.style.overflow = "";
          }}
          className="absolute top-2 right-2 bg-red-700 hover:bg-red-700 transition-all duration-200 text-slate-100 text-sm rounded h-6 w-6 flex justify-center items-center outlinenone focus:outline-none z-[999]"
        >
          <span>x</span>
        </button>
        {/**Close Modal Btn */}
        <img
          src={zoomImg?.src}
          alt="zoomedImg"
          className="object-center object-scale-down h-full cursor-zoom-in"
        />
      </div>
    </div>
  );
};

export default ZoomedImg;
