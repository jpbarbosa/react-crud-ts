import { useState } from 'react';
import { Song, emptyRecord, path } from '../../entities/Song';
import { useFetch } from '../../hooks/useFetch';
import { useMutation } from '../../hooks/useMutation';
import { Form } from './Form';

export const Songs = () => {
  const [activeRecord, setActiveRecord] = useState<Song>(emptyRecord);
  const api = 'http://localhost:4000';
  const url = `${api}/${path}`;

  const { records, fetch } = useFetch<Song>(url);

  const mutationCallback = () => {
    fetch();
    setActiveRecord({ ...emptyRecord });
  };

  const { create, update, remove } = useMutation<Song>(url, mutationCallback);

  const action = activeRecord.id ? update : create;

  return (
    <div>
      <Form activeRecord={activeRecord} action={action} />
      <table className="list">
        <thead>
          <tr>
            <th className="action">Edit</th>
            <th className="action">Remove</th>
            <th>Title</th>
            <th>Artist</th>
          </tr>
        </thead>
        <tbody>
          {records.map((record) => (
            <tr
              key={record.id}
              className={record.id === activeRecord.id ? 'active' : ''}
            >
              <td className="action">
                <button
                  onClick={() => setActiveRecord(record)}
                  className="bt-edit"
                >
                  E
                </button>
              </td>
              <td className="action">
                <button onClick={() => remove(record)} className="bt-remove">
                  X
                </button>
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
