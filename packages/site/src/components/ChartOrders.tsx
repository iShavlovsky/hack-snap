import type { GridColDef } from '@mui/x-data-grid';
import { DataGrid } from '@mui/x-data-grid';
import * as React from 'react';

type Row = {
  id: number;
  date: string;
  time: string;
  type: string;
  totalUSD: number;
  priceUSD: number;
  totalWETH: number;
  priceWETH: number;
  totalWBTC: number;
  creator: string;
};

const BigRow = 160;
const SmallRow = 90;

const columns: GridColDef[] = [
  { field: 'date', headerName: 'Date', width: SmallRow },
  { field: 'time', headerName: 'Time', width: SmallRow },
  { field: 'type', headerName: 'Type', width: SmallRow },
  {
    field: 'totalUSD',
    headerName: 'Total USD',
    type: 'number',
    width: SmallRow,
  },
  {
    field: 'priceUSD',
    headerName: 'Price $',
    type: 'number',
    width: SmallRow,
  },
  {
    field: 'totalWETH',
    headerName: 'Total WETH',
    type: 'number',
    width: SmallRow,
  },
  {
    field: 'priceWETH',
    headerName: 'Price WETH',
    type: 'number',
    width: SmallRow,
  },
  {
    field: 'totalWBTC',
    headerName: 'Total WBTC',
    type: 'number',
    width: SmallRow,
  },
  { field: 'creator', headerName: 'Creator', width: BigRow },
];

const rows: Row[] = [
  {
    id: 1,
    date: '2024.07.09',
    time: '9:34:35 AM',
    type: 'sell',
    totalUSD: 207663.59,
    priceUSD: 57684.33,
    totalWETH: 67.07,
    priceWETH: 18.63,
    totalWBTC: 3.6,
    creator: '0x804...9',
  },
  {
    id: 2,
    date: '2024.07.09',
    time: '9:34:35 AM',
    type: 'sell',
    totalUSD: 131949.95,
    priceUSD: 57753.62,
    totalWETH: 42.58,
    priceWETH: 18.64,
    totalWBTC: 2.28,
    creator: '0xf1b...a1b',
  },
  {
    id: 3,
    date: '2024.07.09',
    time: '9:34:35 AM',
    type: 'sell',
    totalUSD: 5011.17,
    priceUSD: 57732.33,
    totalWETH: 1.62,
    priceWETH: 18.63,
    totalWBTC: 0.09,
    creator: '0x3C4...6',
  },
  {
    id: 4,
    date: '2024.07.09',
    time: '9:34:47 AM',
    type: 'sell',
    totalUSD: 184781.69,
    priceUSD: 57744.28,
    totalWETH: 59.65,
    priceWETH: 18.63,
    totalWBTC: 3.28,
    creator: '0x804...9',
  },
];

/**
 *
 */

/**
 *
 */
export default function ChartOrders() {
  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        pageSizeOptions={[5, 10]}
        checkboxSelection
      />
    </div>
  );
}
