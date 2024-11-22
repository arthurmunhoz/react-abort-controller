import { useEffect, useRef } from "react";

const useAbortController = () => {
  const controller = useRef<AbortController | null>(null);

  // This function is used to abort the fetch request if it is still pending
  const abortIfNeeded = () => {
    if (controller.current) {
      controller.current.abort();
    } else {
      controller.current = new AbortController();
    }

    controller.current = new AbortController();
  };

  // This effect is used to abort the fetch request if the component is unmounted
  useEffect(() => {
    return () => {
      if (controller.current) controller.current.abort();
    };
  }, []);

  return { controller, abortIfNeeded };
};

export default useAbortController;
