export { type GetSnapsResponse, type Snap } from './snap';

export type OptionType<T> = {
  label: string;
  value: T;
  fixedNumber?: number;
};
