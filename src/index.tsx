import axios, { AxiosResponse } from "axios";
import { SetStateAction, useCallback, useEffect, useState } from "react";

interface IUserAsync {
  queryFn: <T>() => Promise<T>;
}

export const useAsync = <T,>({ queryFn }: IUserAsync) => {
  const [data, setData] = useState<T>();
  const [error, setError] = useState<string>();
  const [loading, setLoading] = useState(false);

  const runQueryFn = useCallback(() => {
    setLoading(true);
    queryFn<T>()
      .then((response) => {
        setData(response);
      })
      .catch((error: any) => {
        setError(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [queryFn]);

  useEffect(() => {
    runQueryFn();
  }, [runQueryFn]);

  return { data, isError: !!error, error, loading };
};
