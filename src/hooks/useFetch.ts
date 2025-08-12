import { useEffect, useMemo, useState } from "react";
import axios from "axios";

interface FetchOptions {
  data?: any;
  [key: string]: any;
}

function useFetch<T = any>(url: string, method: string = "GET", options: FetchOptions = {}) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [refreshIndex, setRefreshIndex] = useState(0);

  const optionString = JSON.stringify(options);

  const requestOptions = useMemo(() => {
    const opts = { ...options };
    if (method === "POST" && !opts.data) {
      opts.data = {};
    }
    return opts;
  }, [method, optionString]);

  useEffect(() => {
    const apiCall = async () => {
      setLoading(true);
      setError(null);
      try {
        const { data: response } = await axios({
          url,
          method,
          ...(requestOptions),
        });
        if (!response.success) {
          throw new Error(response.message);
        }
        setData(response);
      } catch (error: any) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    apiCall();
  }, [url, refreshIndex, requestOptions]);

  const refetch = () => {
    setRefreshIndex((prev) => prev + 1);
  };

  return { data, loading, error, refetch };
}

export default useFetch;
