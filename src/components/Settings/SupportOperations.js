import React from 'react'
import { Navigate } from "react-router";
import { useSelector } from 'react-redux';

const SupportOperations = () => {
  const member_details = useSelector((state) => state.UserInfo.member_details);
  //Allow Admin Only ==========================
  if (member_details[0].access !== "admin") {
    return <Navigate to="/app" />;
  }

  //Component =================
  return (
    <div>
      <div className="max-w-lg mx-auto p-8">
        <details
          className="open:bg-white dark:open:bg-slate-900 open:ring-1 open:ring-black/5 dark:open:ring-white/10 open:shadow-lg p-6 rounded-lg"
          open
        >
          <summary className="text-sm leading-6 text-slate-900 dark:text-white font-semibold select-none">
            Why do they call it Ovaltine?
          </summary>
          <div className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-400">
            <p>
              The mug is round. The jar is round. They should call it Roundtine.
            </p>
          </div>
        </details>
      </div>
    </div>
  );
}

export default SupportOperations