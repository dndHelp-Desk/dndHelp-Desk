import { useEffect, useRef } from "react";

let useClickOutside = (handler: any, restrict?: string) => {
  let dropDownRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    let maybeHandler = (event: any) => {
      if (dropDownRef && dropDownRef.current) {
        if (event.target && !dropDownRef.current.contains(event.target)) {
          handler();
        } else if (
          event.target &&
          event?.target.tagName?.toLowerCase() === restrict?.toLowerCase()
        ) {
          handler();
        }
      }
    };

    document.addEventListener("mousedown", maybeHandler);

    return () => {
      document.removeEventListener("mousedown", maybeHandler);
    };
  });

  return dropDownRef;
};

export default useClickOutside;
