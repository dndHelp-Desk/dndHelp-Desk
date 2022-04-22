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
      className="h-full w-full border-0 bg-inherit text-inherit overflow-hidden overflow-y-scroll no-scrollbar no-scrollbar::-webkit-scrollbar rounded-none"
      classNames={{
        toolbar:
          "bg-inherit flex justify-center items-center w-full text-inherit border-slate-200 dark:border-slate-800 rounded-none",
        toolbarInner:
          "bg-inherit text-inherit border-slate-300 dark:border-slate-700",
        toolbarGroup:
          "bg-inherit text-inherit border-slate-300 dark:border-slate-700",
        toolbarControl:
          "bg-inherit text-inherit border-slate-300 dark:border-slate-700",
        root: "h-[15rem] overflow-hidden overflow-y-scroll",
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
