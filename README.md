# react-abort-controller

This is a lib that provides a custom React hook to help you cancel your pending requests when needed.

```Scenario example: Imagine your users trigger a costly api call and while they wait they change their mind and trigger the same api with different parameters (api concurrency!), or even navigate out of that screen unmounting your component.```

It provides an AbortController that allows you to easily cancel ongoing HTTP GET requests, and helping to prevent memory leaks and improve the performance of your application. The hook also cancels any ongonig requests if your component unmounts.


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

      const response = (await getItems({
        params,
        // ==========================================
        // Don't forget to add the controller signal
        signal: controller.current.signal,
      })) as unknown as any;

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
