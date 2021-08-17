import axios from 'axios';
import { useEffect, useState } from 'react';
import { Song } from '../../entities/Song';

export const Songs = () => {
  const [records, setRecords] = useState<Song[]>([]);
  const path = 'songs';

  const fetch = async () => {
    const result = await axios.get<Song[]>(`http://localhost:4000/${path}`);
    setRecords(result.data);
  };

  useEffect(() => {
    fetch();
  }, []);

  return (
    <table>
      <tr>
        <th>Title</th>
        <th>Artist</th>
      </tr>
      {records.map((record) => (
        <tr key={record.id}>
          <td>{record.title}</td>
          <td>{record.artist}</td>
        </tr>
      ))}
    </table>
  );
};
