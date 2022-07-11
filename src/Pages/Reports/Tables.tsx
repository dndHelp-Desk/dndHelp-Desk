import { FC, useState } from "react";
import { HiOutlineSwitchVertical } from "react-icons/hi";
import { BsCloudDownload, BsPrinter } from "react-icons/bs";
import { BiChevronRight, BiChevronLeft } from "react-icons/bi";
import { useSelector } from "react-redux";
import { RootState } from "../../Redux/store";

interface Props {
  data: any;
  option: any;
  setOption: any;
  tableData: any;
}

const Tables: FC<Props> = ({ data, option, setOption, tableData }) => {
  const [loadMore, setLimit] = useState<number | any>(10);
  const allMembers = useSelector(
    (state: RootState) => state.UserInfo.allMembers
  );
  const [sortBy, setSort] = useState<any>(["total", 1]);

  //Loop through each ticket and return a row of consolidated data
  const rows = tableData
    ?.sort((a: any, b: any) => {
      return sortBy[1] === 1
        ? b[sortBy[0]] - a[sortBy[0]]
        : a[sortBy[0]] - b[sortBy[0]];
    })
    ?.map((elem: any, index: any) => {
      return (
        <tr
          key={index}
          className={`w-full h-10 text-center items-left grid grid-cols-5 border-b dark:border-slate-800 border-slate-300 px-2 capitalize ${
            loadMore - 10 <= index + 1 && index + 1 <= loadMore ? "" : "hidden"
          }`}
        >
          <td className="px-2 col-span-3 flex items-center overflow-hidden text-ellipsis whitespace-nowrap">
            {index + 1}.{" "}
            {allMembers.length >= 1 && option === "agent_email"
              ? allMembers.filter((agent) => agent?.email === elem?.name)[0]
                  ?.name
              : elem?.name}
          </td>
          <td className="col-span-1 px-2 hidden md:flex items-center justify-center overflow-hidden text-ellipsis whitespace-nowrap">
            {elem?.resolution_time}
          </td>
          <td className="col-span-1 px-2 flex items-center justify-end sm:justify-center overflow-hidden text-ellipsis whitespace-nowrap">
            {elem?.total}
          </td>
        </tr>
      );
    });

  //Download Csv Fuctions ======================
  const convertToCsv = (arr: any) => {
    const keys = Object.keys(arr[0]).sort((a, b) => (a < b ? -1 : 1));
    const replacer = (value: any) => {
      return value;
    };
    const processRow = (row: any) =>
      keys.map((key) => JSON.stringify(row[key], replacer(row[key]))).join(",");
    return [keys.join(","), ...arr.map(processRow)].join("\r\n");
  };

  const downloadFile = (fileName: any, data: any) => {
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
    <div className="col-span-3 h-[35rem] lg:col-span-2 rounded-md flex flex-col gap-2 border dark:border-slate-750 border-slate-300">
      <section className="h-full min-h-[25rem] dark:bg-slate-800 bg-white rounded-md overflow-hidden p-1">
        <div className="h-12 flex justify-between items-center px-4">
          <div className="text-sm dark:text-slate-300 text-slate-900 font-sans dark:font-semibold font-bold uppercase tracking-wider">
            {option === "agent_email" ? "Agents" : "Company"}
          </div>
          <div className="flex space-x-2">
            {/**Select Report ================= */}
            <select
              onChange={(e) => setOption(e.target.value)}
              className="h-8 w-28 md:w-40 rounded-sm text-xs dark:text-slate-400 text-slate-500 font-semibold p-2 dark:bg-slate-750 bg-slate-50 dark:border-slate-700 border-slate-300 focus:ring-0 focus:outline-none"
            >
              <option value="branch_company">Company</option>
              <option value="agent_email">Agents</option>
            </select>
            <button
              onClick={() => {
                window.print();
              }}
              className="h-8 w-20 rounded-sm text-xs font-medium p-2 bg-slate-800 dark:bg-blue-700  hover:opacity-80 text-slate-200 focus:ring-0 focus:outline-none hidden md:flex justify-center items-center space-x-2"
            >
              <span>Print</span>
              <BsPrinter className="text-sm text-white" />
            </button>
            <button
              onClick={() => {
                let csv = convertToCsv(data);
                downloadFile("Tickects Report.csv", csv);
              }}
              className="h-8 w-20 rounded-sm text-xs font-medium p-2 bg-slate-800 dark:bg-blue-700  hover:opacity-80 text-slate-200 focus:ring-0 focus:outline-none flex justify-center items-center space-x-2"
            >
              <span>CSV</span>
              <BsCloudDownload className="text-sm text-white" />
            </button>
          </div>
        </div>
        <table className="w-full h-[28rem] flex flex-col px-4 gap-1">
          <thead className="w-full flex items-center  dark:bg-slate-700 bg-slate-100 text-[0.65rem] font-semibold uppercase dark:text-slate-400 text-slate-700">
            <tr className="w-full h-10 grid grid-cols-5 text-left px-2">
              <th className="flex col-span-3 space-x-1 items-center px-1 overflow-hidden text-ellipsis whitespace-nowrap">
                Name
              </th>
              <th className="col-span-1 hidden md:flex space-x-1 items-center justify-between px-3 dark:border-slate-700 overflow-hidden text-ellipsis whitespace-nowrap">
                <span>Average Resolution Time</span>
                <label htmlFor="resTime">
                  <input
                    type="checkbox"
                    name="resTime"
                    id="resTime"
                    className="hidden"
                    onChange={(e) =>
                      e.target.checked
                        ? setSort(["unfiltered_resolution_time", 1])
                        : setSort(["unfiltered_resolution_time", 2])
                    }
                  />
                  <HiOutlineSwitchVertical
                    className={`text-sm cursor-pointer hover:opacity-80 ${
                      sortBy[0] === "unfiltered_resolution_time" &&
                      "text-blue-600"
                    }`}
                  />
                </label>
              </th>
              <th className="col-span-1 flex space-x-1 items-center justify-between px-3 overflow-hidden text-ellipsis whitespace-nowrap">
                <span>Total Tickets</span>
                <label htmlFor="total">
                  <input
                    type="checkbox"
                    name="total"
                    id="total"
                    className="hidden"
                    onChange={(e) =>
                      e.target.checked
                        ? setSort(["total", 1])
                        : setSort(["total", 2])
                    }
                  />
                  <HiOutlineSwitchVertical
                    className={`text-sm cursor-pointer hover:opacity-80 ${
                      sortBy[0] === "total" && "text-blue-600"
                    }`}
                  />
                </label>
              </th>
            </tr>
          </thead>
          <tbody className="w-full pt-1 capitalize text-xs font-medium dark:text-slate-400 text-slate-600 overflow-hidden">
            {rows}
          </tbody>
        </table>
        <div className="w-full h-14 flex justify-center items-center">
          {" "}
          {/**Pagination ================================ */}
          <div className="h-[8%] w-full bottom-0 flex flex-col justify-center items-center">
            <div className="h-8 w-56 grid grid-cols-4 gap-1 dark:bg-[#182235] bg-slate-50 py-1 rounded border dark:border-slate-700 border-slate-300">
              <button
                onClick={() => {
                  setLimit(loadMore <= 19 ? loadMore - 0 : loadMore - 10);
                }}
                className="col-span-1 dark:text-slate-300 text-slate-800 font-bold text-lg tracking-wider flex items-center justify-center outline-none focus:outline-none hover:opacity-80"
              >
                <BiChevronLeft />
              </button>
              <div className="col-span-2 dark:text-slate-300 text-slate-800 font-bold text-xs tracking-wider flex items-center justify-center border-l border-r dark:border-slate-700 border-slate-300 overflow-hidden px-1">
                <p className="text-[0.65rem] overflow-hidden overflow-ellipsis whitespace-nowrap">
                  {loadMore - 10 === 0 ? 1 : loadMore - 10}{" "}
                  <span className="text-slate-500">-</span>{" "}
                  {loadMore > tableData.length ? tableData.length : loadMore}{" "}
                  <span className="text-slate-500">of </span>
                  {tableData.length}
                </p>
              </div>
              <button
                onClick={() => {
                  setLimit(tableData.length > loadMore ? loadMore + 10 : 10);
                }}
                className="col-span-1 dark:text-slate-300 text-slate-800 font-bold text-lg tracking-wider flex items-center justify-center outline-none focus:outline-none hover:opacity-80"
              >
                <BiChevronRight />
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Tables;
