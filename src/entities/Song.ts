import { Record } from './Record';

export interface Song extends Record {
  title: string;
  artist: string;
}

export const emptyRecord: Song = {
  title: '',
  artist: '',
};

export const path = 'songs';
