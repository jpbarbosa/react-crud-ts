import axios from 'axios';
import { useEffect, useState } from 'react';
import { Song } from '../../entities/Song';

const api = 'http://localhost:4000';
const path = 'songs';

const useFetch = () => {
  const [records, setRecords] = useState<Song[]>([]);

  const fetch = async () => {
    const result = await axios.get<Song[]>(`${api}/${path}`);
    setRecords(result.data);
  };

  useEffect(() => {
    fetch();
  }, []);

  return { fetch, records };
};

export const Songs = () => {
  const { fetch, records } = useFetch();

  const create = async () => {
    await axios.post<Song>(`${api}/${path}`, {
      title: 'One',
      artist: 'U2',
    });
    fetch();
  };

  const remove = async (record: Song) => {
    await axios.delete<Song>(`${api}/${path}/${record.id}`);
    fetch();
  };

  return (
    <div>
      <button onClick={create}>Create Song</button>
      <table>
        <thead>
          <tr>
            <th>Remove</th>
            <th>Title</th>
            <th>Artist</th>
          </tr>
        </thead>
        <tbody>
          {records.map((record) => (
            <tr key={record.id}>
              <td>
                <button onClick={() => remove(record)}>X</button>
              </td>
              <td>{record.title}</td>
              <td>{record.artist}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
