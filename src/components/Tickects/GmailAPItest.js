import React from "react";
import useFetch from "../../Custom-Hooks/useFetch";

const apiLink =
  "https://script.google.com/macros/s/AKfycbxFRyiEr9oT9hUcIM6MHLy95ag9MkOdkqnDZL37vBcKaZ1BIOsuynNDevkgfFdM1gl6/exec";

const GmailAPItest = () => {
  const { data: emails} = useFetch(apiLink);
  console.log(emails);

  //Loop Through
  const data = [
    {
      id: "17e894ec4365ee2f",
      threadSubject:
        "[Firebase] Your Cloud Firestore database has insecure rules",
      messages: [
        "Firebase branding logo\r\n\r\n\r\n\r\nDial n Dine Leave DataBase\r\n\r\n[Firebase] Your Cloud Firestore database has insecure rules\r\n\r\n\r\n\r\nWe've detected the following issue(s) with your security rules:\r\n\r\nany user can read your entire database\r\nany user can write to your entire database\r\n\r\n\r\n\r\nBecause your project does not have strong security rules, anyone can access  \r\nyour entire database. Attackers can steal, modify, or delete your data, and  \r\nthey can drive up your bill.\r\nAnalysis is run daily. If you've modified your rules in the last 24 hours  \r\nthat may not be accounted for.\r\n\r\n\r\nInsecure Rules\r\n\r\n\r\nDial n Dine Leave DataBase\r\n\r\n\r\nDatabase\r\n\r\n(default)\r\n\r\n\r\nLearn moreEdit rules\r\n\r\n\r\nIf you have questions or feel you've received this message in error, please  \r\ncontact Firebase support\r\n\r\nThanks for using Firebase!\r\n\r\n\r\nThis email is notifying you about important service information regarding  \r\nyour Firebase project\r\n\r\n\r\nManage your Alert settings\r\n\r\n\r\nGoogle LLC\r\n1600 Amphitheatre Pkwy\r\nMountain View, CA, 94043 USA\r\n\r\n\r\n\r\n",
      ],
    },
    {
      id: "17e87e0f9c9ec75b",
      threadSubject: "Training review",
      messages: [
        "Good day Ma'am/Sir.\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\nRegards\r\nBusisiwe Sejane\r\n",
      ],
    },
  ];

  const messages =
    data &&
    data.map((message) => {
      return (
        <div key={message.id} className="text-slate-400 p-20 overflow-hidden">
          <h1>{message.threadSubject}</h1>
          <h1>{message.messages[0]}</h1>
        </div>
      );
    });
  return (
    <div className="space-y-4 flex flex-col overflow-y-scroll">{messages}</div>
  );
};

export default GmailAPItest;
