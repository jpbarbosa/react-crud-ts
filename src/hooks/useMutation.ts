import axios from 'axios';
import { Record } from '../entities/Record';

export const useMutation = <T extends Record>(
  url: string,
  callback: Function
) => {
  const create = async (record: T) => {
    await axios.post<T>(`${url}`, record);
    callback();
  };

  const update = async (record: T) => {
    await axios.put<T>(`${url}/${record.id}`, record);
    callback();
  };

  const remove = async (record: T) => {
    await axios.delete<T>(`${url}/${record.id}`);
    callback();
  };

  return { create, update, remove };
};
