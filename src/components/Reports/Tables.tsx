import { FC, useState, useMemo } from "react";
import { HiOutlineSwitchVertical } from "react-icons/hi";
import { BsCloudDownload, BsPrinter } from "react-icons/bs";
import { useSelector } from "react-redux";
import { RootState } from "../../Redux/store";

interface Props {
  data: any;
}

const Tables: FC<Props> = ({ data }) => {
  const allMembers = useSelector(
    (state: RootState) => state.UserInfo.allMembers
  );
  const [option, setOption] = useState<string | any>("branch_company");
  const [sortBy, setSort] = useState<any>(["total", 1]);
  const tableData = useMemo(
    () =>
      Array.from(new Set(data.map((data: any) => data[option])))
        .map((elem): any => ({
          name: elem,
          open:
            data.length >= 1
              ? data.filter(
                  (data: any) => data[option] === elem && data.status === "open"
                ).length
              : 0,
          solved:
            data.length >= 1
              ? data.filter(
                  (data: any) =>
                    data[option] === elem && data.status === "solved"
                ).length
              : 0,
          reopened:
            data.length >= 1
              ? data.filter(
                  (data: any) => data[option] === elem && data.reopened === true
                ).length
              : 0,
          total:
            data.length >= 1
              ? data.filter((data: any) => data[option] === elem).length
              : 0,
        }))
        .sort((a, b) => {
          return sortBy[1] === 1
            ? b[sortBy[0]] - a[sortBy[0]]
            : a[sortBy[0]] - b[sortBy[0]];
        }),
    [data, option, sortBy]
  );

  //Loop through each ticket and return a row of consolidated data
  const rows = tableData.map((elem, index) => {
    return (
      <tr
        key={index}
        className="w-full h-10 text-center items-left grid grid-cols-5 md:grid-cols-7 border-b dark:border-slate-800 border-slate-300 px-2 capitalize"
      >
        <td className="px-2 col-span-3 flex items-center overflow-hidden text-ellipsis whitespace-nowrap">
          {index + 1}.{" "}
          {allMembers.length >= 1 && option === "agent_email"
            ? allMembers.filter((agent) => agent.email === elem.name)[0].name
            : elem.name}
        </td>
        <td className="px-2 hidden md:flex items-center justify-center overflow-hidden text-ellipsis whitespace-nowrap">
          {elem.open}
        </td>
        <td className="px-2 hidden md:flex items-center justify-center overflow-hidden text-ellipsis whitespace-nowrap">
          {elem.reopened}
        </td>
        <td className="px-2 hidden md:flex items-center justify-center overflow-hidden text-ellipsis whitespace-nowrap">
          {elem.solved}
        </td>
        <td className="px-2 flex items-center justify-center overflow-hidden text-ellipsis whitespace-nowrap">
          {elem.total}
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
    <div className="col-span-3 h-[32rem] lg:col-span-2 rounded-md flex flex-col gap-2">
      <section className="h-full min-h-[25rem] dark:bg-slate-800 bg-white border dark:border-slate-800 border-slate-3000 rounded-md overflow-hidden shadow p-1">
        <div className="h-12 flex justify-between items-center px-4">
          <h2 className="text-xs dark:text-slate-300 text-slate-900 font-sans dark:font-semibold font-bold uppercase tracking-wider">
            {option === "agent_email" ? "Agents" : "Company"}
          </h2>
          <div className="flex space-x-2">
            {/**Select Report ================= */}
            <select
              onChange={(e) => setOption(e.target.value)}
              className="h-8 w-40 rounded text-xs dark:text-slate-500 text-slate-500 font-semibold p-2 dark:bg-slate-900 bg-slate-100 dark:border-slate-700 border-slate-300 focus:ring-0 focus:outline-none"
            >
              <option value="branch_company">Company</option>
              <option value="agent_email">Agents</option>
            </select>
            <button
              onClick={() => {
                let code = prompt("Enter Admin Pin");
                code === "0001" ? window.print() : alert("Wrong Pin");
              }}
              className="h-8 w-20 rounded text-xs p-2 bg-blue-700  hover:opacity-80 text-slate-200 dark:border-slate-700 border border-slate-300 focus:ring-0 focus:outline-none flex justify-center items-center space-x-2"
            >
              <span>Print</span>
              <BsPrinter className="text-sm text-white" />
            </button>
            <button
              onClick={() => {
                let csv = convertToCsv(data);
                let code = prompt("Enter Admin Pin");
                code === "0001"
                  ? downloadFile("Tickects Report.csv", csv)
                  : alert("Wrong Pin");
              }}
              className="h-8 w-20 rounded text-xs p-2 bg-blue-700  hover:opacity-80 text-slate-200 dark:border-slate-700 border border-slate-300 focus:ring-0 focus:outline-none flex justify-center items-center space-x-2"
            >
              <span>CSV</span>
              <BsCloudDownload className="text-sm text-white" />
            </button>
          </div>
        </div>
        <table className="w-full h-[28rem] flex flex-col px-4 gap-1">
          <thead className="w-full flex items-center  dark:bg-slate-700 bg-slate-200 text-[0.65rem] font-semibold uppercase dark:text-slate-400 text-slate-700">
            <tr className="w-full h-10 grid grid-cols-5 md:grid-cols-7 text-left px-2">
              <th className="flex col-span-3 space-x-1 items-center px-1 overflow-hidden text-ellipsis whitespace-nowrap">
                Name
              </th>
              <th className="hidden md:flex space-x-1 items-center justify-between px-3 border-r border-slate-400 dark:border-slate-700 overflow-hidden text-ellipsis whitespace-nowrap">
                <span>Open</span>
                <label htmlFor="open">
                  <input
                    type="checkbox"
                    name="open"
                    id="open"
                    className="hidden"
                    onChange={(e) =>
                      e.target.checked
                        ? setSort(["open", 1])
                        : setSort(["open", 2])
                    }
                  />
                  <HiOutlineSwitchVertical
                    className={`text-sm cursor-pointer hover:opacity-80 ${
                      sortBy[0] === "open" && "text-blue-600"
                    }`}
                  />
                </label>
              </th>
              <th className="hidden md:flex space-x-1 items-center justify-between px-3 border-r border-slate-400 dark:border-slate-700 overflow-hidden text-ellipsis whitespace-nowrap">
                <span>Reopened</span>
                <label htmlFor="reopened">
                  <input
                    type="checkbox"
                    name="reopened"
                    id="reopened"
                    className="hidden"
                    onChange={(e) =>
                      e.target.checked
                        ? setSort(["reopened", 1])
                        : setSort(["reopened", 2])
                    }
                  />
                  <HiOutlineSwitchVertical
                    className={`text-sm cursor-pointer hover:opacity-80 ${
                      sortBy[0] === "reopened" && "text-blue-600"
                    }`}
                  />
                </label>
              </th>
              <th className="hidden md:flex space-x-1 items-center justify-between px-3 border-r border-slate-400 dark:border-slate-700 overflow-hidden text-ellipsis whitespace-nowrap">
                <span>Solved</span>
                <label htmlFor="solved">
                  <input
                    type="checkbox"
                    name="solved"
                    id="solved"
                    className="hidden"
                    onChange={(e) =>
                      e.target.checked
                        ? setSort(["solved", 1])
                        : setSort(["solved", 2])
                    }
                  />
                  <HiOutlineSwitchVertical
                    className={`text-sm cursor-pointer hover:opacity-80 ${
                      sortBy[0] === "solved" && "text-blue-600"
                    }`}
                  />
                </label>
              </th>
              <th className="flex space-x-1 items-center justify-between px-3 overflow-hidden text-ellipsis whitespace-nowrap">
                <span>Total</span>
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
          <tbody className="w-full pt-1 capitalize text-xs font-medium dark:text-slate-400 text-slate-600 overflow-hidden overflow-y-scroll px-1">
            {rows}
          </tbody>
        </table>
      </section>
    </div>
  );
};

export default Tables;
