import type { GridColDef } from '@mui/x-data-grid';
// eslint-disable-next-line import/no-extraneous-dependencies
import { DataGrid } from '@mui/x-data-grid';
import * as React from 'react';
import styled from 'styled-components';

import type { TableDataResp } from '../types';

const BigRow = 210;
const SmallRow = 140;

// export type TableDataItem = {
//   amount0: number;
//   amount1: number;
//   amountUSD: number;
//   blockNumber: number;
//   curveSide: string;
//   maker: string;
//   price0: number;
//   price1: number;
//   priceUSD0: number;
//   priceUSD1: number;
//   side: string;
//   ts: string;
//   txHash: string;
// };

const columns: GridColDef[] = [
  { field: 'ts', headerName: 'Date/Time', width: BigRow },
  { field: 'side', headerName: 'Type', width: SmallRow },
  {
    field: 'priceUSD1',
    headerName: 'Total USD',
    type: 'number',
    width: SmallRow,
  },
  {
    field: 'priceUSD0',
    headerName: 'Price $',
    type: 'number',
    width: SmallRow,
  },
  {
    field: 'price1',
    headerName: 'Total WETH',
    type: 'number',
    width: SmallRow,
  },
  {
    field: 'price0',
    headerName: 'Price WETH',
    type: 'number',
    width: SmallRow,
  },
  {
    field: 'amount1',
    headerName: 'Total WBTC',
    type: 'number',
    width: SmallRow,
  },
  { field: 'maker', headerName: 'Creator', width: BigRow },
];

const Description = styled.div`
  margin-top: 1rem;
`;

type ChartOrderProps = {
  data: TableDataResp | undefined;
  isPending?: boolean;
};

const chartOrders = ({ data, isPending }: ChartOrderProps) => {
  console.log('333', data?.list);
  return (
    <div style={{ height: 400, width: '100%' }}>
      {isPending && data ? (
        <Description>Loading...</Description>
      ) : (
        <DataGrid
          rows={data?.list ?? []}
          columns={columns}
          getRowId={(row) => row.txHash}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 5 },
            },
          }}
          pageSizeOptions={[5, 10]}
          checkboxSelection
          sx={{
            '& .MuiDataGrid-columnHeaderCheckbox, .MuiDataGrid-cellCheckbox': {
              display: 'none', // Размер шрифта ячеек данных
            },
            '& .MuiSvgIcon-root': {
              fontSize: '2rem', // Размер шрифта ячеек данных
            },
            '& .MuiButtonBase-root': {
              padding: '1rem', // Размер шрифта ячеек данных
            },
            '& .MuiDataGrid-cell': {
              fontSize: '1.7rem', // Размер шрифта ячеек данных
            },
            '& .MuiSelect-select': {
              fontSize: '1.7rem',
              lineHeight: '160%', // Размер шрифта ячеек данных
            },
            '& .MuiTablePagination-actions': {
              display: 'flex',
              gap: '.5rem', // Размер шрифта ячеек данных
            },
          }}
        />
      )}
    </div>
  );
};
export default chartOrders;
