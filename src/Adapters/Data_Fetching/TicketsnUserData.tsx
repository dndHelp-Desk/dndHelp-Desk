import { FC, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../Redux/store";
import { getAuth } from "firebase/auth";
import { initializeApp } from "firebase/app";
import {
  addAllMembers,
  setToDo,
  updateCannedRes,
  updatePublicCannedRes,
} from "../../Redux/Slices/UserSlice";
import {
  changeLoadingStatus,
  addAllTickets,
  updateFilteredTickets,
  setContacts,
  loadSettings,
  loadAccounts,
  setCategories,
  setCompanyDetails,
} from "../../Redux/Slices/Tickets_n_Settings_Slice";
import {
  setMessages,
  updateAlert,
} from "../../Redux/Slices/NotificationsSlice";

//Firestore ===================
import {
  initializeFirestore,
  collection,
  onSnapshot,
  getDocs,
  addDoc,
  doc,
  deleteDoc,
  updateDoc,
  enableIndexedDbPersistence,
  CACHE_SIZE_UNLIMITED,
  where,
  query,
} from "firebase/firestore";

//Config Firebase ==================================
const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: "dial-n-dine-help-desk",
  storageBucket: "dial-n-dine-help-desk.appspot.com",
  messagingSenderId: process.env.REACT_APP_MS_ID,
  appId: process.env.REACT_APP_APP_ID,
  measurementId: "G-GZCS9SQW3Z",
};

// Initialize Firebase for auth======================
initializeApp(firebaseConfig);

// init services for firestore =========================
const db = initializeFirestore(initializeApp(firebaseConfig), {
  cacheSizeBytes: CACHE_SIZE_UNLIMITED,
});

// Subsequent queries will use persistence, if it was enabled successfully
enableIndexedDbPersistence(db);
let org = localStorage.getItem("organization_name");

// const loadWorkSpace = setInterval(()=>{
//   if (
//     window.location.pathname === "/login" ||
//     window.location.pathname === "/logIn"
//   ){
//     org = localStorage.getItem("organization_name");
//     console.log("running")
//   }else{
//     clearInterval(loadWorkSpace);
//     console.log("terminated");
//   }
// },1000)

// collection ref
let membersRef: any = org && collection(db, `companies/${org}/members`);
let ticketsRef: any = org && collection(db, `companies/${org}/tickets`);
let contactsRef: any = org && collection(db, `companies/${org}/contacts`);
let settingsRef: any = org && collection(db, `companies/${org}/settings`);
let publicCannedResRef: any =
  org && collection(db, `companies/${org}/cannedResponses`);
let emailAccountsRef: any =
  org && collection(db, `companies/${org}/email_accounts`);
// let email_TemplatesRef: any =
//   org &&
//   collection(db, `companies/${org}/settings/all_settings/email_templates`);
let categoriesRef: any =
  org && collection(db, `companies/${org}/settings/all_settings/categories`);
let companyDetailsRef: any =
  org &&
  collection(db, `companies/${org}/settings/all_settings/company_details`);

//===================================USER===========================================
// Update User Details ================
export const updateUserDetails = (id: string, name: string, bio: string) => {
  let docRef = doc(db, `companies/${org}/members`, id);
  updateDoc(docRef, {
    name: name,
    bio: bio,
  });
};

// Update Agent Online Status ================
export const updateUserStatus = (id: string, status: string) => {
  let docRef = doc(db, `companies/${org}/members`, id);
  updateDoc(docRef, {
    status: status,
  });
};

// Update Agent profileUrl on FireBase Doc ================
export const updateProfileUrl = (id: string, photoUrl: any) => {
  let docRef = doc(db, `companies/${org}/members`, id);
  updateDoc(docRef, {
    photoUrl: photoUrl,
  });
};

// Update User Uid ================
export const updateUID = (id: string, uid: any) => {
  let docRef = doc(db, `companies/${org}/members`, id);
  updateDoc(docRef, {
    uid: uid,
  });
};

// change user active status ================
export const activateUser = (id: string, state: boolean) => {
  let docRef = doc(db, `companies/${org}/members`, id);
  updateDoc(docRef, {
    active: state,
  });
};

// Edit user ================
export const editUser = (
  id: string,
  name: string,
  dept: string,
  access: string,
  active: boolean,
  companies: string
) => {
  let docRef = doc(db, `companies/${org}/members`, id);
  updateDoc(docRef, {
    name: name,
    dept: dept,
    access: access,
    active: active,
    companies: companies,
  });
};

