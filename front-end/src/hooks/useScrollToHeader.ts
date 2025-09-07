import { useEffect } from "react";
import { scrollTheHeader } from "@/lib/helper";

/**
 * Custom hook that scrolls to the header section when the component mounts
 * Use this on all non-home pages to ensure consistent navigation experience
 */
export const useScrollToHeader = () => {
  useEffect(() => {
    scrollTheHeader();
  }, []);
};

export default useScrollToHeader;
