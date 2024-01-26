import { useState, useEffect, useCallback, useRef } from "react";

interface FetchResult<T> {
  data: T | null;
  loading: boolean;
  error: Error | null;
}

export const useFetch = <T>(url: string): FetchResult<T> => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const abortController = useRef(new AbortController());

  const handleError = (error: Error) => {
    if (error.name !== "AbortError") {
      setLoading(false);
      setError(error);
      console.error(error);
    }
  };

  const fetchData = useCallback(async () => {
    try {
      const response = await fetch(url, {
        signal: abortController.current.signal,
      });
      if (!response.ok) {
        throw new Error(
          `No se pudo obtener la información de la URL: ${response.status} ${response.statusText}`
        );
      }
      const data = await response.json();
      setData(data);
      setLoading(false);
    } catch (error) {
      handleError(error);
    }
  }, [url]);

  useEffect(() => {
    fetchData();
    return () => {
      abortController.current.abort();
    };
  }, [fetchData]);

  return { data, loading, error };
};

