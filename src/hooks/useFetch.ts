import axios from 'axios';
import { useState, useEffect, useCallback } from 'react';
import { Record } from '../entities/Record';

export const useFetch = <T extends Record>(url: string) => {
  const [records, setRecords] = useState<T[]>([]);

  const fetch = useCallback(async () => {
    const result = await axios.get<T[]>(url);
    setRecords(result.data);
  }, [url]);

  useEffect(() => {
    fetch();
  }, [fetch]);

  return { fetch, records };
};
