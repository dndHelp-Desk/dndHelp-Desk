import { useEffect, useRef } from "react";

let useClickOutside = (handler:any) => {
  let dropDownRef = useRef<HTMLDivElement|null>(null);

  useEffect(() => {
    let maybeHandler = (event:any) => {
      if (dropDownRef && dropDownRef.current) {
        if (event.target && !dropDownRef.current.contains(event.target)) {
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

export default useClickOutside
