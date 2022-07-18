import React, { FC, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  newContact,
  editContact,
} from "../../Adapters/Data_Fetching/TicketsnUserData";
import { updateAlert } from "../../Redux/Slices/NotificationsSlice";
import { AppDispatch, RootState } from "../../Redux/store";
import { isEmail } from "../../Reusable Functions/Reusable_Func";

interface Props {
  contactModal: any;
  setModal: any;
  newContactValue: any;
  setValue: any;
  edit: any;
  setEdit: any;
  phoneChipValid: any;
  setPhoneValid: any;
  emailChipValid: any;
  setEmailValid: any;
}

const NewContact: FC<Props> = ({
  contactModal,
  setModal,
  newContactValue,
  setValue,
  edit,
  setEdit,
  phoneChipValid,
  setPhoneValid,
  emailChipValid,
  setEmailValid,
}) => {
  const dispatch: AppDispatch = useDispatch();
  const alerts = useSelector(
    (state: RootState) => state.NotificationsData.alerts
  );
  const [emailChipValue, setEmail] = useState<string>("");
  const [phoneChipValue, setPhone] = useState<string>("");

  //Add new Contact  =======================
  const handleNewContact = (e: React.SyntheticEvent) => {
    e.preventDefault();
    if (
      newContactValue?.email?.length > 3 &&
      newContactValue?.contact.length > 3
    ) {
      if (edit) {
        editContact(
          newContactValue?.contact_id,
          newContactValue?.name,
          newContactValue?.email,
          newContactValue?.phoneNumber,
          newContactValue?.company,
          newContactValue?.twitter_handle,
          newContactValue?.whatsapp_number
        );
        dispatch(
          updateAlert([
            ...alerts,
            {
              message: "Contact has been edited Successfully",
              color: "bg-green-200",
              id: new Date().getTime(),
            },
          ])
        );
        setValue({
          name: "",
          email: "",
          phoneNumber: "",
          company: "",
          twitter_handle: "",
          whatsapp_number: "",
          contact_id: "",
        });
        setModal(false);
        setEdit(false);
        setPhoneValid(false);
        setEmailValid(false);
      } else if (!edit) {
        newContact(
          newContactValue?.name,
          newContactValue?.email,
          newContactValue?.phoneNumber,
          newContactValue?.company,
          newContactValue?.twitter_handle,
          newContactValue?.whatsapp_number
        );
        dispatch(
          updateAlert([
            ...alerts,
            {
              message: "New Contact Has Been Added Successfully",
              color: "bg-green-200",
              id: new Date().getTime(),
            },
          ])
        );
        setValue({
          name: "",
          email: "",
          phoneNumber: "",
          company: "",
          twitter_handle: "",
          whatsapp_number: "",
          contact_id: "",
        });
        setModal(false);
        setEdit(false);
        setPhoneValid(false);
        setEmailValid(false);
      }
    } else {
      dispatch(
        updateAlert([
          ...alerts,
          {
            message: "Please make sure all fields are added correctly",
            color: "bg-red-200",
            id: new Date().getTime(),
          },
        ])
      );
    }
  };

  //Component ==========
  return (
    <div
      className={`bg-[#0813227e] fixed z-[999] ${
        contactModal ? "left-0" : "left-[200%]"
      } flex justify-end top-[-1rem] bottom-0 right-0 transition-all duration-300 min-h-screen min-w-screen`}
    >
      {/**Add new Contact =========================================== */}
      <form
        action=""
        onSubmit={(e) => handleNewContact(e)}
        className="h-full w-[33rem] dark:bg-slate-900 bg-white border-l border-slate-500 dark:border-slate-700  shadow-2xl flex flex-col justify-between space-y-2 overflow-hidden"
      >
        <div className="w-full h-[calc(100%-3.5rem)] p-6">
          <div className=" w-full h-fit overflow-hidden">
            <h3 className="mt-4 text-lg dark:text-slate-400 text-slate-800 capitalize font-bold font-sans flex items-center space-x-2">
              <span>add new contact</span>
            </h3>
            <p className="mt-2 text-[0.8rem] dark:text-slate-400 text-slate-800 font-sans">
              Contacts help you speed up your agents productivity without punch
              in customers or clients details all the time.When someone reaches
              out to you, they become a contact in your account or you can
              manually do that below.
            </p>
          </div>
          <div className="mt-6 w-full h-[75%] overflow-hidden overflow-y-scroll px-4 space-y-4 dark:autofill:bg-slate-900">
            <div className="w-full">
              <label
                htmlFor="name"
                className="h-11 w-full min-w-[15rem] rounded-sm relative"
              >
                <span className="text-sm dark:text-slate-400 text-slate-800 font-sans">
                  Full name <span className="text-red-600">*</span>
                </span>
                <input
                  type="text"
                  name="name"
                  id="name"
                  autoComplete="nope"
                  placeholder="Enter the name of your contact"
                  required
                  onChange={(e) =>
                    setValue({ ...newContactValue, name: e.target.value })
                  }
                  value={newContactValue?.name}
                  className="contact_input"
                />
              </label>
            </div>

            {/***Email=========================== */}
            <div className="w-full">
              <label
                htmlFor="email"
                className="h-11 w-full min-w-[15rem] rounded-sm relative"
              >
                <span className="text-sm dark:text-slate-400 text-slate-800 font-sans">
                  Email Address <span className="text-red-600">*</span>{" "}
                  <i className="text-xs">
                    (seperate multiple emails by a comma)
                  </i>
                </span>
                <input
                  type="email"
                  name="email"
                  id="email"
                  multiple
                  autoComplete="nope"
                  placeholder="Enter email or emails seperated by a comma"
                  onChange={(e) => {
                    if (
                      !newContactValue.email?.toLowerCase()?.includes(",") &&
                      !emailChipValid
                    ) {
                      setValue({
                        ...newContactValue,
                        email: e.target.value,
                      });
                    }
                    setEmail(e.target.value);
                  }}
                  onKeyDown={(e) => {
                    if (["Enter", "Tab", ",", "/", "Space"].includes(e.key)) {
                      e.preventDefault();
                      setEmailValid(true);
                      if (
                        newContactValue.email
                          ?.toLowerCase()
                          ?.includes(emailChipValue?.toLowerCase()) &&
                        newContactValue.email?.toLowerCase()?.includes(",")
                      ) {
                        dispatch(
                          updateAlert([
                            ...alerts,
                            {
                              message: "The Email is on the list already",
                              color: "bg-red-200",
                              id: new Date().getTime(),
                            },
                          ])
                        );
                      } else if (
                        newContactValue.email
                          ?.toLowerCase()
                          ?.includes(emailChipValue?.toLowerCase()) &&
                        !newContactValue.email?.toLowerCase()?.includes(",")
                      ) {
                        setEmail("");
                      } else {
                        if (isEmail(emailChipValue)) {
                          if (newContactValue.email?.length >= 4) {
                            setValue({
                              ...newContactValue,
                              email:
                                newContactValue.email + "," + emailChipValue,
                            });
                            setEmail("");
                          } else {
                            setValue({
                              ...newContactValue,
                              email: emailChipValue,
                            });
                            setEmail("");
                          }
                        } else {
                          dispatch(
                            updateAlert([
                              ...alerts,
                              {
                                message: "Please enter a valid email",
                                color: "bg-red-200",
                                id: new Date().getTime(),
                              },
                            ])
                          );
                        }
                      }
                    }
                  }}
                  value={emailChipValue}
                  className="contact_input"
                />
              </label>
            </div>

            {/**Added Emails Chips ===================== */}
            <div className="flex flex-wrap w-full h-[4.35rem] p-2 gap-1 border border-slate-300 dark:border-slate-800 bg-slate-50 dark:bg-slate-800 rounded overflow-hidden overflow-y-scroll no-scrollbar no-scrollbar::-webkit-scrollbar">
              {newContactValue?.email?.trim()?.length >= 3 &&
                newContactValue?.email
                  ?.trim()
                  ?.split(/[/,]/)
                  ?.map((email: string) => {
                    return (
                      <div
                        key={email}
                        className="h-6 w-24 rounded-full border border-slate-300 dark:border-slate-600 dark:bg-slate-700 bg-slate-100 text-slate-700 dark:text-slate-200 flex items-center justify-between space-x-1 overflow-hidden text-xs p-1 pl-2 cursor-default"
                      >
                        <span className="w-20 overflow-hidden overflow-ellipsis whitespace-nowrap">
                          <abbr title={email}>{email}</abbr>
                        </span>
                        <button
                          onClick={() => {
                            setValue({
                              ...newContactValue,
                              email: newContactValue?.email
                                ?.split(/[/,]/)
                                ?.filter((elem: string) => elem !== email)
                                ?.join(","),
                            });
                          }}
                          type="button"
                          className="w-4 h-full outline-none focus:outline-none font-bold border-l border-slate-400 flex justify-center items-center text-red-600"
                        >
                          &times;
                        </button>
                      </div>
                    );
                  })}
            </div>
            {/**Added Emails Chips ===================== */}

            {/**Phone Number ================= */}
            <div className="w-full">
              <label
                htmlFor="number"
                className="h-11 w-full min-w-[15rem] rounded-sm relative"
              >
                <span className="text-sm dark:text-slate-400 text-slate-800 font-sans">
                  Phone numbers <span className="text-red-600">*</span>{" "}
                  <i className="text-xs">
                    (seperate multiple numbers by a comma)
                  </i>
                </span>
                <input
                  type="tel"
                  name="number"
                  id="number"
                  autoComplete="off"
                  onChange={(e) => {
                    if (
                      !newContactValue.phoneNumber
                        ?.toLowerCase()
                        ?.includes(",") &&
                      !phoneChipValid
                    ) {
                      setValue({
                        ...newContactValue,
                        phoneNumber: e.target.value,
                      });
                    }
                    setPhone(e.target.value?.replace(/\s/g, ""));
                  }}
                  onKeyDown={(e) => {
                    if (
                      [
                        "Enter",
                        "Tab",
                        ",",
                        "/",
                        ".",
                        "-",
                        "|",
                        "Space",
                      ].includes(e.key)
                    ) {
                      e.preventDefault();
                      setPhoneValid(true);
                      if (
                        newContactValue.phoneNumber
                          ?.toLowerCase()
                          ?.includes(phoneChipValue?.toLowerCase()) &&
                        newContactValue.phoneNumber
                          ?.toLowerCase()
                          ?.includes(",")
                      ) {
                        dispatch(
                          updateAlert([
                            ...alerts,
                            {
                              message: "Number is on the list already",
                              color: "bg-red-200",
                              id: new Date().getTime(),
                            },
                          ])
                        );
                      } else if (
                        newContactValue.phoneNumber
                          ?.toLowerCase()
                          ?.includes(phoneChipValue?.toLowerCase()) &&
                        !newContactValue.phoneNumber
                          ?.toLowerCase()
                          ?.includes(",")
                      ) {
                        setPhone("");
                      } else {
                        if (newContactValue.phoneNumber?.length >= 4) {
                          setValue({
                            ...newContactValue,
                            phoneNumber:
                              newContactValue.phoneNumber +
                              "," +
                              phoneChipValue,
                          });
                          setPhone("");
                        } else {
                          setValue({
                            ...newContactValue,
                            phoneNumber: phoneChipValue,
                          });
                          setPhone("");
                        }
                      }
                    }
                  }}
                  value={phoneChipValue}
                  placeholder="Enter phone number"
                  className="contact_input"
                />
              </label>
            </div>

            {/**Added Phone Number Chips ===================== */}
            <div className="flex flex-wrap w-full h-[4.35rem] p-2 gap-1 border border-slate-300 dark:border-slate-800 bg-slate-50 dark:bg-slate-800 rounded">
              {newContactValue?.phoneNumber?.trim()?.length >= 3 &&
                newContactValue?.phoneNumber
                  ?.trim()
                  ?.split(/[/,]/)
                  ?.map((phone: string) => {
                    return (
                      <div
                        key={phone}
                        className="h-6 w-24 rounded-full border border-slate-300 dark:border-slate-600 dark:bg-slate-700 bg-slate-100 text-slate-700 dark:text-slate-200 flex items-center justify-between space-x-1 overflow-hidden text-xs p-1 pl-2 cursor-default"
                      >
                        <span className="w-20 overflow-hidden overflow-ellipsis whitespace-nowrap">
                          <abbr title={phone}>{phone}</abbr>
                        </span>
                        <button
                          onClick={() => {
                            setValue({
                              ...newContactValue,
                              phoneNumber: newContactValue?.phoneNumber
                                ?.split(/[/,]/)
                                ?.filter((elem: string) => elem !== phone)
                                ?.join(","),
                            });
                          }}
                          type="button"
                          className="w-4 h-full outline-none focus:outline-none font-bold border-l border-slate-400 flex justify-center items-center text-red-600"
                        >
                          &times;
                        </button>
                      </div>
                    );
                  })}
            </div>
            {/**Added Phone Number Chips ===================== */}

            {/**Company Name =========== */}
            <div className="w-full">
              <label
                htmlFor="company"
                className="h-11 w-full min-w-[15rem] rounded-sm relative"
              >
                <span className="text-sm dark:text-slate-400 text-slate-800 font-sans">
                  Company name <span className="text-red-600">*</span>
                </span>
                <input
                  type="text"
                  name="company"
                  id="company"
                  autoComplete="nope"
                  placeholder="Enter company name"
                  required
                  onChange={(e) =>
                    setValue({ ...newContactValue, company: e.target.value })
                  }
                  value={newContactValue?.company}
                  className="contact_input"
                />
              </label>
            </div>

            {/**Twitter ID =========== */}
            <div className="w-full">
              <label
                htmlFor="twitter"
                className="h-11 w-full min-w-[15rem] rounded-sm relative"
              >
                <span className="text-sm dark:text-slate-400 text-slate-800 font-sans">
                  Twitter handle
                </span>
                <input
                  type="text"
                  name="twitter"
                  id="twitter"
                  autoComplete="nope"
                  placeholder="Enter twitter handle"
                  onChange={(e) =>
                    setValue({
                      ...newContactValue,
                      twitter_handle: e.target.value,
                    })
                  }
                  value={newContactValue?.twitter_handle}
                  className="contact_input"
                />
              </label>
            </div>

            {/**WhatsApp Number =========== */}
            <div className="w-full">
              <label
                htmlFor="whatsapp_number"
                className="h-11 w-full min-w-[15rem] rounded-sm relative"
              >
                <span className="text-sm dark:text-slate-400 text-slate-800 font-sans">
                  WhatsApp number{" "}
                  <i className="text-xs">
                    (include the country code like +27 723 000 0000)
                  </i>
                </span>
                <input
                  type="text"
                  name="whatsapp_number"
                  id="whatsapp_number"
                  autoComplete="nope"
                  pattern="^(\+|00)[1-9][0-9 \-\(\)\.]{7,32}$"
                  title="Include the country code like +27 723 000 0000"
                  placeholder="Include the country code like +27 723 000 0000"
                  onChange={(e) =>
                    setValue({
                      ...newContactValue,
                      whatsapp_number: e.target.value,
                    })
                  }
                  value={newContactValue?.whatsapp_number}
                  className="contact_input"
                />
              </label>
            </div>
          </div>
        </div>

        {/**bottom Option */}
        <div className="w-full h-14 z-[99] border-t border-slate-300 dark:border-slate-800 flex justify-between items-center p-2 px-6 bg-inherit">
          <button
            type="button"
            onClick={() => {
              setValue({
                name: "",
                email: "",
                phoneNumber: "",
                company: "",
                twitter_handle: "",
                whatsapp_number: "",
                contact_id: "",
              });
              setModal(false);
              setEdit(false);
              setPhoneValid(false);
              setEmailValid(false);
            }}
            className="outline-none focus:outline-none text-sm text-slate-700 dark:text-slate-200 font-sans w-28 h-8 dark:bg-slate-800 bg-slate-100 border border-slate-300 dark:border-slate-600 rounded-sm hover:opacity-80 transition-all"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="outline-none focus:outline-none text-sm text-slate-50 font-sans w-28 h-8 dark:bg-blue-700 bg-slate-800 rounded-sm hover:opacity-80 transition-all"
          >
            Add contact
          </button>
        </div>
      </form>
    </div>
  );
};

export default NewContact;
