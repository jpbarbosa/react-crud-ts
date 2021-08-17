import { useState, useEffect } from 'react';
import { Song } from '../../entities/Song';
import { useFetch } from '../../hooks/useFetch';
import { useMutation } from '../../hooks/useMutation';
import { Form } from './Form';

export const Songs = () => {
  const emptySong: Song = {
    title: '',
    artist: '',
  };

  const [activeRecord, setActiveRecord] = useState<Song>(emptySong);
  const api = 'http://localhost:4000';
  const path = 'songs';
  const url = `${api}/${path}`;

  const { records, fetch } = useFetch<Song>(url);
  const { create, update, remove } = useMutation<Song>(url, fetch);

  useEffect(() => {
    fetch();
  }, [fetch]);

  const handleAction = (record: Song) => {
    activeRecord.id ? update(record) : create(record);
    setActiveRecord(emptySong);
  };

  return (
    <div>
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
