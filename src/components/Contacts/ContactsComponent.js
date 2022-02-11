import React from 'react';

const ContactsComponent = () => {
  return (
    <div className="dbg-transparent mt-4 min-h-[40rem] w-[90%] sm:w-full rounded-xl container 2xl:w-[72rem] overflow-hidden grid grid-cols-3 gap-4">
      {/**Contacts List ======================================== */}
      <div className="col-span-2 border-r dark:border-slate-900 pr-2 flex flex-col gap-4">
        {/**Search Menu ======================================== */}
        <div className="h-12 w-full rounded-xl dark:bg-slate-900 bg-slate-100"></div>
        {/**Contacts ======================================== */}
        <div className="h-[37rem] w-full rounded-xl bg-tranparent overflow-y-scroll no-scrollbar no-scrollbar::-webkit-scrollbar">
          <div className="h-[10rem] w-[15rem] rounded-xl dark:bg-slate-900 bg-slate-100 p-2 flex flex-col items-center">
            <div className="dark:bg-slate-700 bg-slate-400 h-14 w-14 rounded-full flex items-center justify-center text-lg font-bold trackind-wide"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactsComponent;