// Delete User ================
export const deleteUser = (id: string) => {
  let docRef = doc(db, `companies/${org}/members`, id);
  deleteDoc(docRef);
};

// New User =================================
export const createUser = (
  name: string,
  dept: string,
  email: string,
  access: string,
  bio: string,
  active: boolean,
  companies: string
) => {
  addDoc(membersRef, {
    name: name,
    dept: dept,
    email: email?.replace(/\s/g, "")?.toLowerCase(),
    access: access,
    bio: bio,
    active: active,
    status: "unavailable",
    photoUrl:
      "https://firebasestorage.googleapis.com/v0/b/dial-n-dine-help-desk.appspot.com/o/faviLight.png?alt=media&token=156086e8-01a6-4d23-8d26-8856a53ea74c",
    companies: companies,
    uid: "",
    createdAt: new Date().getTime(),
  });
};

//===================================NOTIFICATIONS===========================================
// Add Notifications =================================
export const addNotification = (id: any, title: string, message: string) => {
  addDoc(collection(db, `companies/${org}/members/${id}/notifications`), {
    title: title,
    message: message,
    date: Number(new Date().getTime()),
  });
};

//Delete notification ============================
export const deleteNotification = (id: string, user_id: any) => {
  let docRef = doc(db, `companies/${org}/members/${user_id}/notifications`, id);
  deleteDoc(docRef);
};

//===================================CONTACTS MANAGEMENT===========================================
// New Contact =================================
export const newContact = (
  name: string,
  email: string,
  phone: string,
  company: string,
  twitter_handle: string,
  whatsapp_number: string
) => {
  addDoc(contactsRef, {
    name: name,
    email: email,
    phone: phone,
    branch_company: company,
    twitter_handle: twitter_handle,
    whatsapp_number: whatsapp_number,
  });
};

//Edit Contact ========================
export const editContact = (
  id: string,
  name: string,
  email: string,
  phone: string,
  company: string,
  twitter_handle: string,
  whatsapp_number: string
) => {
  let docRef = doc(db, `companies/${org}/contacts`, id);
  updateDoc(docRef, {
    name: name,
    email: email,
    phone: phone,
    branch_company: company,
    twitter_handle: twitter_handle,
    whatsapp_number: whatsapp_number,
  });
};

// Delete Contact ================
export const deleteContact = (id: string) => {
  let docRef = doc(db, `companies/${org}/contacts`, id);
  deleteDoc(docRef);
};

//===================================EMAIL ACCOUNTS MANAGEMENT===========================================
// Update Email Account =================================
export const updateEmailAccount = (
  id: string,
  email: string,
  password: string,
  host: string,
  port: string | number
) => {
  let docRef = doc(db, `companies/${org}/email_accounts`, id);
  updateDoc(docRef, {
    email: email,
    password: password,
    host: host,
    port: port,
  });
};

//New Account ==========================
export const newEmailAccount = (
  name: string,
  email: string,
  password: string,
  host: string,
  port: string | number
) => {
  addDoc(emailAccountsRef, {
    name: name,
    email: email,
    password: password,
    host: host,
    port: port,
  });
};

// Delete Contact ================
export const deleteEmailAccount = (id: string) => {
  let docRef = doc(db, `companies/${org}/email_accounts`, id);
  deleteDoc(docRef);
};

//=================================== Canned Responses===========================================
//Public Canned Response
export const newPublicCannedRes = (name: string, message: string) => {
  addDoc(publicCannedResRef, {
    name: name,
    message: message,
    scope: "public",
  });
};

export const deletePublicCannedRes = (id: string) => {
  let docRef = doc(db, `companies/${org}/cannedResponses`, id);
  deleteDoc(docRef);
};

//Private Canned Response
//New Template ==========================
export const newCannedRes = (id: string, name: string, message: string) => {
  addDoc(collection(db, `companies/${org}/members/${id}/canned_responses`), {
    name: name,
    message: message,
    scope: "private",
  });
};

// Delete Template ================
export const deleteCannedRes = (id: string, userId: string) => {
  let docRef = doc(
    db,
    `companies/${org}/members/${userId}/canned_responses`,
    id
  );
  deleteDoc(docRef);
};

//=================================== Categories ===========================================
//New Category ==========================
export const newCategory = (name: string, turnaround_time: number) => {
  addDoc(collection(db, `companies/${org}/settings/all_settings/categories`), {
    name: name,
    turnaround_time: turnaround_time,
  });
};

// Edit Category ================
export const editCategory = (
  id: string,
  name: string,
  turnaround_time: string
) => {
  let docRef = doc(db, `companies/${org}/settings/all_settings/categories`, id);
  updateDoc(docRef, { name: name, turnaround_time: turnaround_time });
};

