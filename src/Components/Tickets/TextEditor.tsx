import { FC, useEffect } from "react";
import { RichTextEditor } from "@mantine/rte";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { useSelector } from "react-redux";
import { RootState } from "../../Redux/store";

interface Props {
  setReply: (reply: any) => any;
  value: any;
  onChange: any;
}

const TextEditor: FC<Props> = ({ setReply, value, onChange }) => {
  const threadId = useSelector((state: RootState) => state.Tickets.threadId);
  const company_details = useSelector(
    (state: RootState) => state.Tickets.company_details
  );

  useEffect(() => {
    setReply((previous: any) => ({ ...previous, message: value }));
  }, [setReply, value]);

  //Upload Files ================================
  const handleImageUpload = (file: File): Promise<string> =>
    new Promise((resolve, reject) => {
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
        })
        .catch(() => reject(new Error("Upload failed")));
    });

  //Component ============================
  return (
    <RichTextEditor
      value={value}
      onImageUpload={handleImageUpload}
      onChange={onChange}
      id=""
      className="h-full w-full border-0 bg-white dark:bg-slate-800 text-inherit rounded-none relative overflow-hidden pl-0"
      classNames={{
        toolbar:
          "bg-white dark:bg-slate-800 flex justify-center items-center w-full text-slate-700 dark:text-slate-400 border-b border-slate-300 dark:border-slate-700 rounded-none sticky p-0 py-1  overflow-hidden",
        toolbarInner:
          "bg-slate-50 dark:bg-[#182235] text-inherit border-b border-slate-300 dark:border-slate-700 w-full h-full flex justify-center pl-0",
        toolbarGroup:
          "bg-inherit text-inherit border-0 border-slate-300 dark:border-slate-600 rounded-sm",
        toolbarControl:
          "bg-inherit text-inherit border-0  dark:hover:bg-slate-600 hover:bg-white rounded-sm",
        root: "replyEditor h-full py-2 pt-0 pl-0 overflow-hidden overflow-y-scroll no-scrollbar no-scrollbar::-webkit-scrollbar bg-white dark:bg-slate-800",
      }}
      controls={[
        [
          "bold",
          "italic",
          "h1",
          "unorderedList",
          "blockquote",
          "orderedList",
          "code",
          "strike",
          "underline",
          "alignLeft",
          "alignCenter",
          "alignRight",
          "image",
          "video",
          "link",
          "clean",
        ],
      ]}
    />
  );
};
export default TextEditor;
