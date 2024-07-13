export { type GetSnapsResponse, type Snap } from './snap';

export type OptionType<Type> = {
  label: string;
  value: Type;
  fixedNumber?: number;
};

export type TableDataItem = {
  amount0: number;
  amount1: number;
  amountUSD: number;
  blockNumber: number;
  curveSide: string;
  maker: string;
  price0: number;
  price1: number;
  priceUSD0: number;
  priceUSD1: number;
  side: string;
  ts: string;
  txHash: string;
};

export type TableDataResp = {
  list: TableDataItem[];
  page: { page: number; size: number; total: number };
};