// Delete Category ================
export const deleteCategory = (id: string) => {
  let docRef = doc(db, `companies/${org}/settings/all_settings/categories`, id);
  deleteDoc(docRef);
};

//===================================TICKETS===========================================
// Resolve Ticket Ticket  ================
export const feedBack = (id: string, feedback: string) => {
  let docRef = doc(db, `companies/${org}/tickets`, id);
  updateDoc(docRef, {
    feedback: feedback,
  });
};

export const resolveTicket = (
  id: string,
  solution: string,
  hasRecording: boolean
) => {
  let docRef = doc(db, `companies/${org}/tickets`, id);
  updateDoc(docRef, {
    status: "solved",
    solution: solution,
    closed_time: Number(new Date().getTime()),
    hasRecording: hasRecording,
  });
};

// Change Reopen Ticket ================
export const reOpenTicket = (id: string) => {
  let docRef = doc(db, `companies/${org}/tickets`, id);
  updateDoc(docRef, {
    status: "reopened",
    reopened: true,
  });
};

// Change Ticket Status ================
export const changeStatus = (id: string, state: any) => {
  let docRef = doc(db, `companies/${org}/tickets`, id);
  updateDoc(docRef, {
    status: state,
  });
};

// deleting Tickets
export const deleteTicket = (id: string) => {
  const docRef = doc(db, `companies/${org}/tickets`, id);
  deleteDoc(docRef);
};

// Assign Different Agent ================
export const assignAgent = (
  id: string,
  agent: any,
  email: any,
  assigner: any
) => {
  let docRef = doc(db, `companies/${org}/tickets`, id);
  updateDoc(docRef, {
    agent_name: agent,
    agent_email: email,
    assigned: true,
    assignee: agent,
    assigner: assigner,
  });
};

//Add Reply or Send Reply ============
export const addReply = (
  message: string,
  message_position: any,
  ticket_id: any,
  user: any,
  email: any,
  from: any,
  r_name: any,
  r_email: any,
  team: any
) => {
  addDoc(ticketsRef, {
    date: Number(new Date().getTime()),
    from: from,
    user: user,
    user_email: email,
    recipient_name: r_name,
    recipient_email: r_email,
    message: message,
    message_position: message_position,
    ticket_id: ticket_id,
    time: new Date().getTime(),
    readStatus: "delivered",
    team: team,
  });
};

//Mark Message as Seen ============
export const markAsSeen = (id: string, readStatus: string) => {
  let docRef = doc(db, `companies/${org}/tickets`, id);
  updateDoc(docRef, {
    readStatus: readStatus,
  });
};

// New Tickects ==============================
export const addTicket = (
  recipient_name: any,
  recipient_email: any,
  agent: any,
  priority: any,
  category: any,
  branch_company: any,
  message: any,
  state: string,
  date: any,
  ticket_id: any,
  agent_email: any,
  c_name: any,
  c_email: any,
  c_number: any,
  team: any,
  hasRecording: string
) => {
  addDoc(ticketsRef, {
    recipient_name: recipient_name,
    recipient_email: recipient_email,
    message_position: 1,
    priority: priority,
    agent_name: agent,
    date: Number(new Date().getTime()),
    category: category,
    branch_company: branch_company,
    message: message,
    time: `${new Date().getHours()}:${new Date().getMinutes()}`,
    ticket_id: ticket_id,
    status: state,
    due_date: new Date(date).getTime(),
    from: "agent",
    agent_email: agent_email,
    readStatus: "delivered",
    complainant_name: c_name,
    complainant_email:
      c_email === "" || c_email === undefined || !c_email ? "none" : c_email,
    complainant_number: c_number,
    closed_time: state === "solved" ? Number(new Date().getTime()) : "",
    fcr: state === "solved" ? "yes" : "no",
    hasRecording: hasRecording,
    solution: state === "solved" ? message : "",
    reopened: false,
    assigned: true,
    assignee: agent,
    assigner: agent,
    team: team,
    origin: "Help Desk",
  });
};

