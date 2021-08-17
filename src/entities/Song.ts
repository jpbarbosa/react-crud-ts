import { Record } from './Record';

export interface Song extends Record {
  title: string;
  artist: string;
}
