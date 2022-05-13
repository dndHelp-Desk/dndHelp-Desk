import React, { FC, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  updateEmailAccount,
  newEmailAccount,
  deleteEmailAccount,
} from "../../Data_Fetching/TicketsnUserData";
import { updateAlert } from "../../../Redux/Slices/NotificationsSlice";
import {
  BsFillPersonFill,
  BsFillEnvelopeFill,
  BsFillLockFill,
  BsFillPlugFill,
  BsServer,
} from "react-icons/bs";
import { AppDispatch, RootState } from "../../../Redux/store";

const EmailAccounts: FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const email_accounts = useSelector(
    (state: RootState) => state.Tickets.email_accounts
  );
  const alerts = useSelector(
    (state: RootState) => state.NotificationsData.alerts
  );
  const [editable, setEditable] = useState<string | any>("");
  const [updatedValues, setValues] = useState<any>({
    email: "",
    password: "",
    host: "",
    port: 0,
  });

  //New Account Values
  const [newAccountValue, setValue] = useState<any>({
    name: "",
    email: "",
    password: "",
    host: "",
    port: "",
  });

  //Add new Account  =======================
  const handleNewContact = (e: React.SyntheticEvent) => {
    e.preventDefault();
    newEmailAccount(
      newAccountValue.name,
      newAccountValue.email,
      newAccountValue.password,
      newAccountValue.host,
      newAccountValue.port
    );
    dispatch(
      updateAlert([
        ...alerts,
        {
          message: "New Account Added Successfully",
          color: "bg-green-200",
        },
      ])
    );
    setValue({
      name: "",
      email: "",
      password: "",
      host: "serv24.registerdomain.com",
      port: 465,
    });
  };

  //Componet  =======================
  return (
    <section className="w-full h-full py-2 grid grid-cols-1 lg:grid-cols-2 gap-6 overflow-hidden">
      {/**New Account ============================================ */}
      <div className="col-span-1 p-6 h-full flex flex-col min-h-[45rem] overflow-hidden bg-white dark:bg-slate-800 ">
        <form
          action=""
          onSubmit={(e) => handleNewContact(e)}
          className="space-y-6 flex-[1] w-full flex flex-col items-center mt-2 dark:autofill:bg-slate-900"
        >
          <h1 className="text-base text-center dark:text-slate-400 text-slate-800 uppercase font-bold font-sans">
            New SMPT Account
          </h1>
          <div className="h-11 w-full min-w-[15rem] rounded-xl dark:bg-slate-900 bg-slate-100 relative">
            <input
              type="text"
              name="name"
              id="name"
              autoComplete="nope"
              placeholder="Name ..."
              onChange={(e) =>
                setValue({ ...newAccountValue, name: e.target.value })
              }
              value={newAccountValue.name}
              className="bg-transparent w-full h-full rounded dark:border-slate-700 border-slate-400 outline-none focus:outline-none text-sm px-4 pl-11 focus:ring-blue-700 placeholder:text-slate-500 text-slate-500 dark:bg-slate-800 bg-slate-200"
            />
            <BsFillPersonFill className="absolute text-slate-500 text-lg top-3 left-4" />
          </div>
          <div className="h-11 w-full min-w-[15rem] rounded-xl dark:bg-slate-900 bg-slate-100 relative">
            <input
              type="email"
              name="email"
              id="email"
              autoComplete="nope"
              placeholder="Valid Email ..."
              onChange={(e) =>
                setValue({ ...newAccountValue, email: e.target.value })
              }
              value={newAccountValue.email}
              className="bg-transparent w-full h-full rounded dark:border-slate-700 border-slate-400 outline-none focus:outline-none text-sm px-4 pl-11 focus:ring-blue-700 text-slate-500 placeholder:text-slate-500 dark:bg-slate-800 bg-slate-200"
            />
            <BsFillEnvelopeFill className="absolute text-slate-500 top-4 text-sm left-4" />
          </div>
          <div className="h-11 w-full min-w-[15rem] rounded-xl dark:bg-slate-900 bg-slate-100 relative">
            <input
              type="text"
              name="host"
              id="host"
              autoComplete="nope"
              placeholder="Host ..."
              onChange={(e) =>
                setValue({ ...newAccountValue, host: e.target.value })
              }
              value={newAccountValue.host}
              className="bg-transparent w-full h-full rounded dark:border-slate-700 border-slate-400 outline-none focus:outline-none text-sm px-4 pl-11 focus:ring-blue-700 placeholder:text-slate-500 text-slate-500 dark:bg-slate-800 bg-slate-200"
            />
            <BsServer className="absolute text-slate-500 text-lg top-3 left-4" />
          </div>
          <div className="h-11 w-full min-w-[15rem] rounded-xl dark:bg-slate-900 bg-slate-100 relative">
            <input
              type="number"
              name="port"
              id="port"
              autoComplete="nope"
              placeholder="Port ..."
              onChange={(e) =>
                setValue({ ...newAccountValue, port: e.target.value })
              }
              value={newAccountValue.port}
              className="bg-transparent w-full h-full rounded dark:border-slate-700 border-slate-400 outline-none focus:outline-none text-sm px-4 pl-11 focus:ring-blue-700 placeholder:text-slate-500 text-slate-500 dark:bg-slate-800 bg-slate-200"
            />
            <BsFillPlugFill className="absolute text-slate-500 text-lg top-3 left-4" />
          </div>
          <div className="h-11 w-full min-w-[15rem] rounded-xl dark:bg-slate-900 bg-slate-100 relative">
            <input
              type="password"
              name="password"
              id="password"
              autoComplete="nope"
              placeholder="Password "
              onChange={(e) =>
                setValue({ ...newAccountValue, password: e.target.value })
              }
              value={newAccountValue.password}
              className="bg-transparent w-full h-full rounded border dark:border-slate-700 border-slate-400 outline-none focus:outline-none text-sm px-4 pl-11 focus:ring-blue-700 placeholder:text-slate-500 text-slate-500 dark:bg-slate-800 bg-slate-200"
            />
            <BsFillLockFill className="absolute text-slate-500 top-[0.85rem] text-base left-4" />
          </div>
          <button
            type="submit"
            className="bg-blue-700 min-w-[8rem] h-8 px-4 rounded flex justify-center items-center text-slate-100  text-sm font-base tracking-wide focus:outline-none outline-none  focus:ring dark:focus:ring-slate-600 focus:ring-slate-400 hover:bg-blue-800 duration-300 transition-bg font-semibold uppercase"
          >
            Add Account
          </button>
        </form>

        {/**Guide ======================================== */}
        <div className="flex-[1] mt-4 py-4 text-slate-800 dark:text-slate-400 text-sm border-t border-slate-300 dark:border-slate-600">
          <h3 className="text-base text-center dark:text-slate-400 text-slate-800 uppercase font-bold font-sans mb-4">
            Need Help ?
          </h3>
          <details className="open:bg-white dark:open:bg-slate-800 open:border-b open:border-slate-200 dark:open:border-slate-700 p-2">
            <summary className="text-sm leading-6 text-slate-800 dark:text-slate-300 font-semibold select-none">
              What is a Name ?
            </summary>
            <div className="mt-1 text-sm leading-6 text-slate-600 dark:text-slate-400">
              <p>
                The name of your sending account will help your clients
                /customers know which department is contacting them. Also help
                helpful for you teams if you want to organise your tickets based
                on nature.
              </p>
            </div>
          </details>
          <details className="open:bg-white dark:open:bg-slate-800 open:border-b open:border-slate-200 dark:open:border-slate-700 p-2">
            <summary className="text-sm leading-6 text-slate-800 dark:text-slate-300 font-semibold select-none">
              What is a valid email ?
            </summary>
            <div className="mt-1 text-sm leading-6 text-slate-600 dark:text-slate-400">
              <p>This is an email address you wish to add fr sending emails.</p>
            </div>
          </details>
          <details className="open:bg-white dark:open:bg-slate-800 open:border-b open:border-slate-200 dark:open:border-slate-700 p-2">
            <summary className="text-sm leading-6 text-slate-800 dark:text-slate-300 font-semibold select-none">
              Where do I find the host ?
            </summary>
            <div className="mt-1 text-sm leading-6 text-slate-600 dark:text-slate-400">
              <p>
                If you not sure of what your host is, head over to this link:{" "}
                <a
                  href="https://mxtoolbox.com/"
                  rel="noreferrer"
                  className="italic text-blue-700"
                >
                  {" "}
                  MXTool
                </a>{" "}
                then insert your email on the search bar. Below you will see a
                table with "Hostname" column then copy the url below.
              </p>
            </div>
          </details>
          <details className="open:bg-white dark:open:bg-slate-800 open:border-b open:border-slate-200 dark:open:border-slate-700 p-2">
            <summary className="text-sm leading-6 text-slate-800 dark:text-slate-300 font-semibold select-none">
              What is my port ?
            </summary>
            <div className="mt-1 text-sm leading-6 text-slate-600 dark:text-slate-400">
              <p>
                The various options for incoming and outgoing email servers, as
                well as secure encryption all require the user to set up various
                "ports" in the email clients being used. So what exactly is a
                "port"? In a typical TCP connection, a server (email server) has
                an IP address and runs programs that host services, which allow
                for clients to connect and run some task, such as checking
                email. Since one server can run multiple network services (Web,
                email, file sharing, and so on), it needs a way to distinguish
                the network traffic for these services even though they all
                connect with the same IP address, and ports are the way to do
                this. The basics for how it works is a standard TCP packet is
                tagged by the sending computer (your desktop) with a port
                number, and the server receives that port number and sends the
                tagged data to the service it is running that is responsible for
                handling it. As such, the same computer can host a Web site
                (port 80) and an IMAP email server (ports 143 and 993), at the
                same time without any traffic interference. Normal 587 or 465
                should work fine. Please contact support for more.
              </p>
            </div>
          </details>
        </div>
      </div>

      {/**Accounts List ======================================= */}
      <div className="col-span-1 h-full min-h-[45rem] overflow-hidden overflow-y-scroll px-4 space-y-4">
        {email_accounts.length >= 1 &&
          email_accounts.map((account) => {
            return (
              <form
                key={account.id}
                onSubmit={(e) => {
                  e.preventDefault();
                  updateEmailAccount(
                    account.id,
                    updatedValues.email,
                    updatedValues.password,
                    updatedValues.host,
                    updatedValues.port
                  );
                  setEditable("");
                  dispatch(
                    updateAlert([
                      ...alerts,
                      {
                        message: "Account Updated Successfully",
                        color: "bg-green-200",
                      },
                    ])
                  );
                }}
                className=""
              >
                <fieldset className="border dark:border-slate-700 border-slate-300 rounded p-2 px-4 flex flex-col space-y-2 dark:bg-slate-800 bg-white">
                  {" "}
                  <legend className="px-2 bg-slate-200 dark:bg-slate-900 rounded text-slate-900 dark:text-slate-300 font-semibold uppercase text-sm">
                    {account.name}
                  </legend>
                  <label
                    htmlFor={`${account.id}email1`}
                    className="text-sm text-slate-600 dark:text-slate-400"
                  >
                    <span className="text-slate-800 dark:text-slate-300 font-semibold">
                      Account Email
                    </span>
                    <input
                      type="email"
                      name={`${account.id}email1`}
                      id={`${account.id}email1`}
                      readOnly={editable === account.id ? false : true}
                      value={
                        editable === account.id
                          ? updatedValues.email
                          : account.email
                      }
                      onChange={(e) =>
                        setValues({ ...updatedValues, email: e.target.value })
                      }
                      className="h-10 w-full bg-transparent outline-none focus:outline-none focus:ring-0 border-0 border-b border-slate-300 dark:border-slate-700"
                    />
                  </label>
                  <label
                    htmlFor={`${account.id}host1`}
                    className="text-sm text-slate-600 dark:text-slate-400"
                  >
                    <span className="text-slate-800 dark:text-slate-300 font-semibold">
                      Account Host
                    </span>
                    <input
                      type="text"
                      name={`${account.id}host1`}
                      id={`${account.id}host1`}
                      readOnly={editable === account.id ? false : true}
                      value={
                        editable === account.id
                          ? updatedValues.host
                          : account.host
                      }
                      onChange={(e) =>
                        setValues({ ...updatedValues, host: e.target.value })
                      }
                      className="h-10 w-full bg-transparent outline-none focus:outline-none focus:ring-0 border-0 border-b border-slate-300 dark:border-slate-700"
                    />
                  </label>
                  <label
                    htmlFor={`${account.id}port1`}
                    className="text-sm text-slate-600 dark:text-slate-400"
                  >
                    <span className="text-slate-800 dark:text-slate-300 font-semibold">
                      Account Port
                    </span>
                    <input
                      type="number"
                      name={`${account.id}port1`}
                      id={`${account.id}port1`}
                      readOnly={editable === account.id ? false : true}
                      value={
                        editable === account.id
                          ? updatedValues.port
                          : account.port
                      }
                      onChange={(e) =>
                        setValues({ ...updatedValues, port: e.target.value })
                      }
                      className="h-10 w-full bg-transparent outline-none focus:outline-none focus:ring-0 border-0 border-b border-slate-300 dark:border-slate-700"
                    />
                  </label>
                  <label
                    htmlFor={`${account.id}password"`}
                    className="text-sm text-slate-600 dark:text-slate-400"
                  >
                    <span className="text-slate-800 dark:text-slate-300 font-semibold">
                      Account Password
                    </span>
                    <input
                      type="password"
                      name={`${account.id}password"`}
                      id={`${account.id}password"`}
                      readOnly={editable === account.id ? false : true}
                      value={
                        editable === account.id
                          ? updatedValues.password
                          : account.password
                      }
                      onChange={(e) =>
                        setValues({
                          ...updatedValues,
                          password: e.target.value,
                        })
                      }
                      className="h-10 w-full bg-transparent outline-none focus:outline-none focus:ring-0 border-0 border-b border-slate-300 dark:border-slate-700"
                    />
                  </label>
                  <div className="flex justify-center items-center py-2">
                    <button
                      type="button"
                      onClick={() => {
                        setValues({
                          email: account.email,
                          password: account.password,
                          host: account.host,
                          port: account.port,
                        });
                        setEditable(account.id);
                      }}
                      className="h-8 w-20 px-4 outline-none focus:outline-none hover:opacity-80 transition-all rounded-l bg-slate-700 text-slate-100 border-r border-slate-400 font-bold tracking-wider text-xs uppercase"
                    >
                      Edit
                    </button>
                    <button
                      type="submit"
                      className="h-8 w-20 px-4 outline-none focus:outline-none hover:opacity-80 transition-all bg-slate-700 text-slate-100 font-bold tracking-wider text-xs uppercase"
                    >
                      Save
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        deleteEmailAccount(account.id);
                        dispatch(
                          updateAlert([
                            ...alerts,
                            {
                              message: "Account Deleted Successfully",
                              color: "bg-green-200",
                            },
                          ])
                        );
                      }}
                      className="h-8 w-20 px-4 outline-none focus:outline-none hover:opacity-80 transition-all rounded-r bg-red-700 text-slate-100 border-l border-slate-400 font-bold tracking-wider text-xs uppercase"
                    >
                      Delete
                    </button>
                  </div>
                </fieldset>
              </form>
            );
          })}
      </div>
    </section>
  );
};

export default EmailAccounts;
