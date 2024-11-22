import { useEffect, useRef, useState } from 'react';

/**
 * This hook is used to fetch data using the provided async function.
 * It also provides a function to abort the fetch request if it is still pending.
 * 
 * @param fetchFunction async function to fetch data
 * @returns the api function, the data, the loading state, the error, and the abort function
 */
export const useFetchWithAbort = <T,>(fetchFunction: () => Promise<T>) => {

  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  // This ref is used to store the AbortController instance
  const controller = useRef<AbortController | null>(null);

  // This function is used to fetch the data using the provided async function.
  const api: () => void = () => {
    setIsLoading(true);

    if (!controller.current) {
      controller.current = new AbortController();
    }

    fetchFunction()
      .then((response) => {
        setData(response);
        setIsLoading(false);
      }).catch((error: Error) => {
        if (error.name === 'AbortError') {
          console.log('Fetch aborted');
        } else {
          setError(error);
        }
        setIsLoading(false);
      });
  }

  // This function is used to abort the fetch request if it is still pending
  const abort: () => void = () => {
    if (controller.current) {
      controller.current.abort();
      setIsLoading(false);
    }

    controller.current = new AbortController();
  };

  // This effect is used to abort the fetch request if the component is unmounted
  useEffect(() => {
    return () => {
      if (controller.current)
        controller.current.abort();
    };
  }, []);

  return [api, data, isLoading, error, abort] as const;
};
