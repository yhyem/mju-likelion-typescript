import { useState, useEffect } from 'react';
import axios from 'axios';

interface axiosRequest {
  url: string;
}

const useAxios = ({ url }: axiosRequest) => {
  const [data, setData] = useState<[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(url, {
          headers: {
            accept: 'application/json',
            Authorization: `Bearer ${process.env.REACT_APP_API_KEY}`,
          },
        });
        setData(response.data.results);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url]);

  return { data, loading };
};

export default useAxios;
