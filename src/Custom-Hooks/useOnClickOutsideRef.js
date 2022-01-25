import { useEffect, useRef } from "react";

let useClickOutside = (handler) => {
  let dropDownRef = useRef();

  useEffect(() => {
    let maybeHandler = (event) => {
      if (!dropDownRef.current.contains(event.target)) {
        handler();
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
