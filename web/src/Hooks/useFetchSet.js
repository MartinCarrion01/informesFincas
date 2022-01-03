import { useState, useEffect } from "react";
import axios from "axios";

export const useFetchSet = (url) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const getData = async () => {
      try {
        const res = await axios.get(url, { withCredentials: true });
        setLoading(false);
        setData(res.data);
      } catch (error) {
        setLoading(false);
        setError(error.response);
      }
    };
    getData();
  }, [url]);

  const update = async () => {
    setLoading(true);

    try {
      const res = await axios.get(url, { withCredentials: true });
      setLoading(false);
      setData(res.data);
    } catch (error) {
      setLoading(false);
      setError(error.response);
    }
  };
  return { data, error, loading, update, setData, setError };
};
