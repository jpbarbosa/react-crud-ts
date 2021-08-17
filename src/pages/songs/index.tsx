import axios from 'axios';
import { useEffect, useState } from 'react';
import { Song } from '../../entities/Song';
import { useForm } from '../../hooks/useForm';

export const Songs = () => {
  const [records, setRecords] = useState<Song[]>([]);
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

  const remove = async (record: Song) => {
    await axios.delete<Song>(`${api}/${path}/${record.id}`);
    fetch();
  };

  useEffect(() => {
    fetch();
  }, []);

  const emptySong: Song = {
    title: '',
    artist: '',
  };

  const { formState, handleChange, handleSubmit } = useForm<Song>(
    emptySong,
    create
  );

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title</label>
          <input
            type="text"
            name="title"
            onChange={handleChange}
            value={formState.title}
          />
        </div>
        <div>
          <label>Artist</label>
          <input
            type="text"
            name="artist"
            onChange={handleChange}
            value={formState.artist}
          />
        </div>
        <input type="submit" />
      </form>
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
