import React, { FC, useState, useRef, useMemo, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  BsFillTrashFill,
  BsThreeDotsVertical,
  BsChatRight,
} from "react-icons/bs";
import {
  BiPaperPlane,
  BiMicrophone,
  BiCommentDetail,
  BiArrowBack,
} from "react-icons/bi";
import { HiCheck, HiOutlineArrowSmDown } from "react-icons/hi";
import noChatImg from "./images/email-open.svg";
import {
  addReply,
  deleteTicket,
  resolveTicket,
  changeStatus,
  reOpenTicket,
} from "../Data_Fetching/TicketsnUserData";
import { updateAlert } from "../../Redux/Slices/NotificationsSlice";
import { addRecording } from "../Auth/Firebase";
import useOnClickOutside from "../../Custom-Hooks/useOnClickOutsideRef";
import TextEditor from "./TextEditor";
import { AppDispatch, RootState } from "../../Redux/store";

interface Props {
  isChatOpen: boolean;
  setChat: any;
  audio: any;
}

interface ReplyOptions {
  message: string;
  subject: string;
  status: string;
  message_position: number | string;
  ticket_id: string | any;
}

const MessageThread: FC<Props> = ({ setChat, isChatOpen, audio }) => {
  const statusSelectionRef = useRef<HTMLSelectElement>(null);
  const threadId = useSelector((state: RootState) => state.Tickets.threadId);
  const allTickets = useSelector(
    (state: RootState) => state.Tickets.allTickets
  );
  const filteredTickets = useSelector(
    (state: RootState) => state.Tickets.filteredTickets
  );
  const email_accounts = useSelector(
    (state: RootState) => state.Tickets.email_accounts
  );
  const company_details = useSelector(
    (state: RootState) => state.Tickets.company_details
  );
  const alerts = useSelector(
    (state: RootState) => state.NotificationsData.alerts
  );
  const templates = useSelector(
    (state: RootState) => state.Tickets.email_templates
  );
  const [recordingFile, setFile] = useState<boolean>(false);
  const [cannedSearch, setCannedSearch] = useState<string>("");
  const user = useSelector((state: RootState) => state.UserInfo.member_details);

  const [value, onChange] = useState<string | any>("<p></p>");
  const dispatch: AppDispatch = useDispatch();
  const scrollToLastMessage = useRef<HTMLDivElement | any>();
  const scrollToNone = useRef<HTMLDivElement | any>();

  //Filter Thread Messages =====================================
  const threadMessages = useMemo(() => {
    return allTickets
      .filter((ticket) => ticket.ticket_id === threadId)
      .sort((a, b) => {
        return (
          Number(new Date(a.date).getTime()) -
          Number(new Date(b.date).getTime())
        );
      });
  }, [allTickets, threadId]);

  //Reply State and value ==================================
  const [reply, setReply] = useState<ReplyOptions>({
    message: "<p></p>",
    subject:
      threadMessages.length >= 1 &&
      threadMessages.filter((msg: any) => msg.message_position === 1)[0]
        ?.category,
    status: "Status",
    message_position: threadMessages.length + 1,
    ticket_id: threadId,
  });

  //Thread First Message =====================
  const firstMessage = useMemo(() => {
    return (
      filteredTickets &&
      filteredTickets.filter((ticket) => ticket.ticket_id === threadId) &&
      filteredTickets.filter((ticket) => ticket.ticket_id === threadId)
    );
  }, [filteredTickets, threadId]);

  useEffect(() => {
    setReply((previous) => ({
      ...previous,
      ticket_id: threadId,
      status: firstMessage[0]?.status,
      message_position: threadMessages.length + 1,
    }));
  }, [firstMessage, threadId, threadMessages]);

  //Message options ========================================gi
  const [msgOptions, setOptions] = useState<any>({
    status: false,
    id: "",
    threadId: "",
  });
  const msgOptionsRef = useOnClickOutside(() =>
    setOptions({ status: false, id: "", threadId: "" })
  );

  //Get Name of Reciepent and Agent and email ===============
  let clientName: string =
    user[0]?.access === "client"
      ? firstMessage && firstMessage[0]?.agent_name
      : firstMessage && firstMessage[0]?.recipient_name;
  let clientEmail: string =
    user[0]?.access === "client"
      ? firstMessage && firstMessage[0]?.agent_email
      : firstMessage && firstMessage[0]?.recipient_email;
  let brand: string = firstMessage && firstMessage[0]?.branch_company;
  let ticket_status: string = firstMessage && firstMessage[0]?.status;
  let date: any = firstMessage && firstMessage[0]?.due_date;

  //Scroll to last message Function
  const lastMessage = () => {
    if (scrollToLastMessage && scrollToLastMessage.current) {
      scrollToLastMessage.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  //Send Solution send Solution ====================
  const sendSolution = () => {
    // Upload Recordings
    recordingFile !== false &&
      addRecording(recordingFile, `/${company_details?.name}/${threadId}`);

    //Add ticket recording on firebase storage =============================
    resolveTicket(
      firstMessage && firstMessage[0]?.id,
      reply.message,
      recordingFile !== false ? true : false
    );

    //Sending Account =============================
    let sendingAccount: any =
      firstMessage &&
      email_accounts.filter(
        (account) =>
          account.name.toLowerCase() === firstMessage[0]?.team.toLowerCase()
      )[0];

    //Relpy Using Nodemailer ===================
    let closingTime = `${new Date().toDateString()}, ${new Date().getHours()}:${
      new Date().getMinutes() + 1
    } hrs`;

    fetch("https://dndhelp-desk-first.herokuapp.com/send", {
      method: "POST",
      mode: "no-cors",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        from: `${sendingAccount.email}`,
        company: `${company_details.name} ${sendingAccount.name}`,
        password: sendingAccount.password,
        host: sendingAccount.host,
        port: sendingAccount.port,
        email: clientEmail,
        subject: firstMessage && firstMessage[0]?.category,
        ticket_id: threadId,
        email_body: `<p
    style="color:#0c0c30;font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont , monospace; ;font-size:15px">
     Hi ${clientName},
  </p>
  <h1
    style="color:#0c0c30;font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont , monospace; ;font-size:15px">
   <b> A ticket with ID: ${threadId} has been Resolved. If you feel unsatisfied by the solution please don't hesitate to cantact us thruogh the links provided below, don't foget to grab your ticket-id.</b>
  </h1>
  <p
    style="color:#0c0c30;font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont,monospace ;line-height:20px;font-size:16px;text-decoration: underline;">
    <b>Tickect Details:</b>
  </p>
  <ul
    style="color:#0c0c30;font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont , monospace;line-height:25px">
    <li><b>Brand:</b>
      ${brand}
    </li>
    <li><b>Tickect-ID:</b>
      ${threadId}
    </li>
    <li><b>Closed On:</b>
      ${closingTime}
    </li>
    <li><b>Status:</b>
      Resolved
    </li>
  </ul>
  <p
    style="color:#0c0c30;font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont,monospace ;line-height:20px;font-size:16px;text-decoration: underline;">
    <b>Resolution:</b>
  </p>
  <p
    style="color:#0c0c30;font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont,monospace ;line-height:20px;font-size:15px;white-space:normal;overflow:hidden">
    ${reply.message}
  </p>
  <p style="color:#0c0c30;font-family:Arial, Helvetica, sans-serif;line-height:20px;font-size:14px">
    <i>In order to update or respond to this issue please click the button below,</i>
  </p>
  <p style="color:blue;font-family:Arial, Helvetica, sans-serif;line-height:20px;font-size:14px">
    <i> <a target="_blank" href=${`https://www.dndhelp-desk.co.za/support?threadId=${threadId}`}>You can alternatively click here.</a></i>
  </p>
  <button style="background:#e46823;padding-left:10px;padding-right:10px;padding:15px;border-radius:5px;border-width: 0px;outline-width: 0px;box-shadow: 0px 1px 0px rgba(0, 0, 0.68, 0.2);cursor: pointer;"><a style="text-decoration:none;color:#fff;font-weight: 700" target="_blank" href=${`https://www.dndhelp-desk.co.za/support?threadId=${threadId}`}>Update or Respond Here</a></button>
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
                message: "Ticket has been resolved",
                color: "bg-green-200",
              },
            ])
          );
          onChange("<p></p>");
          setReply({
            ...reply,
            message: "<p></p>",
            status: firstMessage[0] ? firstMessage[0]?.status : "Status",
          });
        } else if (resData.status === "fail") {
          dispatch(
            updateAlert([
              ...alerts,
              {
                message: "Ticket Failed To Resolve",
                color: "bg-red-200",
              },
            ])
          );
        }
      });
    setReply({
      ...reply,
      message: "<p></p>",
      status: firstMessage[0] ? firstMessage[0]?.status : "Status",
    });
    onChange("<p></p>");
  };

  //Send Reply Function ========================
  const sendReply = (e: React.SyntheticEvent) => {
    e.preventDefault();

    //Sending Account ========================
    let sendingAccount: any =
      firstMessage &&
      email_accounts?.filter(
        (account) =>
          account.name.toLowerCase() === firstMessage[0]?.team.toLowerCase()
      )[0];

    //Check if field are then send ======================
    if (
      user[0].name !== "User Loader" &&
      reply.ticket_id !== "none" &&
      reply.status !== "Status" &&
      reply.status !== "" &&
      reply.status !== "solved"
    ) {
      addReply(
        reply.message,
        reply.message_position,
        reply.ticket_id,
        user[0].name,
        user[0].email,
        user[0].access,
        clientName,
        clientEmail,
        firstMessage && firstMessage[0]?.team
      );

      //Send Using Nodemailer ===================
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
          email: clientEmail,
          subject: reply.subject,
          ticket_id: threadId,
          email_body: `<p
    style="color:#0c0c30;font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont , monospace; ;font-size:15px">
    Hi ${clientName},
  </p>
  <h1
    style="color:#0c0c30;font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont , monospace; ;font-size:15px">
   <b> A ticket with ID: ${threadId} has been updated. In order to reply or update this issues please navigate to the link provided at the bottom, don't foget to grab your ticket-id.</b>
  </h1>
  <p
    style="color:#0c0c30;font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont,monospace ;line-height:20px;font-size:16px;text-decoration: underline;">
    <b>Tickect Details:</b>
  </p>
  <ul
    style="color:#0c0c30;font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont , monospace;line-height:25px">
    <li><b>Brand:</b>
      ${brand}
    </li>
    <li><b>Tickect-ID:</b>
      ${threadId}
    </li>
    <li><b>Due Date:</b>
      ${
        new Date(date).toDateString() +
        " " +
        new Date().getHours() +
        1 +
        ":" +
        new Date().getMinutes() +
        1 +
        "hrs"
      }
    </li>
    <li><b>Status:</b>
      ${ticket_status}
    </li>
  </ul>
  <p
    style="color:#0c0c30;font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont,monospace ;line-height:20px;font-size:16px;text-decoration: underline;">
    <b>Feedback:</b>
  </p>
  <p
    style="color:#0c0c30;font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont,monospace ;line-height:20px;font-size:15px;white-space:normal;overflow:hidden">
    ${reply.message}
  </p>
  <p style="color:#0c0c30;font-family:Arial, Helvetica, sans-serif;line-height:20px;font-size:14px">
    <i>In order to update or respond to this issue please click the button below,</i>
  </p>
  <p style="color:blue;font-family:Arial, Helvetica, sans-serif;line-height:20px;font-size:14px">
    <i> <a target="_blank" href=${`https://www.dndhelp-desk.co.za/support?threadId=${threadId}`}>You can alternatively click here.</a></i>
  </p>
  <button style="background:#e46823;padding-left:10px;padding-right:10px;padding:15px;border-radius:5px;border-width: 0px;outline-width: 0px;box-shadow: 0px 1px 0px rgba(0, 0, 0.68, 0.2);cursor: pointer;"><a style="text-decoration:none;color:#fff;font-weight: 700" target="_blank" href=${`https://www.dndhelp-desk.co.za/support?threadId=${threadId}`}>Update or Respond Here</a></button>
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
                  message: "Response Has Been Sent.",
                  color: "bg-green-200",
                },
              ])
            );
            setReply({
              ...reply,
              message: "<p></p>",
              status: "Status",
            });
            onChange("<p></p>");
          } else if (resData.status === "fail") {
            dispatch(
              updateAlert([
                ...alerts,
                {
                  message: "Email Failed To Send",
                  color: "bg-red-200",
                },
              ])
            );
          }
        });
      onChange("<p></p>");
    }

    //If There is Solution / Statusis solution send solution / reopen ticket if status is solved
    if (reply.status === "solved") {
      sendSolution();
      setReply({
        ...reply,
        message: "<p></p>",
        status: firstMessage[0] ? firstMessage[0]?.status : "Status",
      });
      onChange("<p></p>");
    } else if (reply.status === "reopened") {
      reOpenTicket(firstMessage[0]?.id);
      setReply({
        ...reply,
        message: "<p></p>",
        status: firstMessage[0] ? firstMessage[0]?.status : "Status",
      });
      onChange("<p></p>");
    } else if (
      reply.status !== "" &&
      reply.status !== "Status" &&
      reply.status !== "solved" &&
      reply.status !== "reopened"
    ) {
      changeStatus(firstMessage[0]?.id, reply.status);
      setReply({
        ...reply,
        message: "<p></p>",
        status: firstMessage[0] ? firstMessage[0]?.status : "Status",
      });
    }
    onChange("<p></p>");
    if (statusSelectionRef && statusSelectionRef.current) {
      statusSelectionRef.current.selectedIndex = 0;
    }
    if (reply.status !== "Status" && reply.status === "") {
      dispatch(
        updateAlert([
          ...alerts,
          {
            message: "Please Select A Proper Status",
            color: "bg-yellow-200",
          },
        ])
      );
    }
  };

  //Loop Through Each Message In a thread ====================
  const thread =
    threadMessages &&
    threadMessages.map((message, index) => {
      return (
        <div
          ref={
            threadMessages.length - 1 === index
              ? scrollToLastMessage
              : scrollToNone
          }
          key={index}
          className="w-full text-slate-400 text-sm leading-6 flex transition-all tracking-wide bg-white dark:bg-slate-800 rounded border border-slate-200 dark:border-[#3341553f]"
        >
          {/**Message ====================== */}
          <div className="w-[95%] 2xl:w-full bg-tranparent pl-6 pb-2 relative">
            <div className="absolute left-[-1rem] top-[-0.25rem] h-[2rem] w-[2rem] rounded border dark:border-slate-700 border-slate-300 dark:bg-slate-800 bg-white px-1 overflow-hidden">
              <div className="w-full h-full dark:bg-slate-800 bg-white dark:text-gray-300 text-slate-800 flex justify-center items-center capitalize font-bold text-sm">
                <BsChatRight />
              </div>
            </div>
            {/**Contents ======================= */}
            <div className="w-full bg-transparent rounded-lg">
              <div className="font-semibold dark:font-medium dark:text-slate-400 text-slate-500 justify-between md:items-center w-full flex flex-col md:flex-row relative">
                <div className="flex items-center dark:text-slate-300 text-slate-900 text-xs">
                  <span className="tracking-normal capitalize">
                    {message.agent_name}
                    {message.user}
                  </span>
                  <span
                    className={`justify-end space-x-2 px-2 capitalize text-xs text-blue-600 italic ${
                      message.user_email === user[0].email ||
                      message.agent_email === user[0].email
                        ? "flex"
                        : "hidden"
                    }`}
                  >
                    <HiCheck />
                    <HiCheck
                      className={`${
                        message.readStatus !== "read" ? "text-slate-500" : ""
                      }`}
                    />
                  </span>
                </div>{" "}
                <div className="flex space-x-0 md:space-x-2 h-full items-center justify-between">
                  <span className="flex space-x-2">
                    <span className="text-[0.7rem] dark:text-slate-400 text-slate-700  font-medium">
                      {`${new Date(message.date).toLocaleString()}`}
                    </span>
                  </span>
                  <button
                    onClick={() =>
                      user[0].access === "admin" &&
                      setOptions({
                        status: true,
                        id: message.message_position,
                        threadId: message.ticket_id,
                      })
                    }
                    className="h-8 w-8 rounded-xl dark:hover:bg-slate-700 hover:bg-slate-300 dark:text-slate-400 text-slate-700 flex items-center justify-center outline-none focus:outline-none"
                  >
                    <BsThreeDotsVertical className="inline  cursor-pointer" />
                  </button>

                  {/**Message Options =========================== */}
                  <div
                    ref={msgOptionsRef}
                    className={`w-[10rem] ${
                      msgOptions.status === true &&
                      msgOptions.id === message.message_position &&
                      msgOptions.threadId === message.ticket_id
                        ? ""
                        : "hidden"
                    } z-[99] shadow-lg border dark:border-slate-800 border-slate-100 dark:bg-slate-700 bg-white backdrop-blur-sm rounded-lg absolute right-0 top-8 p-4`}
                  >
                    <h5 className="dark:text-slate-300 text-slate-500 font-semibold text-sm flex justify-between items-center">
                      <span>Delete</span>
                      <BsFillTrashFill
                        onClick={() => {
                          deleteTicket(message.id);
                          setOptions({
                            status: false,
                            id: "",
                            threadId: "",
                          });
                        }}
                        className="hover:text-red-500 cursor-pointer"
                      />
                    </h5>
                  </div>
                </div>
              </div>
              <div className="py-2 dark:text-slate-400 text-slate-700 p-2 text-[13px]">
                {message.message && (
                  <div
                    dangerouslySetInnerHTML={{ __html: message?.message }}
                    className="messageContainer dark:marker:text-slate-400 marker:text-slate-800 list-disc"
                  ></div>
                )}
              </div>
            </div>
          </div>
        </div>
      );
    });

  //Component ======================================
  return (
    <div className="h-[47rem] flex flex-col w-full lg:rounded-r-lg rounded-md lg:rounded-none bg-transparent">
      <div className="h-[70%] w-full dark:bg-slate-800 bg-white border dark:border-slate-700 border-slate-300 rounded-none lg:rounded-tr-md pb-2 gap-2 flex flex-col shadow-md overflow-hidden">
        <div className="h-14 dark:bg-[#182235] bg-slate-100 sticky py-2 top-0 w-full flex justify-between z-[99] border-b dark:border-[#33415596] border-slate-200 px-2">
          {/**Opened Ticket Details ================================== */}
          <div className="flex justify-between items-center w-full space-x-2 bg-transparent px-3">
            <div className="flex items-center space-x-2">
              {/**Back To Main List On Small Screens ====================== */}
              <button
                onClick={() => setChat(false)}
                className={`dark:text-slate-300 text-slate-800 font-bold py-1 h-2 w-full text-xl hover:opacity-80 rounded flex lg:hidden items-center space-x-1 outline-none focus:outline-none  ${
                  !isChatOpen && "hidden"
                }`}
              >
                <abbr title="Back to list">
                  <BiArrowBack />
                </abbr>
              </button>

              {/**Details  ====================== */}
              <details className="relative flex items-center space-x-2 outline-none focus:outline-none lg:border-0 border-l border-slate-300 dark:border-slate-700">
                <summary className="w-[4rem] pl-2 lg:p-0 text-[0.65rem] leading-6 dark:text-slate-300 text-slate-900 font-bold uppercase select-none cursor-pointer outline-none focus:outline-none">
                  Details
                </summary>
                <div className="absolute flex flex-col justify-between rounded-md top-8 left-[-1.5rem] h-[18rem] w-[15rem] sm:w-[28rem] shadow-2xl drop-shadow-2xl dark:bg-slate-900 bg-white border border-slate-300 dark:border-slate-700 p-4  before:content-[''] before:absolute before:tooltip_bottom before:left-[0.6rem] before:h-[20px] before:w-[20px] before:bg-inherit before:border before:border-t-inherit before:border-l-inherit before:border-r-transparent before:border-b-transparent before:rotate-45 transition-all duration-500">
                  <div>
                    <ul className="dark:text-slate-400 text-slate-800 mt-2 space-y-4 capitalize">
                      <li className="text-xs flex items-center justify-between border-b border-slate-200 dark:border-slate-700">
                        <b className="hidden sm:flex">Open Date : </b>
                        {firstMessage &&
                          new Date(firstMessage[0]?.date).toLocaleString()}{" "}
                      </li>
                      <li className="text-xs flex items-center justify-between border-b border-slate-200 dark:border-slate-700">
                        <b className="hidden sm:flex">Assigned To : </b>
                        {firstMessage && firstMessage[0]?.agent_name}
                      </li>
                      <li className="text-xs flex items-center justify-between border-b border-slate-200 dark:border-slate-700">
                        <b className="hidden sm:flex">Brand/Company : </b>
                        {firstMessage && firstMessage[0]?.branch_company}
                      </li>
                      <li className="text-xs flex items-center justify-between border-b border-slate-200 dark:border-slate-700">
                        <b className="hidden sm:flex">
                          First Contact Resolution :{" "}
                        </b>
                        {firstMessage && firstMessage[0]?.fcr}{" "}
                      </li>
                      <li className="text-xs flex items-center justify-between border-b border-slate-200 dark:border-slate-700">
                        <b className="hidden sm:flex">Customer's Name : </b>
                        {firstMessage && firstMessage[0]?.complainant_name}{" "}
                      </li>
                      <li className="text-xs flex items-center justify-between border-b border-slate-200 dark:border-slate-700">
                        <b className="hidden sm:flex">Customer's Number : </b>
                        {firstMessage &&
                          firstMessage[0]?.complainant_number}{" "}
                      </li>
                      <li className="text-xs flex items-center justify-between border-b border-slate-200 dark:border-slate-700">
                        <b className="hidden sm:flex">Customer's Email : </b>
                        <span className="lowercase">
                          {firstMessage && firstMessage[0]?.complainant_email}{" "}
                        </span>
                      </li>
                    </ul>
                  </div>
                </div>
              </details>
            </div>

            {/**Subject And Scroll To Last Message Details =========================== */}
            <div className="dark:font-medium font-semibold dark:text-slate-300 text-slate-900 tracking-wide flex flex-col capitalize text-right whitespace-nowrap overflow-hidden overflow-ellipsis">
              <span className="uppercase text-[0.6rem] font-bold">
                {firstMessage && firstMessage[0]?.category}
                {(!threadId || threadMessages.length <= 0) &&
                  "Nothing is selected"}
              </span>{" "}
              {/**Scroll to Last Message ================== */}
              <button
                onClick={() => lastMessage()}
                className="outline-none focus:outline-none text-lg dark:text-slate-400 text-slate-700 capitalize flex items-center justify-end space-x-1"
              >
                <HiOutlineArrowSmDown />
                <span className="text-xs">Jump To Last Message</span>
              </button>
            </div>
          </div>
        </div>

        {/**Thread Messages ============================ */}
        <div className="h-full w-[98%] m-auto p-6 flex flex-col gap-3 overflow-y-scroll bg-inherit">
          {thread}
          {
            //Final Solution If there is one =====================
            firstMessage && firstMessage[0]?.status === "solved" && (
              <div
                ref={scrollToLastMessage}
                className="w-full text-slate-400 text-sm leading-6 flex transition-all bg-white dark:bg-slate-800 rounded border border-slate-200 dark:border-[#3341553f]"
              >
                {/**Message ====================== */}
                <div className="w-[95%] 2xl:w-full bg-tranparent pl-6 pb-2 relative">
                  <div className="absolute left-[-1rem] top-[-0.25rem] h-[2rem] rounded dark:bg-slate-800 bg-white border dark:border-slate-700 border-slate-300 dark:text-gray-300 text-slate-50 font-medium tracking-widest uppercase text-[0.6rem] overflow-hidden p-[1px]">
                    <div className="w-full h-full dark:bg-slate-800 bg-white rounded-[0.3rem]  dark:text-gray-300 text-slate-600 flex justify-center items-center uppercase font-bold text-[0.6rem] px-2">
                      Solution
                    </div>
                  </div>
                  {/**Contents ======================= */}
                  <div className="w-full bg-transparent rounded-lg">
                    <div className="font-bold  dark:text-slate-400 text-slate-500 justify-between md:items-center w-full flex flex-col md:flex-row relative">
                      <div className="flex w-full h-full items-center justify-end sm:pr-10 pt-2">
                        <span className="flex space-x-2">
                          <span className="text-[0.7rem] dark:text-slate-400 text-slate-700  font-medium">
                            {`${new Date(
                              firstMessage && firstMessage[0]?.closed_time
                            ).toLocaleString()}`}
                          </span>
                        </span>
                      </div>
                    </div>
                    <div className="w-full">
                      <div
                        dangerouslySetInnerHTML={{
                          __html: firstMessage && firstMessage[0]?.solution,
                        }}
                        className="messageContainer dark:text-slate-400 text-slate-700 p-2 text-[0.79rem] tracking-wide dark:marker:text-slate-400 marker:text-slate-800 list-disc"
                      ></div>
                      {/**Play Recording ================================ */}
                      {(firstMessage[0]?.hasRecording === true ||
                        firstMessage[0]?.hasRecording === "true") && (
                        <audio
                          id="rec"
                          controls
                          className="h-[2rem] w-full max-w-[18rem] mt-2 "
                          src={audio}
                          preload="metadata"
                        >
                          <source src={audio} type="audio/ogg" />
                          <source src={audio} type="audio/mpeg" />
                          <source src={audio} type="audio/wav" />
                          <source src={audio} type="audio/mp3" />
                          Your browser does not support the
                          <code>audio</code> element.
                        </audio>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )
          }
          {/**Placeholders ======================== */}
          {(!threadId || threadMessages.length <= 0) && (
            <>
              <h2 className="dark:text-slate-400 text-slate-600 tracking-wide text-center mt-10 uppercase text-xs font-sans font-bold">
                select any ticket to start the conversation
              </h2>
              <img
                src={noChatImg}
                alt="No Ticket"
                className="w-full h-[15rem] mt-10 object-contain object-center"
              />
            </>
          )}
          {/**End of Messages ============================ */}
        </div>
      </div>

      {/**Reply ====================================== */}
      <div className="h-[30%] w-full bg-transparent pt-6 flex items-center justify-end">
        <div className="h-full w-full relative shadow-md rounded dark:bg-slate-800 bg-white border border-slate-300 dark:border-slate-700 before:content-[''] before:absolute before:tooltip_bottom before:left-[5rem] before:h-[20px] before:w-[20px] before:bg-inherit before:border before:border-t-inherit before:border-l-inherit before:border-r-transparent before:border-b-transparent before:rotate-45">
          <form
            onSubmit={(e) => sendReply(e)}
            className="w-full h-full bg-transparent rounded-lg flex flex-col justify-between overflow-hidden z-[999]"
          >
            <div className="w-full h-[70%]">
              <div className="h-[9.5rem] w-full bg-transparent rounded resize-none text-sm dark:text-slate-400 text-slate-700 transition-all  dark:placeholder:text-slate-600 placeholder:text-slate-500 placeholder:text-sm overflow-hidden">
                <TextEditor
                  setReply={setReply}
                  value={value}
                  onChange={onChange}
                />
              </div>
            </div>
            {/**Reply options ======================= */}
            <div className="h-[30%] max-h-[2.5rem] min-h-[2.5rem] p-[0.15rem] px-[0.2rem] w-full flex justify-between items-center">
              <div className="h-full flex items-center">
                {/**Canned Response ========================================= */}
                <div className="group w-8 h-8 rounded-l-sm border border-r-0 border-slate-200 dark:border-[#33415596] flex justify-center items-center text-base outline-none focus:outline-none text-slate-700 dark:text-slate-400 relative">
                  <abbr title="Canned Response">
                    <BiCommentDetail className="text-base hover:opacity-80" />
                  </abbr>
                  <div className="group-hover:flex hidden absolute bottom-[100%] left-0 w-[11rem] h-[9rem] pb-1">
                    <div className="rounded bg-white dark:bg-slate-800 z-[999] border dark:border-slate-700 border-slate-300 p-2 w-full h-full overflow-hidden shadow-xl">
                      <div className="w-full h-6 bg-inherit border-b dark:border-slate-700 border-slate-300 px-2 overflow-hidden">
                        <input
                          type="search"
                          onChange={(e) => {
                            setCannedSearch(e.target.value);
                          }}
                          value={cannedSearch}
                          placeholder="Quick Search ..."
                          className="outline-none focus:outline-none focus:border-0 focus:ring-0 h-full w-full bg-inherit border-0 text-xs text-center placeholder:text-slate-600 dark:placeholder:text-slate-500 dark:text-slate-400 text-slate-800"
                        />
                      </div>
                      <ul className="mt-1 min-h-full w-full flex flex-col p-2 space-y-1 overflow-hidden dark:text-slate-400 text-slate-700 text-xs font-semibold">
                        {templates.length >= 1 &&
                          templates.map((template, index) => {
                            return (
                              <li
                                onClick={() => {
                                  setReply({
                                    ...reply,
                                    message: template.message,
                                  });
                                  onChange(template.message);
                                }}
                                className={`capitalize hover:opacity-80 border-b border-slate-200 dark:border-slate-700 p-1 overflow-hidden overflow-ellipsis whitespace-nowrap min-h-10 cursor-default ${
                                  template?.name
                                    ?.toLowerCase()
                                    .replace(/\s/g, "")
                                    .includes(
                                      cannedSearch
                                        ?.toLowerCase()
                                        .replace(/\s/g, "")
                                    )
                                    ? ""
                                    : "hidden"
                                }`}
                                key={index}
                              >
                                {index + 1}. {template.name}
                              </li>
                            );
                          })}
                      </ul>
                    </div>
                  </div>
                </div>
                {/**Upload Recordings ========================================= */}
                <abbr title="Upload Your Recording">
                  <label
                    htmlFor="replyRecording"
                    className="w-8 h-8 border border-r-0 border-slate-200 dark:border-[#33415596] flex justify-center items-center text-base outline-none focus:outline-none hover:opacity-80 text-slate-700 dark:text-slate-400 cursor-pointer"
                  >
                    <BiMicrophone className="text-base" />
                    <input
                      type="file"
                      id="replyRecording"
                      accept=".wav"
                      name="replyRecording"
                      title="Upload Recording"
                      onChange={(e) => {
                        let target: any = e.target; //<-- This (any) will tell compiler to shut up!
                        let content: any = target.files[0];
                        setFile(content);
                      }}
                      className="outline-none focus:outline-none hidden"
                    />
                  </label>
                </abbr>
                {/**Change Status ========================================= */}
                <abbr title="Change Status">
                  <select
                    ref={statusSelectionRef}
                    onChange={(e) => {
                      setReply({ ...reply, status: e.target.value });
                    }}
                    required
                    className="w-24 md:w-28 h-8 rounded-r-sm border border-slate-200 dark:border-[#33415596] bg-white dark:bg-slate-800 flex justify-center items-center outline-none focus:outline-none focus:ring-0 focus:border-slate-300 dark:focus:border-slate-800 hover:opacity-80 text-slate-700 dark:text-slate-400 text-xs font-medium capitalize pt-1"
                  >
                    <option
                      className="p-2"
                      value={firstMessage[0]?.status || "Status"}
                    >
                      {firstMessage[0]?.status || "Status"}
                    </option>
                    <option className="p-2" value="open">
                      open
                    </option>
                    <option className="p-2" value="on hold">
                      on hold
                    </option>
                    <option className="p-2" value="solved">
                      solved
                    </option>
                    <option className="p-2" value="reopened">
                      reopened
                    </option>
                  </select>
                </abbr>
              </div>
              <div className="flex space-x-2 items-center">
                <button
                  type="submit"
                  className="h-8 outline-none focus:outline-none focus:ring-1 focus:ring-blue-700 rounded-sm text-lg p-2 px-4 font-medium  text-slate-100 bg-slate-800 dark:bg-blue-700 z-[99] flex items-center space-x-1 hover:opacity-80 transition-all shadow-sm"
                >
                  <span className="text-xs">Send now</span>
                  <BiPaperPlane />
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default MessageThread;
