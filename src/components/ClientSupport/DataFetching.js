import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  addAllTickets,
  loadFrequentlyAsked,
} from "../../Redux/Slices/Tickets_n_Settings_Slice";
//Firestore ===================
import {
  getFirestore,
  collection,
  onSnapshot,
  addDoc,
  doc,
  updateDoc,
} from "firebase/firestore";

// init services for firestore =========================
const db = getFirestore();

// collection ref
let ticketsRef = collection(db, "tickects");
let frequentlyAskedRef = collection(
  db,
  "settings/gz4ykLUf7KIrFhqYXYUF/frequently_asked"
);

//Add Reply or Send Reply ============
export const addClientReply = (message, message_position, ticket_id) => {
  addDoc(ticketsRef, {
    date: new Date().toLocaleDateString(),
    from: "client",
    message: message,
    message_position: message_position,
    ticket_id: ticket_id,
    time: `${new Date().getHours()}:${new Date().getMinutes()}`,
    readStatus: "delivered",
  });
};

//Mark Message as Seen ============
export const markAsSeen = (id, readStatus) => {
  let docRef = doc(db, "tickects", id);
  updateDoc(docRef, {
    readStatus: readStatus,
  });
};

const DataFetching = () => {
  const dispatch = useDispatch();

  //User/Members Data =====================================
  useEffect(() => {
    return (
      //Tickects Data Fetching ======================
      onSnapshot(ticketsRef, (snapshot) => {
        dispatch(
          addAllTickets(
            snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
          )
        );
      }),
      //frequentlyAsked Data Fetching ======================
      onSnapshot(frequentlyAskedRef, (snapshot) => {
        dispatch(
          loadFrequentlyAsked(
            snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
          )
        );
      })
    );
  }, [dispatch]);
  return <></>;
};

export default DataFetching;
