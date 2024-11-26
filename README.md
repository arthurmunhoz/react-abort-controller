# react-abort-controller

This lib provides a custom React hook (<b>useAbortController</b>) to help you cancel your pending requests when needed.

```Scenario example: Imagine your users trigger a costly api call and while they wait they change their mind and trigger the same api with different parameters (api concurrency!), or even navigate out of that screen unmounting your component.```

The hook automatically cancels pending requests if your component unmounts. It also provides an abort controller and a function to give you more control over the request, helping prevent memory leaks and improving the performance of your application.


## Installation

```bash
npm install react-abort-controller
```

## Usage

The <b>useAbortController</b> hook will provide you two things:
- controller: Instance of AbortController. In order to control your request, you'll need to pass the controller signal to it;
- abort: A function that cancels the request with the controller's signal.

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
