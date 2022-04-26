import { useEffect } from "react";

const useDisableBodyScroll = (...params) => {
  useEffect(() => {
    console.log("body scroll effect running...");
    let [a, b, c] = params;
    if (a || b || c) {
      // console.error(`Value of the state : ${boolVal}`);
      document.body.style.overflow = "hidden";
    }
    return () => {
      console.log("cleanup running...");
      document.body.style.overflow = "unset";
    };
  }, [params]);
};

export { useDisableBodyScroll };