//Component ==================================
const TicketsnUserData: FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const currentUser: any | null = getAuth().currentUser;
  const member_details = useSelector(
    (state: RootState) => state.UserInfo.member_details
  );
  const ticketsComponentDates = useSelector(
    (state: RootState) => state.Tickets.ticketsComponentDates
  );
  const alerts = useSelector(
    (state: RootState) => state.NotificationsData.alerts
  );

  //Company Details Data Fetching ======================
  useEffect(() => {
    getDocs(companyDetailsRef).then((snapshot) => {
      dispatch(
        setCompanyDetails(
          snapshot.docs.map((doc: { data: () => any; id: any }) => ({
            ...doc.data(),
            id: doc.id,
          }))[0]
        )
      );
    });
  }, [dispatch]);

  useEffect((): any => {
    return (
      //Members Data Fetching
      org &&
        onSnapshot(membersRef, (snapshot: { docs: any[] }) => {
          dispatch(
            addAllMembers(
              snapshot.docs
                .map((doc: { data: () => any; id: any }) => ({
                  ...doc.data(),
                  id: doc.id,
                }))
                .sort(
                  (
                    a: { name: string | number },
                    b: { name: string | number }
                  ) => (a.name < b.name ? -1 : 1)
                )
            )
          );
        }),
      //Contacts Data Fetching ======================
      org &&
        onSnapshot(contactsRef, (snapshot: { docs: any[] }) => {
          if (member_details[0]?.access !== "client") {
            dispatch(
              setContacts(
                snapshot.docs.map((doc: { data: () => any; id: any }) => ({
                  ...doc.data(),
                  id: doc.id,
                }))
              )
            );
          }
        }),
      //Settings Data Fetching ======================
      org &&
        onSnapshot(settingsRef, (snapshot: { docs: any[] }) => {
          if (member_details[0]?.access !== "client") {
            dispatch(
              loadSettings(
                snapshot.docs.map((doc: { data: () => any; id: any }) => ({
                  ...doc.data(),
                  id: doc.id,
                }))
              )
            );
          }
        }),
      //Categories Data Fetching ======================
      org &&
        onSnapshot(categoriesRef, (snapshot: { docs: any[] }) => {
          dispatch(
            setCategories(
              snapshot.docs.map((doc: { data: () => any; id: any }) => ({
                ...doc.data(),
                id: doc.id,
              }))
            )
          );
        })
    );
  }, [dispatch, member_details, currentUser?.email]);

  //Load Tickets Based On Acess Level =========
  useEffect((): any => {
    //Tickects Data Fetching ======================
    if (member_details.length >= 1 && member_details[0]?.access === "admin") {
      return onSnapshot(
        query(
          ticketsRef,
          where("message_position", "==", 1),
          where(
            "date",
            ">=",
            new Date(ticketsComponentDates.startDate).getTime()
          ),
          where(
            "date",
            "<=",
            new Date(Number(ticketsComponentDates.endDate) + 86400000).getTime()
          )
        ),
        (snapshot: { docs: any[] }) => {
          dispatch(
            updateFilteredTickets(
              snapshot.docs.map((doc: { data: () => any; id: any }) => ({
                ...doc.data(),
                id: doc.id,
              }))
            )
          );
        }
      );
    } else if (
      member_details.length >= 1 &&
      member_details[0]?.access === "client"
    ) {
      return onSnapshot(
        query(
          ticketsRef,
          where("message_position", "==", 1),
          where(
            "date",
            ">=",
            new Date(ticketsComponentDates.startDate).getTime()
          ),
          where(
            "date",
            "<=",
            new Date(Number(ticketsComponentDates.endDate) + 86400000).getTime()
          )
        ),
        (snapshot: { docs: any[] }) => {
          dispatch(
            updateFilteredTickets(
              snapshot.docs
                .map((doc: { data: () => any; id: any }) => ({
                  ...doc.data(),
                  id: doc.id,
                }))
                .filter((data) =>
                  member_details[0]?.companies
                    .split(",")
                    .some(
                      (msg: any) =>
                        msg?.toLowerCase()?.replace(/\s/g, "") ===
                        data?.branch_company?.toLowerCase()?.replace(/\s/g, "")
                    )
                )
            )
          );
        }
      );
    } else if (
      member_details.length >= 1 &&
      member_details[0].access === "agent"
    ) {
      return onSnapshot(
        query(
          ticketsRef,
          where("message_position", "==", 1),
          where(
            "date",
            ">=",
            new Date(ticketsComponentDates.startDate).getTime()
          ),
          where(
            "date",
            "<=",
            new Date(Number(ticketsComponentDates.endDate) + 86400000).getTime()
          )
        ),
        (snapshot: { docs: any[] }) => {
          dispatch(
            updateFilteredTickets(
              snapshot.docs
                .map((doc: { data: () => any; id: any }) => ({
                  ...doc.data(),
                  id: doc.id,
                }))
                ?.filter(
                  (data) =>
                    data.agent_email?.replace(/\s/g, "")?.toLowerCase() ===
                    member_details[0]?.email?.replace(/\s/g, "")?.toLowerCase()
                )
            )
          );
        }
      );
    }
  }, [
    ticketsComponentDates.endDate,
    ticketsComponentDates.startDate,
    dispatch,
    member_details,
  ]);

  //Load All Messages Based On Acess Level =========
  useEffect((): any => {
    return (
      //Tickects Data Fetching ======================
      org &&
      onSnapshot(
        query(
          ticketsRef,
          where(
            "date",
            ">=",
            new Date(ticketsComponentDates.startDate).getTime()
          ),
          where(
            "date",
            "<=",
            new Date(Number(ticketsComponentDates.endDate) + 86400000).getTime()
          )
        ),
        (snapshot: { docs: any[] }) => {
          dispatch(changeLoadingStatus(true));
          dispatch(
            addAllTickets(
              snapshot.docs
                .map((doc: { data: () => any; id: any }) => ({
                  ...doc.data(),
                  id: doc.id,
                }))
                .filter(
                  (data) =>
                    new Date(data.date).getTime() >=
                      new Date(ticketsComponentDates.startDate).getTime() &&
                    new Date(data.date).getTime() <=
                      new Date(
                        new Date(
                          Number(ticketsComponentDates.endDate) + 86400000
                        ).setDate(
                          new Date(
                            Number(ticketsComponentDates.endDate) + 86400000
                          ).getDate() + 1
                        )
                      ).getTime()
                )
            )
          );
          dispatch(changeLoadingStatus(false));
        },
        (error) => {
          dispatch(
            updateAlert([
              ...alerts,
              {
                message: error.message,
                color: "bg-red-200",
                id: new Date().getTime(),
              },
            ])
          );
          dispatch(changeLoadingStatus(false));
        }
      )
    );
  }, [
    ticketsComponentDates.endDate,
    ticketsComponentDates.startDate,
    dispatch,
    alerts,
  ]);

  //Load Email_Accounts ====================
  useEffect(() => {
    return onSnapshot(emailAccountsRef, (snapshot: { docs: any[] }) => {
      if (member_details[0]?.access !== "client") {
        dispatch(
          loadAccounts(
            snapshot.docs.map((doc: { data: () => any; id: any }) => ({
              ...doc.data(),
              id: doc.id,
            }))
          )
        );
      }
    });
  }, [dispatch, member_details]);

  //Private Canned Responses ================
  useEffect(() => {
    return onSnapshot(
      collection(
        db,
        `companies/${org}/members/${member_details[0]?.id}/canned_responses`
      ),
      (snapshot: { docs: any[] }) => {
        if (member_details[0]?.access !== "client") {
          dispatch(
            updateCannedRes(
              snapshot.docs.map((doc: { data: () => any; id: any }) => ({
                ...doc.data(),
                id: doc.id,
              }))
            )
          );
        }
      }
    );
  }, [member_details, dispatch]);

  //Public Canned Responses ==========
  useEffect(() => {
    return onSnapshot(publicCannedResRef, (snapshot: { docs: any[] }) => {
      if (member_details[0]?.access !== "client") {
        dispatch(
          updatePublicCannedRes(
            snapshot.docs.map((doc: { data: () => any; id: any }) => ({
              ...doc.data(),
              id: doc.id,
            }))
          )
        );
      }
    });
  }, [member_details, dispatch]);

  //Todo CollectionRef and Notifications ====================
  useEffect(() => {
    let toDoRef: any | null =
      org &&
      member_details.length >= 1 &&
      collection(db, `companies/${org}/members/${member_details[0].id}/to-do`);
    let notificationsRef: any | null =
      org &&
      member_details.length >= 1 &&
      collection(
        db,
        `companies/${org}/members/${member_details[0].id}/notifications`
      );
    return member_details.length >= 1
      ? member_details[0].id &&
          (onSnapshot(toDoRef, (snapshot: { docs: any[] }) => {
            dispatch(
              setToDo(
                snapshot.docs.map((doc: { data: () => any; id: any }) => ({
                  ...doc.data(),
                  id: doc.id,
                }))
              )
            );
          }),
          onSnapshot(notificationsRef, (snapshot: { docs: any[] }) => {
            dispatch(
              setMessages(
                snapshot.docs.map((doc: { data: () => any; id: any }) => ({
                  ...doc.data(),
                  id: doc.id,
                }))
              )
            );
          }))
      : "";
  }, [dispatch, member_details]);
  return <></>;
};

export default TicketsnUserData;
