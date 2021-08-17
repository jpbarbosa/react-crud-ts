import axios from 'axios';
import { useState } from 'react';
import { Record } from '../entities/Record';

export const useFetch = <T extends Record>(url: string) => {
  const [records, setRecords] = useState<T[]>([]);

  const fetch = async () => {
    const result = await axios.get<T[]>(url);
    setRecords(result.data);
  };

  return { fetch, records };
};
