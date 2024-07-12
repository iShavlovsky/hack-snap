export { type GetSnapsResponse, type Snap } from './snap';

export type OptionType<Type> = {
  label: string;
  value: Type;
  fixedNumber?: number;
};
