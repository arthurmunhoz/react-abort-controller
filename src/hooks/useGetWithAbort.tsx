import axios, { AxiosRequestConfig } from 'axios';
import { useCallback, useEffect, useRef, useState } from 'react';

/**
 * This hook is used to fetch data from the given URL with the given config.
 * It also provides a function to abort the fetch request if it is still pending.
 * 
 * @param url string to fetch data from
 * @param config object to pass to the fetch request containing headers, body, params, etc.
 * @returns the api function, the data, the loading state, the error, and the abort function
 */
export const useGetWithAbort = (url: string, config: AxiosRequestConfig) => {

  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState();

  // This ref is used to store the AbortController instance
  const controller = useRef<AbortController | null>(null);

  // This function is used to fetch the data from the given URL.
  const api = useCallback(async () => {
    try {
      setIsLoading(true);

      if (!controller.current) {
        controller.current = new AbortController();
      }

      const response = await axios.get(url, {
        signal: controller.current.signal,
        ...config
      });

      setData(response.data);
      setIsLoading(false);
    }
    catch (error: any) {
      if (error === 'AbortError') {
        console.log('Fetch aborted');
      } else {
        setError(error);
      }

      setIsLoading(false);
    }
  }, [url, config]);

  // This function is used to abort the fetch request if it is still pending
  const abort = () => {
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

  return [api, data, isLoading, error, abort];
};
