# fetch-with-abort-controller-hook

This is a lib that provides a custom React hook that simplifies calling and managing states of an API.
It include a AbortController that allows you to easily cancel ongoing HTTP GET requests, and helping to prevent memory leaks and improve the performance of your application. The hook also cancels any ongong requests if your component unmounts.

## Installation

```bash
npm install fetch-with-abort-controller-hook
```

## Usage

Here's a simple example of how to use the `fetch-with-abort-controller-hook` in your React component:

```jsx
import React, { useEffect } from 'react';
import { useFetchWithAbort } from 'axios-abort-controller-hook';
import axios from "axios";

const ItemsList = () => {
  const [page, setPage] = useState(0);

  const params = useMemo(() => {
    return {
      page,
      amount: 20,
    }
  }, [page]);

  const api = useCallback(() => {
    return axios.get("https://example-url.com/items", params)
  }, [params];

  const { data, isLoading, error, abort } = useFetchWithAbort(api);

  return (
    <div>
      {isLoading && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}
      {data && (
        <ul>
          {data.items.map(item => (
            <li key={item.id}>{item.name}</li>
          ))}
        </ul>
      )}
      
      <button onClick={() => setPage(prevPage => prevPage + 1)}>Next Page</button>
      <button onClick={abort}>Cancel Request</button>
    </div>);
  )
}
