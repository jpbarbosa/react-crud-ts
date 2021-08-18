import { Song } from '../../entities/Song';
import { useForm } from '../../hooks/useForm';

interface IProps {
  activeRecord: Song;
  action: Function;
}

export const Form = ({ activeRecord, action }: IProps) => {
  const { formState, handleChange, handleSubmit } = useForm<Song>(
    activeRecord,
    action
  );

  return (
    <form className="form" onSubmit={handleSubmit}>
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
  );
};
