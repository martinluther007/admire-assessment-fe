import axios from "axios";
import { useState, useEffect } from "react";

const useFetch = (url, token, rerun) => {
  const [datum, setDatum] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (token) {
      setIsLoading(true);
      axios
        .get(url, { headers: { authorization: `Bearer ${token}` } })
        .then((data) => {
          setIsLoading(false);

          setDatum(data);
        })
        .catch((err) => {
          setError(err.response.data.message);
          setIsLoading(false);
        });
    }
  }, [url, token, rerun]);
  return { datum, isLoading, error };
};

export default useFetch;
