import { FC, useEffect } from "react";
import { RichTextEditor } from "@mantine/rte";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { useSelector } from "react-redux";
import { RootState } from "../../../Redux/store";

interface Props {
  setReply: (reply: any) => any;
  value: any;
  onChange: any;
  setUploadStatus: any;
}

const TextEditor: FC<Props> = ({
  setReply,
  value,
  onChange,
  setUploadStatus,
}) => {
  const threadId = useSelector((state: RootState) => state.Tickets.threadId);
  const company_details = useSelector(
    (state: RootState) => state.Tickets.company_details
  );

  useEffect(() => {
    setReply((previous: any) => ({ ...previous, message: value }));
    window.localStorage.setItem("threadDraft", value);
  }, [setReply, value]);

  //Upload Files ================================
  const handleImageUpload = (file: File): Promise<string> =>
    new Promise((resolve, reject) => {
      setUploadStatus(true);
      //Upload File if there is one
      const storage = getStorage();
      uploadBytes(
        ref(
          storage,
          `/${company_details.name}/${threadId}+${new Date().getTime()}`
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

  //Component ============================
  return (
    <RichTextEditor
      value={value}
      onImageUpload={handleImageUpload}
      onChange={onChange}
      onKeyDown={(e)=>{
        if(e.key === "/"){
        }
      }}
      id=""
      className="h-full w-full border-0 text-inherit roundedEditor relative overflow-hidden pl-0"
      classNames={{
        toolbar:
          "dark:bg-slate-750 bg-slate-100 flex justify-center items-center  flex-nowrap w-full text-slate-700 dark:text-slate-400 border-b border-slate-300 dark:border-slate-700 roundedEditor sticky p-0  overflow-hidden",
        toolbarInner:
          "dark:bg-slate-750 bg-slate-100 text-inherit border-b border-slate-300 dark:border-slate-700 w-full h-[3.25rem] flex justify-center flex-nowrap overflow-hidden py-1 roundedEditor",
        toolbarGroup:
          "dark:bg-slate-750 bg-slate-100 text-inherit border-0 border-slate-300 dark:border-slate-600 flex justify-between w-full roundedEditor",
        toolbarControl:
          "dark:bg-slate-750 bg-slate-100 text-inherit border-0  dark:hover:bg-slate-800 hover:bg-white rounded",
        root: "replyEditor min-h-[3rem] border h-full py-0 pl-0 overflow-hidden overflow-y-scroll no-scrollbar no-scrollbar::-webkit-scrollbar dark:bg-slate-750 bg-slate-100 roundedEditor",
      }}
      controls={[
        [
          "bold",
          "italic",
          "strike",
          "underline",
          "h1",
          "h2",
          "unorderedList",
          "orderedList",
          "blockquote",
          "code",
          "codeBlock",
          "alignLeft",
          "alignCenter",
          "alignRight",
          "image",
          "video",
          "link",
          "sub",
          "sup",
          "clean",
        ],
      ]}
    />
  );
};
export default TextEditor;
