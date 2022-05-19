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
      className="h-full w-full border-0 bg-inherit text-inherit rounded-none relative overflow-hidden"
      classNames={{
        toolbar:
          "bg-white dark:bg-slate-800 flex justify-center items-center w-full text-slate-700 dark:text-slate-400 border-slate-200 dark:border-slate-700 rounded-none sticky top-0",
        toolbarInner:
          "bg-inherit text-inherit border-slate-300 dark:border-slate-700",
        toolbarGroup:
          "bg-inherit text-inherit border-slate-300 dark:border-slate-700",
        toolbarControl:
          "bg-inherit text-inherit border-slate-300 dark:border-slate-700  dark:hover:bg-slate-700 hover:bg-slate-100",
        root: "replyEditor h-[9.8rem] py-2 overflow-hidden overflow-y-scroll no-scrollbar no-scrollbar::-webkit-scrollbar border",
      }}
      controls={[
        ["bold", "italic", "underline", "code", "blockquote"],
        ["unorderedList", "orderedList", "h1", "h2", "h3"],
        ["sup", "sub", "strike", "image"],
        ["alignLeft", "alignCenter", "alignRight", "link"],
      ]}
    />
  );
};
export default TextEditor;
