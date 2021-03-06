import React, { FC, useMemo, useState, useEffect } from "react";
import { RichTextEditor } from "@mantine/rte";
import { toUpper } from "../../Reusable Functions/Reusable_Func";
import { useSelector, useDispatch } from "react-redux";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { addTicket } from "../../Adapters/Data_Fetching/TicketsnUserData";
import { updateAlert } from "../../Redux/Slices/NotificationsSlice";
import { addRecording } from "../Auth/Firebase";
import {
  BiTrash,
  BiChevronDown,
  BiCollection,
  BiMinus,
  BiMicrophone,
  BiUser,
  BiX,
} from "react-icons/bi";
import { AppDispatch, RootState } from "../../Redux/store";
import CannedResponses from "./Macros/CannedResponses";
import HintTooltip from "../../Components/HintTooltip";

interface Props {
  newTicketModal: any;
  setModal: any;
  inputValue: any;
  setValues: any;
}

const NewTicket: FC<Props> = ({
  newTicketModal,
  setModal,
  inputValue,
  setValues,
}) => {
  const contacts = useSelector((state: RootState) => state.Tickets.contacts);
  const allTickets = useSelector(
    (state: RootState) => state.Tickets.allTickets
  );
  const email_accounts = useSelector(
    (state: RootState) => state.Tickets.email_accounts
  );
  const company_details = useSelector(
    (state: RootState) => state.Tickets.company_details
  );
  const categories = useSelector(
    (state: RootState) => state.Tickets.categories
  );
  const member_details = useSelector(
    (state: RootState) => state.UserInfo.member_details
  );
  const alerts = useSelector(
    (state: RootState) => state.NotificationsData.alerts
  );
  const [recipientClicked, setResClicked] = useState<boolean>(false);
  const [recepient, setRecipient] = useState<string | any>("");
  const [searchResults, setResults] = useState<boolean | any>(false);
  const [isSubmiting, setSubmit] = useState<boolean | any>(false);
  const [uploadingStatus, setUploadStatus] = useState<boolean>(false);
  const [showOpenedTickets, setShowOpen] = useState<boolean | any>(true);
  const [recordingFile, setFile] = useState<boolean | any>(false);
  const dispatch: AppDispatch = useDispatch();

  //Message Input Values =========================
  const [value, onChange] = useState<string | any>(inputValue?.message);

  //Check If Ticket Exists ||Customer's history using their numbers ===================
  const numbersArray = useMemo(() => {
    return allTickets?.length >= 1 && inputValue?.complainant_number !== ""
      ? allTickets.filter(
          (ticket) =>
            ticket.message_position === 1 &&
            ticket.complainant_number?.includes(
              inputValue?.complainant_number
            ) === true &&
            inputValue?.complainant_number.split("").length >= 9
        )
      : [];
  }, [allTickets, inputValue?.complainant_number]);
  const exist =
    numbersArray?.length >= 1 &&
    numbersArray.map((data, index) => {
      return (
        <li
          key={index}
          className={`text-white text-xs dark:text-slate-300 italic cursor-pointer whitespace-nowrap overflow-hidden overflow-ellipsis p-3 capitalize leading-5 space-y-1 tracking-tight`}
        >
          <div className="flex justify-between border-b border-slate-400 dark:border-slate-800 overflow-hidden overflow-ellipsis whitespace-nowrap">
            <p className="whitespace-nowrap w-1/2 overflow-hidden overflow-ellipsis">
              {data.branch_company}
            </p>{" "}
            <p className="whitespace-nowrap w-1/2 overflow-hidden overflow-ellipsis">
              {data.ticket_id}
            </p>
          </div>
          <div className="flex justify-between border-b border-slate-400 dark:border-slate-800 overflow-hidden overflow-ellipsis whitespace-nowrap">
            <p className="whitespace-nowrap w-1/2 overflow-hidden overflow-ellipsis">
              Date{" "}
            </p>
            <p className="whitespace-nowrap w-1/2 overflow-hidden overflow-ellipsis">
              {new Date(data.date).toLocaleString()}
            </p>
          </div>
          <div className="flex justify-between border-b border-slate-400 dark:border-slate-800 overflow-hidden overflow-ellipsis whitespace-nowrap">
            <p className="whitespace-nowrap w-1/2 overflow-hidden overflow-ellipsis">
              Agent Name
            </p>{" "}
            <p className="whitespace-nowrap w-1/2 overflow-hidden overflow-ellipsis">
              {data.agent_name}
            </p>
          </div>
          <div className="flex justify-between border-b border-slate-400 dark:border-slate-800 overflow-hidden overflow-ellipsis whitespace-nowrap">
            <p className="whitespace-nowrap w-1/2 overflow-hidden overflow-ellipsis">
              Status
            </p>{" "}
            <p className="whitespace-nowrap w-1/2 overflow-hidden overflow-ellipsis">
              {data.status}
            </p>
          </div>
        </li>
      );
    });

  //Reciepents or contacts list suggetions =================================
  const contactsList =
    contacts?.length >= 1 &&
    contacts.map((contact, index) => {
      let clientName = contact.name;
      let clientEmail = contact.email;
      let brand = contact.branch_company;
      return (
        <li
          key={index}
          onClick={() => {
            setResClicked(true);
            setValues({
              ...inputValue,
              recipient_name: clientName,
              recipient_email: clientEmail,
              branch_company: brand,
            });
            setRecipient(brand);
            setResults(false);
          }}
          className={`${
            contact.branch_company
              ?.toLowerCase()
              ?.replace(/\s/g, "")
              .includes(recepient.toLowerCase()?.replace(/\s/g, "")) === true
              ? ""
              : "hidden"
          } text-xs dark:text-slate-300 text-slate-800 font-sans font-semibold dark:font-medium cursor-pointer whitespace-nowrap overflow-hidden overflow-ellipsis p-1.5 dark:hover:bg-slate-700 hover:bg-slate-200 capitalize flex items-center space-x-1 transition-all duration-150 rounded px-2`}
        >
          <div className="w-5">
            <BiUser className="text-base" />
          </div>
          <div className="w-[calc(100%-3rem)]">
            <span className="white-space-nowrap w-full overflow-hidden overflow-ellipsis pr-2">
              {contact.branch_company}
            </span>
          </div>
        </li>
      );
    });

  const categoriesList =
    categories &&
    categories?.map((category, index) => {
      return (
        <option
          className="capitalize hover:opacity-80 dark:text-slate-400 text-slate-700"
          value={category?.name}
          key={index}
        >
          {category?.name}
        </option>
      );
    });

  useEffect(() => {
    setValues((previous: any) => ({ ...previous, message: value }));
  }, [setValues, value]);

  //Upload Files ================================
  const handleImageUpload = (file: File): Promise<string> =>
    new Promise((resolve, reject) => {
      setUploadStatus(true);
      //Upload File if there is one
      const storage = getStorage();
      uploadBytes(
        ref(
          storage,
          `/${company_details.name}/${
            inputValue?.recipient_name
          }+${new Date().getTime()}`
        ),
        file
      )
        .then((snapshot) => {
          return getDownloadURL(snapshot.ref);
        })
        .then((downloadURL) => {
          resolve(downloadURL);
          setUploadStatus(false);
        })
        .catch(() => {
          reject(new Error("Upload failed"));
          setUploadStatus(false);
        });
    });

  //Submit New Ticket ===============
  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    setSubmit(true);

    if (uploadingStatus) {
      dispatch(
        updateAlert([
          ...alerts,
          {
            message: "Still Uploading Image Please wait",
            color: "bg-yellow-200",
            id: new Date().getTime(),
          },
        ])
      );
      setSubmit(false);
    } else if (!uploadingStatus) {
      //Sending Account =============================
      let sendingAccount = email_accounts.filter(
        (account) =>
          account.name.toLowerCase() === inputValue?.send_as.toLowerCase()
      )[0];

      //New Tickets Function ============
      const openTicket = (id: any) => {
        //Send SMS ===========================================
        /*var xhr = new XMLHttpRequest(),
      body = JSON.stringify({
        messages: [
          {
            channel: "whatsapp",
            to: "27732341215",
            content: `${inputValue?.message}`,
          },
          {
            channel: "sms",
            to: "27732341215",
            content: `${inputValue?.message}`,
          },
        ],
      });
    xhr.open("POST", "https://platform.clickatell.com/v1/message", true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.setRequestHeader("Authorization", "KuUgDS0pSiOYrnltdo0opA==");
    xhr.onreadystatechange = function () {
      if (xhr.readyState == 4 && xhr.status == 200) {
        console.log("success");
      }
    };
    xhr.send(body);*/

        // Upload Recordings
        recordingFile &&
          addRecording(recordingFile, `/${company_details.name}/${id}`);

        let dueDate = `${new Date(inputValue?.date).toLocaleString()}`;
        let openDate = `${new Date().toLocaleString()}`;

        //Send Mail and Open Ticket If values are not empty
        /*if (!recordingFile && inputValue?.state === "solved") {
      dispatch(
        updateAlert([
          ...alerts,
          {
            message: "Please Upload The Recording To Proceed",
            color: "bg-yellow-200",
          },
        ])
      );
    } */

        //Open New Ticket ========================
        addTicket(
          inputValue?.recipient_name,
          inputValue?.recipient_email,
          inputValue?.agent,
          inputValue?.priority,
          inputValue?.category,
          inputValue?.branch_company,
          inputValue?.message,
          inputValue?.state,
          inputValue?.date,
          id,
          inputValue?.agent_email,
          inputValue?.complainant_name,
          inputValue?.complainant_email === "" ||
            inputValue?.complainant_email === undefined ||
            inputValue?.complainant_email?.length < 4
            ? "none"
            : inputValue?.complainant_email,
          inputValue?.complainant_number,
          inputValue?.send_as,
          `${recordingFile && inputValue?.state === "solved" ? true : false}`
        );
        setSubmit(false);
        setShowOpen(true);
        //Send Email Using Nodemailer ===================
        fetch("https://dndhelp-desk-first.herokuapp.com/send", {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify({
            from: `${sendingAccount.email}`,
            company: `${company_details.name} ${sendingAccount.name}`,
            password: sendingAccount.password,
            host: sendingAccount.host,
            port: sendingAccount.port,
            email: inputValue?.recipient_email?.replace(/[/]/gi, ","),
            subject: `${toUpper(inputValue?.category)} || Ticket-ID: ${id}`,
            ticket_id: id,
            email_body:
              inputValue?.state !== "solved"
                ? `<p style="color:#0c0c30;font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont , monospace; ;font-size:15px">
        Hi ${inputValue?.recipient_name},
      </p>
      <h1 style="color:#0c0c30;font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont , monospace;font-size:15px">
        <b>${company_details?.name} has opened a new ticket regarding ${
                    inputValue?.category
                  }. The case details are as follows:</b>
      </h1>
      <p style="color:#0c0c30;font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont,monospace ;line-height:20px;font-size:16px;text-decoration: underline;">
        <b>Tickect Details:</b>
      </p>
      <ul style="color:#0c0c30;font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont , monospace;line-height:25px">
        <li><b>Brand:</b> ${inputValue?.branch_company} </li>
        <li><b>Tickect-ID:</b> ${id} </li>
        <li><b>Due Date:</b> ${dueDate} </li>
        <li><b>Case Origin:</b> dndHelp-Desk </li>
        <li><b>Priority:</b> ${inputValue?.priority} </li>
        <li><b>Opened By:</b> ${inputValue?.agent} </li>
        </ul>
      <p style="color:#0c0c30;font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont,monospace ;line-height:20px;font-size:16px;text-decoration: underline;">
        <b>Customer's Details:</b>
      </p>
      <ul style="color:#0c0c30;font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont , monospace;">
        <li><b>Full Name:</b> ${inputValue?.complainant_name}</li>
        <li><b>Email Address:</b> ${
          inputValue?.complainant_email?.length <= 3
            ? "none"
            : inputValue?.complainant_email
        } </li>
        <li><b>Phone Number:</b> ${inputValue?.complainant_number}</li>
        </ul>
      <p style="color:#0c0c30;font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont,monospace ;line-height:20px;font-size:16px;text-decoration: underline;">
        <b>Case Detail:</b>
      </p>
      <p style="color:#0c0c30;font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont,monospace ;line-height:20px;font-size:15px;white-space:normal;overflow:hidden">
        ${inputValue?.message}
      </p>
      <p style="color:#0c0c30;font-family:Arial, Helvetica, sans-serif;line-height:20px;font-size:14px">
        <i>In order to update or respond to this issue please click the button below,</i>
      </p>
  <p style="color:blue;font-family:Arial, Helvetica, sans-serif;line-height:20px;font-size:14px">
       <i> <a target="_blank" href=${`https://www.dndhelp-desk.co.za/logIn`}>You can alternatively click here.</a></i>
      </p>
      <button style="background:#e46823;padding-left:10px;padding-right:10px;padding:15px;border-radius:5px;border-width: 0px;outline-width: 0px;box-shadow: 0px 1px 0px rgba(0, 0, 0.68, 0.2);cursor: pointer;"><a style="text-decoration:none;color:#fff;font-weight: 700" target="_blank" href=${`https://www.dndhelp-desk.co.za/logIn`}>Update or Respond Here</a></button>
<p style="color:#6b7280;font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont,monospace ;line-height:20px;font-size:16px;">
        <b>Disclaimer</b>
      </p>
  <p style="color:#6b7280;font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont,monospace ;line-height:20px;font-size:15px;white-space:normal;overflow:hidden">
        The information contained in this communication from the sender is confidential. It is intended solely for use by the recipient and others authorized to receive it. If you are not the recipient, you are hereby notified that any disclosure, copying, distribution or taking action in relation of the contents of this information is strictly prohibited and may be unlawful. 
      </p>`
                : `<p
    style="color:#0c0c30;font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont , monospace; ;font-size:15px">
     Hi ${inputValue?.recipient_name},
  </p>
  <h1
    style="color:#0c0c30;font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont , monospace; ;font-size:15px">
    <b>${
      company_details?.name
    } has opened a new ticket with ID: ${id} which has been Resolved. If you feel unsatisfied by the solution please don't hesitate to cantact us thruogh the links provided below, don't foget to grab your ticket-id.</b>
  </h1>
  <p
    style="color:#0c0c30;font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont,monospace ;line-height:20px;font-size:16px;text-decoration: underline;">
    <b>Tickect Details:</b>
  </p>
  <ul
    style="color:#0c0c30;font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont , monospace;line-height:25px">
    <li><b>Brand:</b>
      ${inputValue?.branch_company}
    </li>
    <li><b>Tickect-ID:</b>
      ${id}
    </li>
    <li><b>Closed On:</b>
      ${openDate}
    </li>
    <li><b>Status:</b>
      Resolved
    </li>
  </ul>
  <p style="color:#0c0c30;font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont,monospace ;line-height:20px;font-size:16px;text-decoration: underline;">
        <b>Customer's Details:</b>
      </p>
      <ul style="color:#0c0c30;font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont , monospace;">
        <li><b>Full Name:</b> ${inputValue?.complainant_name}</li>
        <li><b>Email Address:</b> ${
          inputValue?.complainant_email?.length <= 3
            ? "none"
            : inputValue?.complainant_email
        } </li>
        <li><b>Phone Number:</b> ${inputValue?.complainant_number}</li>
        </ul>
  <p
    style="color:#0c0c30;font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont,monospace ;line-height:20px;font-size:16px;text-decoration: underline;">
    <b>Resolution:</b>
  </p>
  <p
    style="color:#0c0c30;font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont,monospace ;line-height:20px;font-size:15px;white-space:normal;overflow:hidden">
    ${inputValue?.message}
  </p>
  <p style="color:#0c0c30;font-family:Arial, Helvetica, sans-serif;line-height:20px;font-size:14px">
    <i>In order to update or respond to this issue please click the button below,</i>
  </p>
  <p style="color:blue;font-family:Arial, Helvetica, sans-serif;line-height:20px;font-size:14px">
    <i> <a target="_blank" href=${`https://www.dndhelp-desk.co.za/logIn`}>You can alternatively click here.</a></i>
  </p>
  <button style="background:#e46823;padding-left:10px;padding-right:10px;padding:15px;border-radius:5px;border-width: 0px;outline-width: 0px;box-shadow: 0px 1px 0px rgba(0, 0, 0.68, 0.2);cursor: pointer;"><a style="text-decoration:none;color:#fff;font-weight: 700" target="_blank" href=${`https://www.dndhelp-desk.co.za/logIn`}>Update or Respond Here</a></button>
  <p
    style="color:#6b7280;font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont,monospace ;line-height:20px;font-size:16px;">
    <b>Disclaimer</b>
  </p>
  <p
    style="color:#6b7280;font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont,monospace ;line-height:20px;font-size:15px;white-space:normal;overflow:hidden">
    The information contained in this communication from the sender is confidential. It is intended solely for use by
    the recipient and others authorized to receive it. If you are not the recipient, you are hereby notified that any
    disclosure, copying, distribution or taking action in relation of the contents of this information is strictly
    prohibited and may be unlawful.
  </p>`,
          }),
        })
          .then((res) => res.json())
          .then((data) => {
            const resData = data;
            if (resData.status === "success") {
              dispatch(
                updateAlert([
                  ...alerts,
                  {
                    message: "Email sent Successfully",
                    color: "bg-green-200",
                    id: new Date().getTime(),
                  },
                ])
              );
            } else if (resData.status === "fail") {
              setSubmit(false);
              dispatch(
                updateAlert([
                  ...alerts,
                  {
                    message: "Email Failed To Send",
                    color: "bg-red-200",
                    id: new Date().getTime(),
                  },
                ])
              );
            }
          })
          .catch((error) => {
            dispatch(
              updateAlert([
                ...alerts,
                {
                  message: error,
                  color: "bg-red-200",
                  id: new Date().getTime(),
                },
              ])
            );
            setSubmit(false);
            setShowOpen(true);
          });
        setSubmit(false);
        setShowOpen(true);
        setValues({
          recipient_name: "",
          recipient_email: "",
          agent: "",
          priority: "",
          category: "",
          branch_company: "",
          message: "",
          state: "",
          date: "",
          agent_email: "",
          complainant_name: "",
          complainant_email: "none",
          complainant_number: "",
          send_as: "",
        });
        setFile("");
        setRecipient("");
        onChange("<p></p>");
        setShowOpen(true);
        !isSubmiting && setModal(false);
        document.body.style.overflow = "";
        dispatch(
          updateAlert([
            ...alerts,
            {
              message: "New Ticket Created Successfully",
              color: "bg-green-200",
              id: new Date().getTime(),
            },
          ])
        );
      };

      //Generate unique Id =========================
      let generatedId = () => {
        let combined = `#${
          inputValue?.branch_company
            ?.replace(/[^\w\s]/gi, "X")
            ?.replace(/[0-9]/g, "X")
            ?.charAt(inputValue?.branch_company?.length - 1)
            ?.toUpperCase() +
          new Date().getFullYear().toString().slice(2, 4) +
          new Date().toISOString().slice(5, 7) +
          new Date().toISOString().slice(8, 10) +
          "-" +
          new Date().getMilliseconds()?.toString()?.charAt(0) +
          new Date().toISOString().slice(11, 13) +
          new Date().toISOString().slice(14, 16) +
          new Date().toISOString().slice(17, 19)
        }`;
        return combined;
      };

      const sendNow = () => {
        openTicket(generatedId()?.replace(/\s/g, ""));
        setFile("");
        setRecipient("");
        onChange("<p></p>");
        setShowOpen(true);
        !isSubmiting && setModal(false);
        document.body.style.overflow = "";
      };

      //Alert if Due Date is Empty ============
      if (recipientClicked && inputValue?.recipient_email?.length >= 4) {
        if (
          new Date(inputValue?.date).toString() !== "Invalid Date" &&
          sendingAccount !== undefined &&
          inputValue?.branch_company !== "" &&
          member_details[0]?.id !== false
        ) {
          setTimeout(() => {
            sendNow();
          }, 500);
        } else if (new Date(inputValue?.date).toString() === "Invalid Date") {
          dispatch(
            updateAlert([
              ...alerts,
              {
                message: "Add The Due Date to Proceed",
                color: "bg-yellow-200",
                id: new Date().getTime(),
              },
            ])
          );
          setSubmit(false);
        }
        setResClicked(false);
      } else if (
        !recipientClicked ||
        inputValue?.recipient_email?.length <= 3
      ) {
        dispatch(
          updateAlert([
            ...alerts,
            {
              message: "Please select a valid contact / recipient",
              color: "bg-yellow-200",
              id: new Date().getTime(),
            },
          ])
        );
        setSubmit(false);
      }
    }
  };

  //Component =====================================
  return (
    <div
      className={`fixed top-0 left-0 bottom-0 right-0 h-screen bg-[#030d274f] rounded-md justify-center overflow-x-hidden overflow-y-scroll no-scrollbar::-webkit-scrollbar no-scrollbar ${
        newTicketModal === true ? "flex z-[999]" : "hidden"
      }`}
    >
      <div className="w-full h-[50rem] flex justify-center px-6 pt-[1rem] pb-2 overflow-hidden overflow-y-scroll no-scrollbar::-webkit-scrollbar no-scrollbar tracking-wider">
        <form
          onSubmit={(e) => handleSubmit(e)}
          className={`w-[98%] lg:w-[58%] max-w-[40rem] min-h-[25rem] h-fit dark:bg-slate-800 bg-white border-2 border-slate-300 dark:border-slate-700 shadow drop-shadow rounded-md overflow-hidden  ${
            newTicketModal === true ? "flex" : "hidden"
          } flex-col justify-between space-y-1 relative`}
        >
          {/**Close Modal or Minimize and save window ============= */}
          <div className="absolute right-1 top-1 flex space-x-1 items-center z-[999]">
            {/**Minimize and save */}
            <abbr title="minimize and save">
              <button
                type="button"
                onClick={() => {
                  window.localStorage.setItem(
                    "newTicketDraftValues",
                    JSON.stringify(inputValue)
                  );
                  setModal(false);
                  setSubmit(false);
                  document.body.style.overflow = "";
                }}
                className="h-5 w-5 rounded-sm flex items-center justify-center dark:bg-slate-700  bg-slate-200  hover:opacity-80 transition-all outline-none focus:outline-none border border-slate-500 dark:border-slate-600"
              >
                <BiMinus className="dark:text-slate-300 text-slate-700 text-base" />
              </button>
            </abbr>
            {/**Close and Clear  */}
            <abbr title="Close">
              <button
                type="button"
                onClick={() => {
                  setResClicked(false);
                  window.localStorage.setItem(
                    "newTicketDraftValues",
                    JSON.stringify({
                      recipient_name: "",
                      recipient_email: "",
                      agent: "",
                      priority: "",
                      category: "",
                      branch_company: "",
                      message: "",
                      state: "",
                      date: "",
                      agent_email: "",
                      complainant_name: "",
                      complainant_email: "none",
                      complainant_number: "",
                      send_as: "",
                    })
                  );
                  setValues({
                    recipient_name: "",
                    recipient_email: "",
                    agent: "",
                    priority: "",
                    category: "",
                    branch_company: "",
                    message: "",
                    state: "",
                    date: "",
                    agent_email: "",
                    complainant_name: "",
                    complainant_email: "none",
                    complainant_number: "",
                    send_as: "",
                  });
                  onChange("");
                  setFile(false);
                  onChange("<p></p>");
                  setShowOpen(true);
                  setModal(false);
                  setSubmit(false);
                  !isSubmiting && setModal(false);
                  document.body.style.overflow = "";
                }}
                className="h-5 w-5 rounded-sm flex items-center justify-center dark:bg-slate-700  bg-slate-200 hover:bg-red-300 dark:hover:bg-red-500 transition-all outline-none focus:outline-none dark:text-slate-300 text-slate-700 text-sm border border-slate-500 dark:border-slate-600"
              >
                <span>&times;</span>
              </button>
            </abbr>
          </div>

          {/**Top Section ============================= */}
          <div className="w-full h-fit p-4">
            <div className="w-full h-fit flex flex-col space-y-2 mt-2">
              {/**Contact and Subject ============================================== */}
              <div className="w-full min-h-14 grid grid-cols-1 md:grid-cols-2 gap-4">
                <fieldset className="col-span-1 w-full h-12 border border-slate-400 dark:border-slate-700 rounded px-2 relative">
                  <legend className="px-2 bg-white dark:bg-slate-800 rounded text-slate-900 dark:text-slate-300 dark:font-medium font-semibold uppercase text-[0.65rem]">
                    To
                  </legend>
                  <div className="h-full w-full">
                    <label
                      htmlFor="to"
                      className="w-full h-full flex items-center justify-between dark:text-slate-300 text-slate-700 text-xs font-medium relative"
                    >
                      {/**Selected ========= */}
                      <div
                        className={`h-6 w-fit max-w-[12rem] mt-[-0.25rem] dark:bg-slate-700 bg-slate-200 border dark:border-slate-600 border-slate-300 dark:text-slate-300 text-slate-800 font-sans tracking-normal rounded-full ${
                          inputValue?.recipient_name?.length >= 1
                            ? "flex"
                            : "hidden"
                        } justify-center items-center space-x-1 overflow-hidden text-xs`}
                      >
                        <div className="flex items-center space-x-1 px-2 w-fit max-w-[calc(100%-1.6rem)]">
                          <BiUser className="text-base" />
                          <span className="w-full overflow-hidden whitespace-nowrap overflow-ellipsis">
                            {inputValue?.branch_company}
                          </span>
                        </div>
                        <button
                          type="button"
                          onClick={() => {
                            setResClicked(false);
                            setValues({
                              ...inputValue,
                              recipient_name: "",
                              recipient_email: "",
                              branch_company: "",
                            });
                            setRecipient("");
                            setResults(true);
                          }}
                          className="h-full w-7 flex justify-center items-center outline-none focus:outline-none border-l dark:border-slate-600 border-slate-300 font-semibold text-sm hover:text-red-600"
                        >
                          <BiX />
                        </button>
                      </div>
                      {/**Selected ========= */}
                      <input
                        type="search"
                        id="to"
                        name="to"
                        placeholder="Search Contact ..."
                        autoComplete="off"
                        value={recepient}
                        onKeyDown={() => setResults(true)}
                        onChange={(e) => {
                          setRecipient(e.target.value);
                        }}
                        className={`w-full h-full mt-[-0.5rem] overflow-hidden whitespace-nowrap text-ellipsis bg-transparent dark:text-slate-400 border-0 outline-none focus:outline-none dark:placeholder:text-slate-600 placeholder:text-slate-400 focus:ring-0 focus:border-0 text-xs font-medium ${
                          inputValue?.recipient_name?.length <= 1
                            ? ""
                            : "hidden"
                        }`}
                      />
                      {/***Serch Results List ====================== */}
                      <div
                        className={`${
                          searchResults ? "" : "hidden"
                        } absolute top-9 h-[11rem] w-full shadow-2xl drop-shadow-2xl dark:bg-slate-800 bg-white rounded-md z-[999] p-2 px-1 space-y-1 border dark:border-slate-700 border-slate-400`}
                      >
                        <ul className="h-full w-full overflow-y-scroll overflow-hidden px-1">
                          {contactsList}
                        </ul>
                      </div>{" "}
                    </label>
                  </div>
                </fieldset>
                <fieldset className="col-span-1 w-full h-12 border border-slate-400 dark:border-slate-700 rounded px-2">
                  <legend className="px-2 bg-white dark:bg-slate-800 rounded text-slate-900 dark:text-slate-300 dark:font-medium font-semibold uppercase text-[0.65rem]">
                    subject
                  </legend>
                  <label
                    htmlFor="subject"
                    className="w-full h-full flex items-center dark:text-slate-300 text-slate-700 text-xs font-medium relative"
                  >
                    <select
                      className={`w-full h-full overflow-hidden whitespace-nowrap text-ellipsis p-2 pt-1  dark:bg-slate-800 bg-white border-0 outline-none focus:outline-none focus:ring-0 focus:border-0 text-xs font-medium capitalize  ${
                        !inputValue?.category
                          ? "dark:text-slate-600 text-slate-400"
                          : "dark:text-slate-400 text-slate-700"
                      }`}
                      id="subject"
                      name="subject"
                      value={inputValue?.category}
                      required={true}
                      onChange={(e) =>
                        setValues({
                          ...inputValue,
                          category: e.target.value,
                          date: new Date(
                            new Date().getTime() +
                              Number(
                                categories?.filter(
                                  (data) => data?.name === e.target.value
                                )[0]?.turnaround_time
                              )
                          ).getTime(),
                        })
                      }
                    >
                      <option
                        className="capitalize dark:text-slate-400 text-slate-700"
                        value=""
                      >
                        Subject ...
                      </option>
                      {categoriesList}
                    </select>
                  </label>
                </fieldset>
              </div>
              {/**Contact and Subject ============================================== */}

              {/**Priority and Status =============================================== */}
              <div className="overflow-hidden w-full min-h-14 grid grid-cols-1 md:grid-cols-2 gap-4">
                <fieldset className="col-span-1 w-full h-12 border border-slate-400 dark:border-slate-700 rounded px-2">
                  <legend className="px-2 bg-white dark:bg-slate-800 rounded text-slate-900 dark:text-slate-300 dark:font-medium font-semibold uppercase text-[0.65rem]">
                    Priority
                  </legend>
                  <label
                    htmlFor="priority"
                    className="w-full h-full flex items-center justify-between space-x-1 dark:text-slate-300 text-slate-700 text-xs font-medium relative"
                  >
                    <select
                      className={`w-full h-full overflow-hidden whitespace-nowrap text-ellipsis p-2 pt-1 dark:bg-slate-800 bg-white border-0 outline-none focus:outline-none focus:ring-0 focus:border-0 text-xs font-medium  ${
                        !inputValue?.priority
                          ? "dark:text-slate-600 text-slate-400"
                          : "dark:text-slate-400 text-slate-700"
                      }`}
                      id="priority"
                      name="priority"
                      value={inputValue?.priority}
                      required={true}
                      onChange={(e) =>
                        setValues({
                          ...inputValue,
                          priority: e.target.value,
                        })
                      }
                    >
                      <option
                        className="capitalize dark:text-slate-400 text-slate-700"
                        value=""
                      >
                        Priority ...
                      </option>
                      <option className="capitalize dark:text-slate-400 text-slate-700">
                        Low
                      </option>
                      <option className="capitalize dark:text-slate-400 text-slate-700">
                        Medium
                      </option>
                      <option className="capitalize dark:text-slate-400 text-slate-700">
                        High
                      </option>
                      <option className="capitalize dark:text-slate-400 text-slate-700">
                        Urgent
                      </option>
                    </select>
                  </label>
                </fieldset>

                <fieldset className="col-span-1 w-full h-12 border border-slate-400 dark:border-slate-700 rounded px-2">
                  <legend className="px-2 bg-white dark:bg-slate-800 rounded text-slate-900 dark:text-slate-300 dark:font-medium font-semibold uppercase text-[0.65rem]">
                    Status
                  </legend>
                  <label
                    htmlFor="status"
                    className="w-full h-full flex items-center justify-between space-x-1 dark:text-slate-300 text-slate-700 text-xs font-medium relative"
                  >
                    <select
                      className={`w-full h-full overflow-hidden whitespace-nowrap text-ellipsis p-2 pt-1 dark:bg-slate-800 bg-white border-0 outline-none focus:outline-none focus:ring-0 focus:border-0 text-xs font-medium capitalize  ${
                        !inputValue?.state
                          ? "dark:text-slate-600 text-slate-400"
                          : "dark:text-slate-400 text-slate-700"
                      }`}
                      id="status"
                      name="status"
                      value={inputValue?.state}
                      required={true}
                      onChange={(e) =>
                        setValues({
                          ...inputValue,
                          state: e.target.value,
                        })
                      }
                    >
                      <option
                        className="capitalize dark:text-slate-400 text-slate-700"
                        value=""
                      >
                        Status ...
                      </option>
                      <option
                        className="capitalize dark:text-slate-400 text-slate-700"
                        value="open"
                      >
                        open
                      </option>
                      <option
                        className="capitalize dark:text-slate-400 text-slate-700"
                        value="on hold"
                      >
                        on hold
                      </option>
                      <option
                        className="capitalize dark:text-slate-400 text-slate-700"
                        value="solved"
                      >
                        first Contact Resolution
                      </option>
                    </select>
                  </label>
                </fieldset>
              </div>
              {/**Priority and Status =============================================== */}

              {/**Email and Numbers =============================================== */}
              <div className="w-full min-h-14 grid grid-cols-1 md:grid-cols-2 gap-4">
                <fieldset className="col-span-1 w-full h-12 border border-slate-400 dark:border-slate-700 rounded px-2">
                  <legend className="px-2 bg-white dark:bg-slate-800 rounded text-slate-900 dark:text-slate-300 dark:font-medium font-semibold uppercase text-[0.65rem]">
                    Email
                  </legend>
                  <label
                    htmlFor="email"
                    className="w-full h-full flex items-center justify-between dark:text-slate-300 text-slate-700 text-xs font-medium relative"
                  >
                    <input
                      className="w-full h-full overflow-hidden whitespace-nowrap text-ellipsis p-2 pt-1 bg-transparent dark:text-slate-400 text-slate-700 border-0 outline-none focus:outline-none focus:ring-0 focus:border-0 text-xs font-medium dark:placeholder:text-slate-600 placeholder:text-slate-400 capitalize"
                      type="text"
                      id="email"
                      title="Enter A valid Email"
                      name="email"
                      value={inputValue?.complainant_email}
                      autoComplete="nope"
                      placeholder="Customer's Email"
                      onChange={(e) =>
                        setValues({
                          ...inputValue,
                          complainant_email:
                            e.target.value?.replace(/\s/g, "") === ""
                              ? "none"
                              : e.target.value,
                        })
                      }
                    />
                  </label>
                </fieldset>

                <fieldset className="col-span-1 w-full h-12 border border-slate-400 dark:border-slate-700 rounded px-2">
                  <legend className="px-2 bg-white dark:bg-slate-800 rounded text-slate-900 dark:text-slate-300 dark:font-medium font-semibold uppercase text-[0.65rem]">
                    Phone
                  </legend>
                  <label
                    htmlFor="numbers"
                    className="w-full h-full flex items-center justify-between space-x-1 dark:text-slate-300 text-slate-700 text-xs font-medium relative"
                  >
                    <input
                      className="w-full h-full overflow-hidden whitespace-nowrap text-ellipsis p-2 pt-1 bg-transparent dark:text-slate-400 text-slate-700 border-0 outline-none focus:outline-none focus:ring-0 focus:border-0 text-xs font-medium dark:placeholder:text-slate-600 placeholder:text-slate-400"
                      id="numbers"
                      name="numbers"
                      type="text"
                      autoComplete="nope"
                      placeholder="073 5698 625"
                      required={true}
                      pattern="^[0-9]{10}$"
                      value={inputValue?.complainant_number}
                      onChange={(e) => {
                        setValues({
                          ...inputValue,
                          complainant_number: e.target.value,
                          agent: member_details[0].name,
                          agent_email: member_details[0].email,
                        });
                      }}
                    />
                    <ul
                      className={`${
                        numbersArray.length >= 1 && showOpenedTickets
                          ? ""
                          : "hidden"
                      } absolute top-10 right-[-0.5rem] h-[20rem] w-[25rem] bg-slate-500 dark:bg-slate-900 border border-slate-400 dark:border-slate-700 z-[999] rounded overflow-y-scroll no-scrollbar no-scrollbar::-webkit-scrollbar p-6 space-y-2 shadow-2xl drop-shadow-2xl`}
                    >
                      <h4 className="text-base font-semibold font-sans italic text-slate-50 dark:text-slate-300">
                        Customer's History
                      </h4>
                      {exist}
                      <button
                        type="button"
                        onClick={() => setShowOpen(false)}
                        className="absolute top-[-0.25rem] right-1 border border-slate-300 dark:border-slate-600 h-6 w-6 outline-none focus:outline-none hover:opacity-80 rounded text-sm text-slate-50 dark:font-medium font-semibold flex justify-center items-center"
                      >
                        &times;
                      </button>
                    </ul>
                  </label>
                </fieldset>
              </div>
              {/**Email and Numbers =============================================== */}

              {/**Name And Team =============================================== */}
              <div className="overflow-hidden w-full min-h-14 grid grid-cols-1 md:grid-cols-2 gap-4">
                <fieldset className="col-span-1 w-full h-12 border border-slate-400 dark:border-slate-700 rounded px-2">
                  <legend className="px-2 bg-white dark:bg-slate-800 rounded text-slate-900 dark:text-slate-300 dark:font-medium font-semibold uppercase text-[0.65rem]">
                    Name
                  </legend>
                  <label
                    htmlFor="name"
                    className="h-full w-full flex items-center justify-between space-x-1 dark:text-slate-300 text-slate-700 text-xs font-medium relative"
                  >
                    <input
                      className="h-full w-full overflow-hidden whitespace-nowrap text-ellipsis p-2 pt-1 bg-transparent dark:text-slate-400 text-slate-800 border-0 outline-none focus:outline-none focus:ring-0 focus:border-0 text-xs font-medium dark:placeholder:text-slate-600 placeholder:text-slate-400"
                      id="name"
                      name="name"
                      type="text"
                      placeholder="Customer's Name ..."
                      value={inputValue?.complainant_name}
                      required={true}
                      onChange={(e) =>
                        setValues({
                          ...inputValue,
                          complainant_name: e.target.value,
                          agent: member_details[0].name,
                          agent_email: member_details[0].email,
                        })
                      }
                    />
                  </label>
                </fieldset>

                <fieldset className="col-span-1 w-full h-12 border border-slate-400 dark:border-slate-700 rounded px-2">
                  <legend className="px-2 bg-white dark:bg-slate-800 rounded text-slate-900 dark:text-slate-300 dark:font-medium font-semibold uppercase text-[0.65rem]">
                    Team
                  </legend>
                  <label
                    htmlFor="priority"
                    className="h-full w-full flex items-center justify-between space-x-1 dark:text-slate-300 text-slate-700 text-xs font-medium relative"
                  >
                    <select
                      className={`h-full w-full overflow-hidden whitespace-nowrap text-ellipsis p-2 pt-1 dark:bg-slate-800 bg-white  border-0 outline-none focus:outline-none focus:ring-0 focus:border-0 text-xs font-medium ${
                        !inputValue?.send_as
                          ? "dark:text-slate-600 text-slate-400"
                          : "dark:text-slate-400 text-slate-700"
                      }`}
                      id="priority"
                      name="priority"
                      value={inputValue?.send_as}
                      required={true}
                      onChange={(e) =>
                        setValues({
                          ...inputValue,
                          send_as: e.target.value,
                        })
                      }
                    >
                      <option
                        className="capitalize dark:text-slate-600 text-slate-400"
                        value=""
                      >
                        Send As ...
                      </option>
                      {email_accounts.length >= 1 &&
                        email_accounts.map((team) => {
                          return (
                            <option
                              key={team.id}
                              className="capitalize dark:text-slate-400 text-slate-700"
                              value={team.name}
                            >
                              {team.name}
                            </option>
                          );
                        })}
                    </select>
                  </label>
                </fieldset>
              </div>
            </div>
            {/**Message ====================================== */}
            <div className="w-full h-[18rem] mt-4 rounded overflow-hidden">
              <RichTextEditor
                value={value}
                onImageUpload={handleImageUpload}
                onChange={onChange}
                className="`replyEditor h-full w-full border border-slate-400 dark:border-slate-700 bg-inherit text-slate-700 dark:text-slate-400 overflow-hidden overflow-y-scroll no-scrollbar no-scrollbar::-webkit-scrollbar"
                classNames={{
                  toolbar:
                    "bg-white dark:bg-slate-800 flex justify-center items-center  flex-nowrap w-full text-slate-700 dark:text-slate-400 border-b border-slate-300 dark:border-slate-700 rounded-none sticky p-0  overflow-hidden",
                  toolbarInner:
                    "bg-slate-50 dark:bg-[#182235] text-slate-700 dark:text-slate-400 border-b border-slate-300 dark:border-slate-700 w-full h-[3.25rem] flex justify-center flex-nowrap overflow-hidden py-1",
                  toolbarGroup:
                    "bg-inherit text-slate-700 dark:text-slate-400 border-0 border-slate-300 dark:border-slate-600 rounded-sm flex justify-between w-full",
                  toolbarControl:
                    "bg-inherit text-slate-700 dark:text-slate-400 border-0  dark:hover:bg-slate-600 hover:bg-white rounded-sm",
                  root: "replyEditor h-full py-0 pl-0 overflow-hidden overflow-y-scroll no-scrollbar no-scrollbar::-webkit-scrollbar bg-white dark:bg-slate-800",
                }}
                controls={[
                  [
                    "bold",
                    "italic",
                    "underline",
                    "code",
                    "blockquote",
                    "unorderedList",
                    "orderedList",
                    "h1",
                    "strike",
                    "image",
                    "alignLeft",
                    "alignCenter",
                    "alignRight",
                    "link",
                  ],
                ]}
              />
            </div>
          </div>

          {/**Bottom Controls ========================================= */}
          <div className="dark:bg-slate-700 bg-slate-200 h-[3rem] w-full p-2 px-4 flex justify-between items-center  select-none">
            <div className="flex justify-center items-center">
              {/**Reset Input ========================================= */}
              <div className="relative group">
                <HintTooltip
                  details={"Clear All Data"}
                  positions={{
                    horizontal: `left-0`,
                    vertical: `top-[-70%]`,
                  }}
                />
                <span
                  onClick={() => {
                    setValues({
                      recipient_name: "",
                      recipient_email: "",
                      agent: "",
                      priority: "",
                      category: "",
                      branch_company: "",
                      message: "",
                      state: "",
                      date: "",
                      agent_email: "",
                      complainant_name: "",
                      complainant_email: "none",
                      complainant_number: "",
                      send_as: "",
                    });
                    onChange("");
                    setFile(false);
                  }}
                  className="h-10 w-10 flex justify-center items-center outline-none focus:outline-none hover:opacity-80 rounded text-red-500 cursor-pointer"
                >
                  <BiTrash />
                </span>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              {/**Canned Responses ========================================= */}
              <div className="relative group">
                <div
                  id="email"
                  className="w-8 h-8 group flex items-center justify-center text-slate-600 cursor-pointer dark:text-slate-400 rounded border hover:border-blue-600 dark:hover:border-blue-600 transition-all duration-200 dark:border-slate-600 border-slate-300 outline-none focus:outline-none"
                >
                  <BiCollection />
                </div>
                <CannedResponses
                  setReply={setValues}
                  onChange={onChange}
                  position={4}
                  tooltipPosition={`[9.4rem]`}
                />
                <HintTooltip
                  details={"Canned Responses"}
                  positions={{
                    horizontal: `right-[110%]`,
                    vertical: `bottom-0`,
                  }}
                />
              </div>
              {/**Upload Recordings ========================================= */}
              <div className="relative group">
                <HintTooltip
                  details={"Upload an audio"}
                  positions={{
                    horizontal: `right-0`,
                    vertical: `top-[-115%]`,
                  }}
                />
                <div className="w-8 h-8 border hover:border-blue-600 dark:hover:border-blue-600 transition-all duration-200 border-slate-300 dark:border-slate-600 rounded flex justify-center items-center">
                  <label
                    htmlFor="recording"
                    className="w-full h-full flex justify-center items-center text-base text-slate-600 dark:text-slate-400 cursor-pointer"
                  >
                    <BiMicrophone className="text-lg" />
                    <input
                      type="file"
                      id="recording"
                      name="recording"
                      accept=".wav"
                      value={recordingFile ? recordingFile.filename : ""}
                      title="Upload Recording"
                      onChange={(e) => {
                        let target: any = e.target; //<-- This (any) will tell compiler to shut up!
                        let content: any = target.files[0];
                        setFile(content);
                      }}
                      className="outline-none focus:outline-none hidden"
                    />
                  </label>
                </div>
              </div>
              {/**Send ========================================= */}
              <div className="flex items-center bg-slate-800 dark:bg-blue-700 text-slate-100 dark:text-slate-100 rounded-sm">
                <button
                  disabled={isSubmiting ? true : false}
                  type="submit"
                  className="h-8 px-4 flex justify-center items-center space-x-2 outline-none focus:outline-none hover:opacity-80 rounded font-medium text-xs font-sans transition-all disabled:cursor-not-allowed capitalize"
                >
                  <span>Submit now</span>
                  <div
                    className={`h-4 w-4 rounded-full border-2 border-blue-500 border-l-white animate-spin ${
                      isSubmiting ? "" : "hidden"
                    }`}
                  ></div>{" "}
                </button>
                <div className="h-full flex items-center relative group">
                  <button
                    type="button"
                    className="h-[80%] px-2 bg-inherit text-inherit border-0 outline-none focus:outline-none border-l border-slate-400 hover:opacity-80 transition-all  disabled:cursor-not-allowed disabled:opacity-80"
                  >
                    <BiChevronDown className="text-lg" />
                  </button>
                  <HintTooltip
                    details={"Schedule for later"}
                    positions={{
                      horizontal: `right-0`,
                      vertical: `top-[-240%]`,
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewTicket;
