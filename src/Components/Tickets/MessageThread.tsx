import React, { FC, useState, useRef, useMemo, useEffect } from "react";
import { useScrollIntoView } from "@mantine/hooks";
import { useSelector, useDispatch } from "react-redux";
import { BsFillTrashFill, BsThreeDotsVertical } from "react-icons/bs";
import {
  BiPaperPlane,
  BiMicrophone,
  BiNotepad,
  BiArrowBack,
  BiConversation,
} from "react-icons/bi";
import { HiCheck, HiOutlineArrowSmDown } from "react-icons/hi";
import {
  addReply,
  deleteTicket,
  resolveTicket,
  changeStatus,
  reOpenTicket,
} from "../Data_Fetching/TicketsnUserData";
import { updateAlert } from "../../Redux/Slices/NotificationsSlice";
import { addRecording } from "../Auth/Firebase";
import TextEditor from "./TextEditor";
import { AppDispatch, RootState } from "../../Redux/store";
import CannedResponses from "./Macros/CannedResponses";
import ZoomedImg from "./ZoomedImg";
import Details from "./Details";

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
  const [showDetails, setDetails] = useState<boolean>(false);
  const statusSelectionRef = useRef<HTMLSelectElement>(null);
  const [zoomImg, setZoomed] = useState({
    open: false,
    src: "",
  });
  const threadId = useSelector((state: RootState) => state.Tickets.threadId);
  const [showCanned, setCanned] = useState<boolean>(false);
  const [subject, setSubject] = useState<string>("");
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
  const [recordingFile, setFile] = useState<boolean>(false);
  const user = useSelector((state: RootState) => state.UserInfo.member_details);
  const [value, onChange] = useState<string | any>("<p></p>");
  const [firstMessage, setFirstMesssage] = useState<any>([]);
  const dispatch: AppDispatch = useDispatch();
  const scrollToNone = useRef<HTMLDivElement | any>();
  const { scrollIntoView, targetRef, scrollableRef } = useScrollIntoView<
    HTMLDivElement | any
  >();

  //Filter Thread Messages =====================================
  const threadMessages = useMemo(() => {
    allTickets &&
      setSubject(
        allTickets.filter(
          (ticket) =>
            ticket.ticket_id === threadId && ticket.message_position === 1
        )[0]?.category
      );
    return allTickets
      .filter((ticket) => ticket.ticket_id === threadId)
      .sort((a, b) => {
        return (
          Number(new Date(a.date).getTime()) -
          Number(new Date(b.date).getTime())
        );
      });
  }, [allTickets, threadId]);

  //Thread First Message =====================
  useEffect(() => {
    threadId && filteredTickets.length >= 1
      ? setFirstMesssage(
          filteredTickets.filter((ticket) => ticket.ticket_id === threadId)
        )
      : setFirstMesssage([]);
  }, [filteredTickets, threadId]);

  useEffect(() => {
    setReply((previous) => ({
      ...previous,
      ticket_id: threadId,
      status: firstMessage[0]?.status,
      message_position: threadMessages.length + 1,
    }));
  }, [firstMessage, threadId, threadMessages]);

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

  //Reply State and value ==================================
  const [reply, setReply] = useState<ReplyOptions>({
    message: "<p></p>",
    subject: subject,
    status: "Status",
    message_position: threadMessages.length + 1,
    ticket_id: threadId,
  });

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
        subject: `New Issue Reported Ragarding ${subject} || Ticket-ID: ${threadId}`,
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
                id: new Date().getTime(),
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
                id: new Date().getTime(),
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

    //Check if field are filled then send ======================
    if (
      user[0].name !== "User Loader" &&
      reply.ticket_id !== "none" &&
      reply.status !== "Status" &&
      reply.status !== "" &&
      reply.status !== "solved" &&
      reply.message?.length >= 8
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
      if (user[0]?.access !== "client") {
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
            subject: `New Issue Reported Ragarding ${subject} || Ticket-ID: ${threadId}`,
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
                    message: "Response Has Been Sent.",
                    color: "bg-green-200",
                    id: new Date().getTime(),
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
                    id: new Date().getTime(),
                  },
                ])
              );
            }
          });
      }
      onChange("<p></p>");
      setReply({
        ...reply,
        message: "<p></p>",
        status: firstMessage[0] ? firstMessage[0]?.status : "Status",
      });
    } else if (reply.message?.length < 8) {
      dispatch(
        updateAlert([
          ...alerts,
          {
            message: "Make sure all fields are filled properly",
            color: "bg-yellow-200",
            id: new Date().getTime(),
          },
        ])
      );
    }

    //If There is Solution / Statusis solution send solution / reopen ticket if status is solved
    if (reply.status === "solved" && user[0]?.access !== "client") {
      sendSolution();
      setReply({
        ...reply,
        message: "<p></p>",
        status: firstMessage[0] ? firstMessage[0]?.status : "Status",
      });
      onChange("<p></p>");
    } else if (reply.status === "reopened" && reply.message?.length >= 9) {
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
      reply.status !== "reopened" &&
      reply.message?.length >= 8
    ) {
      changeStatus(firstMessage[0]?.id, reply.status);
      setReply({
        ...reply,
        message: "<p></p>",
        status: firstMessage[0] ? firstMessage[0]?.status : "Status",
      });
    } else if (reply.message?.length < 8) {
      dispatch(
        updateAlert([
          ...alerts,
          {
            message: "Make sure all fields are filled properly",
            color: "bg-yellow-200",
            id: new Date().getTime(),
          },
        ])
      );
    } else if (reply.status === "solved" && user[0]?.access === "client") {
      changeStatus(firstMessage[0]?.id, "reopened");
      reOpenTicket(firstMessage[0]?.id);
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
      setReply({
        ...reply,
        message: "<p></p>",
        status: firstMessage[0] ? firstMessage[0]?.status : "Status",
      });
      dispatch(
        updateAlert([
          ...alerts,
          {
            message: "Response Has Been Sent.",
            color: "bg-green-200",
            id: new Date().getTime(),
          },
        ])
      );
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
            id: new Date().getTime(),
          },
        ])
      );
    }
  };

  //Zoom AttachMent ========================
  const zoomImage = (e: any) => {
    if (e.target?.tagName === "IMG") {
      setZoomed((prev) => ({ ...prev, open: true, src: e.target?.src }));
      document.body.style.overflow = "hidden";
    }
  };

  //Loop Through Each Message In a thread ====================
  const thread =
    threadMessages &&
    threadMessages.map((message, index) => {
      return (
        <div
          ref={threadMessages.length - 1 === index ? targetRef : scrollToNone}
          key={index}
          className="w-full text-slate-400 text-sm leading-6 flex transition-all tracking-wide bg-white dark:bg-slate-800 rounded border border-slate-300 dark:border-[#33415583]"
        >
          {/**Message ====================== */}
          <div className="w-full 2xl:w-full bg-tranparent pl-6  relative">
            <div className="absolute left-[-1rem] top-[-0.25rem] h-[2rem] w-[2rem] rounded-sm border dark:border-slate-700 border-slate-400 dark:bg-slate-800 bg-white px-1 overflow-hidden">
              <div className="w-full h-full dark:bg-slate-800 bg-white dark:text-slate-300 text-slate-900 flex justify-center items-center capitalize font-bold text-base">
                <BiConversation />
              </div>
            </div>
            {/**Contents ======================= */}
            <div className="w-full bg-transparent rounded-lg pt-2 md:pt-0">
              <div className="font-semibold dark:font-medium dark:text-slate-400 text-slate-500 justify-between md:items-center w-full flex flex-col md:flex-row relative">
                <div className="flex items-center dark:text-slate-300 text-slate-900 text-xs">
                  <span className="tracking-normal font-bold capitalize">
                    {message.agent_name}
                    {message.user}
                  </span>
                  <span
                    className={`justify-center items-center space-x-[-0.4rem] ml-1 capitalize text-[0.75rem] text-blue-600 italic h-4 w-6 bg-inherit ${
                      message?.user_email === user[0]?.email ||
                      message?.agent_email === user[0]?.email
                        ? "flex"
                        : "hidden"
                    }`}
                  >
                    <HiCheck />
                    <HiCheck
                      className={`${
                        message?.readStatus !== "read"
                          ? "text-slate-700 dark:text-slate-300"
                          : ""
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
                  {/**Message Options =========================== */}
                  <div className="group relative h-8 w-8 dark:text-slate-400 text-slate-700 flex items-center justify-center cursor-pointer rounded">
                    <BsThreeDotsVertical className="inline" />
                    <div
                      className={`w-[10rem] group-hover:flex flex-col items-center hidden z-[99] shadow-lg border dark:border-slate-800 border-slate-300 dark:bg-slate-700 bg-slate-200 backdrop-blur-sm rounded absolute right-[-0.5rem] top-9 after:contents-[''] after:absolute after:right-3.5 after:top-[-0.5rem] after:bg-inherit after:rotate-45 after:h-4 after:w-4 after:border after:border-inherit after:border-r-0 after:border-b-0`}
                    >
                      <div className="bg-inherit w-full h-full z-[99]  p-4 overflow-hidden rounded">
                        <button className="w-full dark:text-slate-300 text-slate-700 font-semibold text-sm flex justify-between items-center outline-none focus:outline-none">
                          <span>Delete</span>
                          <BsFillTrashFill
                            onClick={() => {
                              if (
                                message?.message_position !== 1 &&
                                message?.user_email === user[0]?.email
                              ) {
                                deleteTicket(message.id);
                              }
                            }}
                            className="hover:text-red-500 cursor-pointer"
                          />
                        </button>
                      </div>
                    </div>
                  </div>
                  {/**Message Options =========================== */}
                </div>
              </div>
              <div className="py-2 dark:text-slate-400 text-slate-700 p-2 text-[13px]">
                {message.message && (
                  <div
                    onClick={(e) => zoomImage(e)}
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
      {/**Zoomed Imag Modal */}
      <ZoomedImg zoomImg={zoomImg} setZoomed={setZoomed} />
      {/**Zoomed Imag Modal */}

      <div className="h-[70%] w-full dark:bg-slate-800 bg-white border dark:border-slate-700 border-slate-400 rounded-none lg:rounded-tr-md pb-2 gap-2 flex flex-col overflow-hidden">
        <div className="h-[3.75rem] bg-inherit sticky py-2 top-0 w-full flex justify-between z-[99] border-b dark:border-[#33415596] border-slate-300 px-2">
          {/**Opened Ticket Details ================================== */}
          <div className="flex justify-between items-center w-full space-x-2 bg-transparent px-3 pl-0">
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

              <div className="hidden relative lg:flex items-center space-x-2 h-[3.5rem]">
                {/**Details  ====================== */}
                <Details
                  showDetails={showDetails}
                  setDetails={setDetails}
                  firstMessage={firstMessage}
                />
                <button
                  onClick={() => setDetails(true)}
                  className="h-7 px-4 outline-none focus:outline-none border border-slate-400 dark:border-slate-700 rounded-sm font-bold dark:text-slate-300 text-slate-800 text-xs bg-gray-100 dark:bg-[#182235] flex justify-center items-center"
                >
                  Details
                </button>
              </div>
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
                onClick={() => scrollIntoView()}
                className="outline-none focus:outline-none text-lg dark:text-slate-400 text-slate-700 capitalize flex items-center justify-end space-x-1"
              >
                <HiOutlineArrowSmDown />
                <span className="text-xs">Jump To Last Message</span>
              </button>
            </div>
          </div>
        </div>

        {/**Thread Messages ============================ */}
        <div
          ref={scrollableRef}
          className="h-full w-[98%] m-auto p-6 flex flex-col gap-3 overflow-y-scroll bg-inherit relative"
        >
          {thread}
          {
            //Final Solution If there is one =====================
            firstMessage && firstMessage[0]?.status === "solved" && (
              <div
                ref={targetRef}
                className="w-full text-slate-400 text-sm leading-6 flex transition-all bg-white dark:bg-slate-800 rounded-sm border border-slate-300 dark:border-[#33415583]"
              >
                {/**Message ====================== */}
                <div className="w-[95%] 2xl:w-full bg-tranparent pl-6 pb-2 relative">
                  <div className="absolute left-[-1rem] top-[-0.25rem] h-[2rem] rounded-sm dark:bg-slate-800 bg-white border dark:border-slate-700 border-slate-400 dark:text-gray-300 text-slate-50 font-medium tracking-widest uppercase text-[0.6rem] overflow-hidden p-[1px]">
                    <div className="w-full h-full dark:bg-slate-800 bg-white rounded-sm  dark:text-gray-300 text-slate-900 flex justify-center items-center uppercase font-bold text-[0.6rem] px-2">
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
                        onClick={(e) => zoomImage(e)}
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
              <div className="m-auto mt-6 w-[80%] h-[20rem] grid grid-rows-6">
                <div className="row-span-4 flex justify-center pt-6 relative">
                  <div className="ml-4 w-[15rem] h-[6.5rem] rounded bg-slate-300 dark:bg-slate-700 flex flex-col space-y-2 justify-center p-6">
                    <div className="h-2 w-2/5 rounded dark:bg-slate-500 bg-slate-700"></div>
                    <div className="h-2 w-full rounded dark:bg-slate-900 bg-slate-100"></div>
                  </div>
                  <div className="absolute bottom-[8%] left-[20%] w-[15rem] h-[6.5rem] rounded bg-slate-200 dark:bg-slate-600 flex flex-col space-y-2 justify-center p-6 shadow-2xl drop-shadow-2xl">
                    <div className="h-2 w-2/5 rounded dark:bg-slate-800 bg-slate-400"></div>
                    <div className="h-2 w-full rounded dark:bg-slate-400 bg-slate-400"></div>
                  </div>
                </div>
                <div className="row-span-2 flex flex-col space-y-2 justify-center items-center">
                  <h3 className="text-slate-800 dark:text-slate-300 text-xl text-center whitespace-nowrap font-semibold">
                    It's nice to see you again
                  </h3>
                  <div className="text-slate-600 dark:text-slate-400 text-sm tracking-tight font-medium text-center whitespace-nowrap leading-5">
                    <p>Pick a ticket from your left list </p>
                    <p>to start a conversation</p>
                  </div>
                </div>
              </div>

              {/**Deco boxes ================================ */}
              <div className="absolute h-14 w-14 rounded bg-slate-100 dark:bg-[#33415569] rotate-12 left-10 bottom-10"></div>
              <div className="absolute h-8 w-8 rounded bg-slate-100 dark:bg-[#33415569] rotate-12 left-10 bottom-40"></div>
              <div className="absolute h-14 w-14 rounded bg-slate-100 dark:bg-[#33415569] rotate-45 right-14 bottom-24"></div>
            </>
          )}
          {/**End of Messages ============================ */}
        </div>
      </div>

      {/**Reply ====================================== */}
      <div className="h-[30%] w-full bg-transparent pt-6 flex items-center justify-end">
        <div className="h-full w-full relative rounded dark:bg-slate-800 bg-white border border-slate-400 dark:border-slate-700 before:content-[''] before:absolute before:tooltip_bottom before:left-[5rem] before:h-[20px] before:w-[20px] before:bg-slate-50 dark:before:bg-[#182235] before:border before:border-t-inherit before:border-l-inherit before:border-r-transparent before:border-b-transparent before:rotate-45 pb-[0.07rem]">
          <form
            onSubmit={(e) => sendReply(e)}
            className="w-full h-full bg-transparent rounded-lg flex flex-col justify-between overflow-hidden z-[999] pt-0"
          >
            <div className="w-full h-[78%]">
              <div className="h-full w-full bg-transparent rounded resize-none text-sm dark:text-slate-400 text-slate-700 transition-all  dark:placeholder:text-slate-600 placeholder:text-slate-500 placeholder:text-sm overflow-hidden pt-0">
                <TextEditor
                  setReply={setReply}
                  value={value}
                  onChange={onChange}
                />
              </div>
            </div>
            {/**Reply options ======================= */}
            <div className="h-[30%] max-h-[2.5rem] min-h-[2.5rem] p-[0.15rem] px-[0.2rem] w-full flex justify-between items-center">
              <div className="h-full flex items-center pr-[0.08rem]">
                {/**Canned Response ========================================= */}
                <div className="w-8 h-8 group rounded-l-sm bg-slate-50 dark:bg-[#182235] border border-r-0 border-slate-400 dark:border-slate-700 flex justify-center items-center text-base  text-slate-700 dark:text-slate-400">
                  <abbr title="Canned Response">
                    <button
                      type="button"
                      onClick={() => {
                        setCanned((prev) => {
                          if (prev === true) {
                            return false;
                          } else {
                            return true;
                          }
                        });
                      }}
                      className="h-full w-full flex items-center justify-center outline-none focus:outline-none"
                    >
                      <BiNotepad className="text-base hover:opacity-80" />
                    </button>
                  </abbr>
                  <CannedResponses
                    setReply={setReply}
                    onChange={onChange}
                    showCanned={showCanned}
                    setCanned={setCanned}
                    position={0.7}
                    tooltipPosition={5}
                  />
                </div>
                {/**Upload Recordings ========================================= */}
                <abbr title="Upload Your Recording">
                  <label
                    htmlFor="replyRecording"
                    className={`w-8 h-8 border ${
                      user[0]?.access === "client"
                        ? "rounded-r-sm"
                        : "border-r-0"
                    } bg-slate-50 dark:bg-[#182235]  border-slate-400 dark:border-slate-700 flex justify-center items-center text-base outline-none focus:outline-none hover:opacity-80 text-slate-700 dark:text-slate-400 cursor-pointer`}
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
                      console.log(e.target.value);
                    }}
                    required
                    className={`w-24 md:w-28 h-8 rounded-r-sm bg-slate-50 dark:bg-[#182235] border border-slate-400 dark:border-slate-700 justify-center items-center outline-none focus:outline-none focus:ring-0 hover:opacity-80 text-slate-700 dark:text-slate-400 text-xs font-medium capitalize pt-1 ${
                      user[0]?.access === "client" ? "hidden" : "flex"
                    }`}
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
              <div className="flex items-center pr-[0.08rem]">
                <button
                  type="submit"
                  className="h-8 outline-none focus:outline-none focus:ring-1 focus:ring-blue-700 rounded-sm text-lg p-2 px-4 font-medium  text-slate-100 bg-slate-800 dark:bg-blue-700 z-[99] flex items-center space-x-1 hover:opacity-80 transition-all  disabled:cursor-not-allowed disabled:opacity-80 shadow-lg"
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
