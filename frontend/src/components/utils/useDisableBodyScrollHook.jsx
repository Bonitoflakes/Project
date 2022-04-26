import { useEffect } from "react";

const useDisableBodyScroll = (boolVal) => {
  useEffect(() => {
    if (boolVal) {
      document.body.style.overflow = "hidden";
    }
    return () => (document.body.style.overflow = "unset");
  }, [boolVal]);
};

export { useDisableBodyScroll };
