import axios from 'axios';
import { useEffect, useState } from 'react';
import { Song } from '../../entities/Song';
import { Form } from './Form';

export const Songs = () => {
  const emptySong: Song = {
    title: '',
    artist: '',
  };

  const [records, setRecords] = useState<Song[]>([]);
  const [activeRecord, setActiveRecord] = useState<Song>(emptySong);
  const api = 'http://localhost:4000';
  const path = 'songs';

  const fetch = async () => {
    const result = await axios.get<Song[]>(`${api}/${path}`);
    setRecords(result.data);
  };

  const create = async (song: Song) => {
    await axios.post<Song>(`${api}/${path}`, song);
    fetch();
  };

  const update = async (song: Song) => {
    await axios.put<Song>(`${api}/${path}/${song.id}`, song);
    fetch();
  };

  const remove = async (record: Song) => {
    await axios.delete<Song>(`${api}/${path}/${record.id}`);
    fetch();
  };

  const handleAction = (record: Song) => {
    activeRecord.id ? update(record) : create(record);
    setActiveRecord(emptySong);
  };

  useEffect(() => {
    fetch();
  }, []);

  return (
    <div>
      {JSON.stringify(activeRecord)}
      <Form activeRecord={activeRecord} action={handleAction} />
      <table>
        <thead>
          <tr>
            <th>Edit</th>
            <th>Remove</th>
            <th>Title</th>
            <th>Artist</th>
          </tr>
        </thead>
        <tbody>
          {records.map((record) => (
            <tr key={record.id}>
              <td>
                <button onClick={() => setActiveRecord(record)}>E</button>
              </td>
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
