import React from "react";

const useClickOutside = (callback: any) => {
  const domRef = React.useRef() as any;
  React.useEffect(() => {
    const handleClick = (e: any) => {
      if (domRef.current && !domRef.current.contains(e.target)) {
        console.log("called");
        callback();
      }
    };
    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, [callback]);

  return domRef;
};

export default useClickOutside;
