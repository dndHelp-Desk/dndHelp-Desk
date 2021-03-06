import React, { FC, useState, useRef, useMemo, useEffect } from "react";
import { useScrollIntoView } from "@mantine/hooks";
import { useSelector, useDispatch } from "react-redux";
import { toUpper } from "../../../Reusable Functions/Reusable_Func";
import { BiArrowBack, BiTrash, BiShare, BiDotsVertical } from "react-icons/bi";
import {
  HiCheck,
  HiOutlineArrowSmDown,
  HiThumbUp,
  HiThumbDown,
  HiBadgeCheck,
  HiUser,
} from "react-icons/hi";
import {
  addReply,
  deleteTicket,
  resolveTicket,
  changeStatus,
  reOpenTicket,
  feedBack,
} from "../../../Adapters/Data_Fetching/TicketsnUserData";
import { updateAlert } from "../../../Redux/Slices/NotificationsSlice";
import { addRecording } from "../../Auth/Firebase";
import { AppDispatch, RootState } from "../../../Redux/store";
import ZoomedImg from "./ZoomedImg";
import Details from "./Details";
import HintTooltip from "../../../Components/HintTooltip";
import Reply from "../Reply/Reply";

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
  const publicCannedRes = useSelector(
    (state: RootState) => state.UserInfo.publicCannedResponses
  );
  const threadId = useSelector((state: RootState) => state.Tickets.threadId);
  const allMembers = useSelector(
    (state: RootState) => state.UserInfo.allMembers
  );
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
  const [uploadingStatus, setUploadStatus] = useState<boolean>(false);
  const [recordingFile, setFile] = useState<boolean>(false);
  const user = useSelector((state: RootState) => state.UserInfo.member_details);
  const [value, onChange] = useState<string | any>(
    window.localStorage.getItem("threadDraft") || "<p></p>"
  );
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
      email_accounts?.filter(
        (account) =>
          account.name.toLowerCase() === firstMessage[0]?.team.toLowerCase()
      )[0];

    //Relpy Using Nodemailer ===================
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
        subject: `${toUpper(subject)} || Ticket-ID: ${threadId}`,
        ticket_id: threadId,
        email_body:
          publicCannedRes?.filter((data) => data.name === "solved").length >= 1
            ? `<p     style="color:#0c0c30;font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont , monospace; ;font-size:15px">      Hi ${clientName},   </p>   <h1     style="color:#0c0c30;font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont , monospace; ;font-size:15px">    <b> A ticket with ID: ${threadId} has been Resolved. If you feel unsatisfied by the solution please don't hesitate to cantact us thruogh the links provided below, don't foget to grab your ticket-id.</b>   </h1>   <p     style="color:#0c0c30;font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont,monospace ;line-height:20px;font-size:16px;text-decoration: underline;">     <b>Tickect Details:</b>   </p>   <ul     style="color:#0c0c30;font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont , monospace;line-height:25px">     <li><b>Brand:</b> ${brand}     </li>     <li><b>Tickect-ID:</b> ${threadId}     </li>     <li><b>Closed On:</b> ${new Date().toString()}     </li>     <li><b>Status:</b>       Resolved     </li>   </ul>   <p     style="color:#0c0c30;font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont,monospace ;line-height:20px;font-size:16px;text-decoration: underline;">     <b>Resolution:</b>   </p>   <p     style="color:#0c0c30;font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont,monospace ;line-height:20px;font-size:15px;white-space:normal;overflow:hidden">     ${
                reply.message
              }   </p>   <p style="color:#0c0c30;font-family:Arial, Helvetica, sans-serif;line-height:20px;font-size:14px">     <i>In order to update or respond to this issue please click the button below,</i>   </p>   <p style="color:blue;font-family:Arial, Helvetica, sans-serif;line-height:20px;font-size:14px">     <i> <a target="_blank" href=${`https://www.dndhelp-desk.co.za/support?threadId=${threadId}`}>You can alternatively click here.</a></i>   </p>   <button style="background:#e46823;padding-left:10px;padding-right:10px;padding:15px;border-radius:5px;border-width: 0px;outline-width: 0px;box-shadow: 0px 1px 0px rgba(0, 0, 0.68, 0.2);cursor: pointer;"><a style="text-decoration:none;color:#fff;font-weight: 700" target="_blank" href=${`https://www.dndhelp-desk.co.za/support?threadId=${threadId}`}>Update or Respond Here</a></button>   <p     style="color:#6b7280;font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont,monospace ;line-height:20px;font-size:16px;">     <b>Disclaimer</b>   </p>   <p     style="color:#6b7280;font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont,monospace ;line-height:20px;font-size:15px;white-space:normal;overflow:hidden">     The information contained in this communication from the sender is confidential. It is intended solely for use by     the recipient and others authorized to receive it. If you are not the recipient, you are hereby notified that any     disclosure, copying, distribution or taking action in relation of the contents of this information is strictly     prohibited and may be unlawful.  </p>`
            : reply.message,
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
    } else if (!uploadingStatus) {
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
          threadId,
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
              subject: `${toUpper(subject)} || Ticket-ID: ${threadId}`,
              ticket_id: threadId,
              email_body:
                publicCannedRes?.filter((data) => data.name === "open")
                  .length >= 1
                  ? `<p style="color:#0c0c30;font-family: ui-sans-serif, system-ui, apple-system, BlinkMacSystemFont , monospace; ;font-size:15px">Hi ${clientName},</p><h1 style="color:#0c0c30;font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont , monospace; ;font-size:15px"><b> A ticket with ID: ${threadId} has been updated. In order to reply or update this issues please navigate to the link provided at the bottom, don't foget to grab your ticket-id.</b></h1><pstyle="color:#0c0c30;font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont,monospace ;line-height:20px;font-size:16px;text-decoration: underline;"><b>Tickect Details:</b></p><ulstyle="color:#0c0c30;font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont ,monospace;line-height:25px"> <li><b>Brand:</b> ${brand}</li><li><b>Tickect-ID:</b> ${threadId}</li> <li><b>Due Date:</b> ${new Date(
                      date
                    ).toString()}</li><li><b>Status:</b> ${ticket_status}</li></ul> <p  style="color:#0c0c30;font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont,monospace ;line-height:20px;font-size:16px;text-decoration: underline;"> <b>Feedback:</b> </p> <p style="color:#0c0c30;font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont,monospace ;line-height:20px;font-size:15px;white-space:normal;overflow:hidden">${
                      reply.message
                    }   </p> <p style="color:#0c0c30;font-family:Arial, Helvetica, sans-serif;line-height:20px;font-size:14px"><i>In order to update or respond to this issue please click the button below,</i></p> <p style="color:blue;font-family:Arial, Helvetica, sans-serif;line-height:20px;font-size:14px"> <i> <a target="_blank" href=${`https://www.dndhelp-desk.co.za/logIn`}>You can alternatively click here.</a></i>   </p> <button style="background:#e46823;padding-left:10px;padding-right:10px;padding:15px;border-radius:5px;border-width: 0px;outline-width: 0px;box-shadow: 0px 1px 0px rgba(0, 0, 0.68, 0.2);cursor: pointer;"><a style="text-decoration:none;color:#fff;font-weight: 700" target="_blank" href=${`https://www.dndhelp-desk.co.za/logIn`}>Update or Respond Here</a></button> <p style="color:#6b7280;font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont,monospace ;line-height:20px;font-size:16px;"><b>Disclaimer</b></p> <p style="color:#6b7280;font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont,monospace ;line-height:20px;font-size:15px;white-space:normal;overflow:hidden"> The information contained in this communication from the sender is confidential. It is intended solely for use by     the recipient and others authorized to receive it. If you are not the recipient, you are hereby notified that any     disclosure, copying, distribution or taking action in relation of the contents of this information is strictly prohibited and may be unlawful.</p>`
                  : reply.message,
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
          setReply({
            ...reply,
            message: "<p></p>",
            status: "Status",
          });
          onChange("<p></p>");
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
      scrollIntoView();
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
    threadMessages.map((message: any, index: any) => {
      return (
        <div
          ref={threadMessages.length - 1 === index ? targetRef : scrollToNone}
          key={index}
          className="w-full text-slate-400 text-sm flex justify-between space-x-4 transition-all tracking-wide bg-white dark:bg-slate-800"
        >
          {/**Profile ======================== */}
          <div className="h-[2.35rem] w-[2.5rem] rounded-md border-2 border-slate-400 dark:border-slate-500 dark:bg-slate-800 bg-white overflow-hidden">
            <div className="w-full h-full dark:bg-slate-800 bg-white dark:text-slate-300 text-slate-900 flex justify-center items-center capitalize font-bold text-base">
              {allMembers?.filter(
                (profile) =>
                  profile?.email === message?.user_email ||
                  profile?.email === message?.agent_email
              )[0]?.photoUrl ? (
                <img
                  src={
                    allMembers?.filter(
                      (profile) =>
                        profile?.email === message?.user_email ||
                        profile?.email === message?.agent_email
                    )[0]?.photoUrl
                  }
                  alt="profile"
                  className="object-cover object-center h-full w-full"
                />
              ) : (
                <HiUser />
              )}
            </div>
          </div>
          {/**Message ====================== */}
          <div className="border-t border-slate-100 dark:border-slate-750 w-[calc(100%-2.5rem)] bg-tranparent relative pt-2 md:pt-0">
            {/**Contents ======================= */}
            <div className="font-semibold dark:font-medium dark:text-slate-400 text-slate-500 justify-between md:items-center w-full flex flex-col md:flex-row relative">
              <div className="flex dark:text-slate-300 text-slate-800 text-xs">
                <span className="tracking-normal text-sm font-bold dark:font-medium capitalize font-sans">
                  {message?.agent_name === user[0]?.name
                    ? "You"
                    : message?.agent_name}
                  {message?.user === user[0]?.name ? "You" : message?.user}
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
                  <span className="text-[0.7rem] dark:text-slate-300 text-slate-800 font-medium font-sans">
                    {`${new Date(message?.date).toDateString()}`},{" "}
                    {`${
                      new Date(message?.date).toLocaleString()?.split(",")[1]
                    }`}
                  </span>
                </span>
                {/**Message Options =========================== */}
                <div className="group relative h-8 w-8 dark:text-slate-400 text-slate-700 flex items-center justify-center cursor-pointer rounded">
                  <BiDotsVertical className="inline" />
                  <div
                    className={`w-[10rem] group-hover:flex flex-col items-center hidden z-[99] shadow-lg border dark:border-slate-800 border-slate-300 dark:bg-slate-900 bg-slate-200 backdrop-blur-sm rounded absolute right-[-0.5rem] top-9 after:contents-[''] after:absolute after:right-3.5 after:top-[-0.5rem] after:bg-inherit after:rotate-45 after:h-4 after:w-4 after:border after:border-inherit after:border-r-0 after:border-b-0 p-1 divide-y divide-slate-300 dark:divide-slate-600`}
                  >
                    <div className="bg-inherit hover:bg-slate-100 dark:hover:bg-slate-800 transition-all w-full h-full z-[99]  px-4 py-2 overflow-hidden">
                      <button className="w-full dark:text-slate-300 text-slate-700 font-semibold dark:font-medium text-sm flex justify-between items-center outline-none focus:outline-none">
                        <span>Reply</span>
                        <BiShare className="cursor-pointer" />
                      </button>
                    </div>
                    <div className="bg-inherit hover:bg-slate-100 dark:hover:bg-slate-800 transition-all w-full h-full z-[99]  px-4 py-2 overflow-hidden">
                      <button
                        onClick={() => {
                          if (
                            message?.message_position !== 1 &&
                            message?.user_email === user[0]?.email
                          ) {
                            deleteTicket(message?.id);
                          }
                        }}
                        className="w-full dark:text-slate-300 text-slate-700 font-semibold dark:font-medium text-sm flex justify-between items-center outline-none focus:outline-none"
                      >
                        <span>Delete</span>
                        <BiTrash className="hover:text-red-500 cursor-pointer" />
                      </button>
                    </div>
                  </div>
                </div>
                {/**Message Options =========================== */}
              </div>
            </div>
            <div className="dark:text-slate-400 text-slate-700 text-[13px]">
              {message?.message && (
                <div
                  onClick={(e) => zoomImage(e)}
                  dangerouslySetInnerHTML={{ __html: message?.message }}
                  className="messageContainer dark:marker:text-slate-400 marker:text-slate-800 list-disc"
                ></div>
              )}
            </div>
          </div>
        </div>
      );
    });

  //Component ======================================
  return (
    <div className="h-full flex flex-col w-full bg-transparent overflow-hidden">
      {/**Zoomed Imag Modal */}
      <ZoomedImg zoomImg={zoomImg} setZoomed={setZoomed} />
      {/**Zoomed Imag Modal */}

      <div className="row-span-4 h-full w-full dark:bg-slate-800 bg-white pb-2 space-y-2 flex flex-col overflow-hidden">
        <div className="h-[3.5rem] bg-inherit sticky py-2 top-0 w-full flex justify-between z-[99] border-b dark:border-[#33415596] border-slate-300 px-2">
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
                  className="h-7 px-4 outline-none focus:outline-none border border-slate-400 dark:border-slate-700 rounded-sm font-medium font-sans dark:text-slate-300 text-slate-800 text-sm bg-gray-100 dark:bg-[#182235] flex justify-center items-center"
                >
                  Details
                </button>
              </div>
            </div>

            {/**Subject And Scroll To Last Message Details =========================== */}
            <div className="dark:text-slate-300 text-slate-900 tracking-wide flex items-center space-x-2">
              <div className="grid w-44 overflow-hidden">
                <p className="text-sm font-sans font-medium capitalize text-right whitespace-nowrap overflow-hidden overflow-ellipsis">
                  {firstMessage && firstMessage[0]?.branch_company}
                  {(!threadId || threadMessages.length <= 0) &&
                    "Nothing is selected"}
                </p>{" "}
              </div>
              {/**Scroll to Last Message ================== */}
              <div className="relative group">
                <button
                  onClick={() => scrollIntoView()}
                  className="outline-none focus:outline-none text-lg dark:text-slate-100 text-slate-800 capitalize flex items-center justify-center border dark:border-slate-600 border-slate-300 h-7 w-7 bg-slate-100 dark:bg-slate-600"
                >
                  <HiOutlineArrowSmDown />
                </button>
                <HintTooltip
                  details={"Jump to last message"}
                  positions={{
                    horizontal: `right-0`,
                    vertical: `bottom-[-130%]`,
                  }}
                />
              </div>
            </div>
          </div>
        </div>

        {/**Thread Messages ============================ */}
        <div
          ref={scrollableRef}
          className="h-[calc(100%-3.5rem)] w-[98%] m-auto p-6 flex flex-col space-y-8 overflow-y-scroll bg-inherit relative"
        >
          {thread}
          {
            //Final Solution If there is one =====================
            firstMessage && firstMessage[0]?.status === "solved" && (
              <div
                ref={targetRef}
                className="w-full text-slate-400 text-sm leading-6 flex justify-between space-x-4 transition-all bg-white dark:bg-slate-800 relative"
              >
                <div className="w-[2.5rem] h-[2.3rem] rounded-md border-2 border-slate-400 dark:border-slate-500 dark:bg-slate-800 bg-white dark:text-gray-300 text-slate-50 font-medium tracking-widest uppercase text-[0.6rem] overflow-hidden">
                  <div className="w-full h-full bg-inherit text-green-600 fill-green-600 flex justify-center items-center uppercase font-bold text-xl rounded-sm">
                    <HiBadgeCheck />
                  </div>
                </div>

                {/**Message ====================== */}
                <div className="rounded-sm border-t border-slate-100 dark:border-slate-750 w-[calc(100%)] bg-tranparent relative">
                  {/**Contents ======================= */}
                  <div className="font-bold  dark:text-slate-400 text-slate-500 justify-between md:items-center w-full flex flex-col md:flex-row relative">
                    <div className="w-full h-full dark:text-slate-300 text-slate-800 text-xs flex flex-col justify-start items-start space-y-2 md:flex-row md:space-y-0 md:justify-between  py-1 sm:pr-10 pt-2">
                      <span className="tracking-normal text-sm dark:font-medium font-bold capitalize font-sans">
                        Solution
                      </span>
                      <span className="flex space-x-2">
                        <span className="text-[0.7rem] dark:text-slate-300 text-slate-800 font-medium font-sans">
                          {`${new Date(
                            firstMessage && firstMessage[0]?.closed_time
                          ).toDateString()}`}
                          ,{" "}
                          {`${
                            new Date(
                              firstMessage && firstMessage[0]?.closed_time
                            )
                              .toLocaleString()
                              ?.split(",")[1]
                          }`}
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
                      className="messageContainer dark:text-slate-400 text-slate-700 text-[0.79rem] tracking-wide dark:marker:text-slate-400 marker:text-slate-800 list-disc"
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

                  {/**Ratings =================== */}
                  <div className="flex items-center space-x-2 h-8 w-28 absolute top-[105%] left-0 text-slate-500 dark:text-slate-400">
                    <div className="relative group">
                      <button
                        onClick={() => {
                          firstMessage[0]?.recipient_email
                            ?.toLowerCase()
                            ?.includes(user[0]?.email) &&
                            feedBack(firstMessage[0]?.id, "like");
                        }}
                        className={`h-7 w-7 rounded border border-slate-300 dark:border-[#33415583] dark:bg-slate-800 bg-white flex justify-center items-center hover:text-blue-700 transition-all text-base ${
                          firstMessage[0]?.feedback === "like"
                            ? "text-blue-700"
                            : ""
                        }`}
                      >
                        <HiThumbUp />
                      </button>
                      <HintTooltip
                        details={"Helpful"}
                        positions={{
                          horizontal: `left-0`,
                          vertical: `bottom-[120%]`,
                        }}
                      />
                    </div>
                    <div className="relative group">
                      <button
                        onClick={() => {
                          firstMessage[0]?.recipient_email
                            ?.toLowerCase()
                            ?.includes(user[0]?.email) &&
                            feedBack(firstMessage[0]?.id, "dislike");
                        }}
                        className={`h-7 w-7 rounded border border-slate-300 dark:border-[#33415583] dark:bg-slate-800 bg-white flex justify-center items-center hover:text-red-600 transition-all text-base ${
                          firstMessage[0]?.feedback === "dislike"
                            ? "text-red-600"
                            : ""
                        }`}
                      >
                        <HiThumbDown />
                      </button>
                      <HintTooltip
                        details={"Not helpful"}
                        positions={{
                          horizontal: `left-0`,
                          vertical: `bottom-[120%]`,
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            )
          }
          {/**Placeholders ======================== */}
          {(!threadId || threadMessages.length <= 0) && (
            <>
              <div className="m-auto w-[80%] h-full flex flex-col justify-center space-y-8 place-content-center">
                <div className="flex flex-col items-center justify-center relative">
                  <div className="ml-16 w-[15rem] h-[6.5rem] rounded bg-slate-300 dark:bg-slate-700 flex flex-col space-y-2 justify-center p-6">
                    <div className="h-2 w-2/5 rounded dark:bg-slate-500 bg-slate-700"></div>
                    <div className="h-2 w-full rounded dark:bg-slate-900 bg-slate-100"></div>
                  </div>
                  <div className="mt-[-2rem] w-[15rem] h-[6.5rem] rounded bg-slate-200 dark:bg-slate-600 flex flex-col space-y-2 justify-center p-6 shadow-lg drop-shadow-sm">
                    <div className="h-2 w-2/5 rounded dark:bg-slate-800 bg-slate-400"></div>
                    <div className="h-2 w-full rounded dark:bg-slate-400 bg-slate-400"></div>
                  </div>
                </div>
                <div className="first-letter:flex flex-col space-y-2 justify-center items-center">
                  <h3 className="text-slate-700 dark:text-slate-300 text-xl text-center whitespace-nowrap font-semibold">
                    It's nice to see you again
                  </h3>
                  <div className="text-slate-600 dark:text-slate-400 text-sm tracking-tight font-medium text-center whitespace-nowrap leading-5">
                    {threadMessages.length <= 0 ? (
                      <>
                        <p>There are no tickets under the current view, </p>
                        <p>or you don't have access.</p>
                      </>
                    ) : (
                      <>
                        <p>Pick a ticket from your left list </p>
                        <p>to start a conversation</p>
                      </>
                    )}
                  </div>
                </div>
              </div>

              {/**Deco boxes ================================ */}
              <div className="absolute h-14 w-14 rounded bg-slate-100 dark:bg-slate-750 rotate-12 left-10 bottom-10"></div>
              <div className="absolute h-8 w-8 rounded bg-slate-100 dark:bg-slate-750 rotate-12 left-10 bottom-40"></div>
              <div className="absolute h-14 w-14 rounded bg-slate-100 dark:bg-slate-750 rotate-45 right-14 bottom-24"></div>
            </>
          )}
          {/**End of Messages ============================ */}
        </div>
      </div>

      {/**Reply ====================================== */}
      <Reply
        setReply={setReply}
        value={value}
        onChange={onChange}
        setUploadStatus={setUploadStatus}
        sendReply={sendReply}
        setFile={setFile}
        statusSelectionRef={statusSelectionRef}
        firstMessage={firstMessage}
        reply={reply}
      />
    </div>
  );
};

export default MessageThread;
