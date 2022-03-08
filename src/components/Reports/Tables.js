import React, { useState } from "react";
import { HiOutlineSwitchVertical } from "react-icons/hi";
import { BsDownload } from "react-icons/bs";

const Tables = ({ data }) => {
  const [option, setOption] = useState("branch_company");
  const tableData = [...new Set(data.map((data) => data[option]))].map(
    (elem) => ({
      name: elem,
      open:
        data.length >= 1
          ? data.filter(
              (data) => data[option] === elem && data.status === "open"
            ).length
          : 0,
      solved:
        data.length >= 1
          ? data.filter(
              (data) => data[option] === elem && data.status === "solved"
            ).length
          : 0,
      total:
        data.length >= 1
          ? data.filter((data) => data[option] === elem).length
          : 0,
    })
  );

  //Loop through each ticket and return a row of consolidated data
  const rows = tableData.map((elem, index) => {
    return (
      <tr
        key={index}
        className="w-full h-10 text-center items-left grid grid-cols-7 border-b dark:border-slate-800 border-slate-300 px-2 capitalize"
      >
        <td className="px-2 flex items-center">{index + 1}</td>
        <td className="px-2 col-span-3 flex items-center overflow-hidden text-ellipsis whitespace-nowrap">
          {elem.name}
        </td>
        <td className="px-2 flex items-center overflow-hidden text-ellipsis whitespace-nowrap">
          {elem.open}
        </td>
        <td className="px-2 flex items-center overflow-hidden text-ellipsis whitespace-nowrap">
          {elem.solved}
        </td>
        <td className="px-2 flex items-center overflow-hidden text-ellipsis whitespace-nowrap">
          {elem.total}
        </td>
      </tr>
    );
  });

  //Download Csv Fuctions ======================
  const convertToCsv = (arr) => {
    const keys = Object.keys(arr[0]);
    const replacer = (_key, value) => (value === null ? "" : value);
    const processRow = (row) =>
      keys.map((key) => JSON.stringify(row[key], replacer)).join(",");
    return [keys.join(","), ...arr.map(processRow)].join("\r\n");
  };

  const downloadFile = (fileName, data) => {
    let link = document.createElement("a");
    link.setAttribute(
      "href",
      "data:text/plain;charset=utf-8," + encodeURIComponent(data)
    );
    link.setAttribute("download", fileName);
    link.style.display = "none";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  //Component ==========================================
  return (
    <div className="col-span-3 h-[32rem] lg:col-span-2 rounded-xl flex flex-col gap-2">
      <section className="h-full min-h-[25rem] dark:bg-slate-900 bg-slate-100 rounded-xl overflow-hidden p-1">
        <div className="h-12 flex justify-between items-center px-4 dark:bg-slate-900 bg-slate-100">
          <h2 className="text-xs dark:text-slate-300 text-slate-900 font-sans dark:font-semibold font-bold uppercase tracking-normal">
            {option === "agent_name" ? "Agents" : "Restuarants"}
          </h2>
          <div className="flex space-x-2">
            {/**Select Report ================= */}
            <select
              onChange={(e) => setOption(e.target.value)}
              className="h-8 w-40 rounded-md text-xs p-2 dark:bg-slate-900 bg-slate-100 dark:text-slate-500 text-slate-500 dark:border-slate-700 border-slate-300 focus:ring-0 focus:outline-none"
            >
              <option value="branch_company">Restuarants</option>
              <option value="agent_name">Agents</option>
            </select>
            <button
              onClick={() => {
                let csv = convertToCsv(data);
                downloadFile("Tickects Report.csv", csv);
              }}
              className="h-8 w-20 rounded-md text-xs p-2 bg-blue-600  hover:opacity-80 text-slate-200 dark:border-slate-700 border border-slate-300 focus:ring-0 focus:outline-none flex justify-center items-center space-x-2"
            >
              <span>CSV</span>
              <BsDownload className="text-sm text-slate-300" />
            </button>
          </div>
        </div>
        <table className="w-full h-[28rem] flex flex-col px-4">
          <thead className="w-full flex items-center  dark:bg-[#1e293b9c] bg-slate-200 text-[0.65rem] font-semibold uppercase dark:text-slate-400 text-slate-700">
            <tr className="w-full h-10  grid grid-cols-7 text-left px-2">
              <th className="flex space-x-1 items-center px-1">index</th>
              <th className="flex col-span-3 space-x-1 items-center px-1 overflow-hidden text-ellipsis whitespace-nowrap">
                Name
              </th>
              <th className="flex space-x-1 items-center px-1 overflow-hidden text-ellipsis whitespace-nowrap">
                <span>Open</span>
                <HiOutlineSwitchVertical className="text-sm cursor-pointer hover:opacity-80" />
              </th>
              <th className="flex space-x-1 items-center px-1 overflow-hidden text-ellipsis whitespace-nowrap">
                <span>Resolved</span>
                <HiOutlineSwitchVertical className="text-sm cursor-pointer hover:opacity-80" />
              </th>
              <th className="flex space-x-1 items-center px-1 overflow-hidden text-ellipsis whitespace-nowrap">
                <span>Tickets</span>
                <HiOutlineSwitchVertical className="text-sm cursor-pointer hover:opacity-80" />
              </th>
            </tr>
          </thead>
          <tbody className="w-full pt-1 capitalize text-xs font-medium dark:text-slate-400 text-slate-600 overflow-hidden overflow-y-scroll no-scrollbar no-scrollbar::-webkit-scrollbar">
            {rows}
          </tbody>
        </table>
      </section>
    </div>
  );
};

export default Tables;
