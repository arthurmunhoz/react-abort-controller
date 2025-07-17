# react-abort-controller

This is a React library called `react-abort-controller` that provides a custom hook (`useAbortController`) to help cancel pending HTTP requests in React applications.

Key features:

- Automatically cancels requests when components unmount (prevents memory leaks)
Provides manual control to abort requests at any time
Works with any HTTP library that supports AbortController (like axios, fetch)
Helps handle API concurrency issues when users trigger multiple requests
Main export:

- `useAbortController()` hook returns `[controller, abort]` where:
  - `controller`: AbortController instance to pass to HTTP requests
  - `abort`: Function to manually cancel the current request
Use case: Prevents issues when users navigate away or trigger new requests before previous ones complete, improving app performance and preventing race conditions.


## Installation

```bash
npm install react-abort-controller
```

## Usage

Here's a simple example of how to use the `react-abort-controller` in your custom React hook:

```jsx
import React, { useState } from 'react';
import { useAbortController } from 'react-abort-controller';
import axios from "axios";

const useGetItems = () => {
  const [items, setItems] = useState<any | null>(null);
  const [error, setError] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);

  // ===========================================================
  // Load our hook to get the controller and the abort function
  const [controller, abort] = useAbortController();

  const api = async (params: Params) => {

    // =======================================
    // Call 'abort' before making a new call
    abort();

    try {
      setLoading(true);
      setEngagementData(null);
      setError(null);

      const response = (await axios.get(
        "https://example-url.com/items",
        {
          params,
          // =========================================================
          // Don't forget to add the controller signal to the request
          signal: controller.current.signal,
        })
      ) as unknown as any;

      setItems(items);
      setLoading(false);
    } catch (error) {
      if (error.message !== "canceled") {
        setError(error);
        setLoading(false);
      }
    }
  };

  return [api, items, loading, error];
};
```
