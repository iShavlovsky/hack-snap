import type { GridColDef } from '@mui/x-data-grid';
import { DataGrid } from '@mui/x-data-grid';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

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
const SmallRow = 140;

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

const ChartOrders: React.FC = () => {
  const [rows, setRows] = useState<Row[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    axios
      .get('/api/your-endpoint')
      .then((response) => {
        const data = response.data.list.map((item: any, index: number) => ({
          id: index + 1, // Пример, генерация id
          date: new Date(item.ts).toLocaleDateString(),
          time: new Date(item.ts).toLocaleTimeString(),
          type: item.side,
          totalUSD: item.amountUSD,
          priceUSD: item.priceUSD0,
          totalWETH: item.amount0,
          priceWETH: item.price0,
          totalWBTC: item.amount1,
          creator: item.maker,
        }));
        setRows(data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        setError('Failed to fetch data. Please try again later.');
      });
  }, []);

  return (
    <div style={{ height: 400, width: '100%' }}>
      {error ? (
        <div>{error}</div>
      ) : (
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
          sx={{
            '& .MuiDataGrid-columnHeaderCheckbox, .MuiDataGrid-cellCheckbox': {
              display: 'none',
            },
            '& .MuiSvgIcon-root': {
              fontSize: '2rem',
            },
            '& .MuiButtonBase-root': {
              padding: '1rem',
            },
            '& .MuiDataGrid-cell': {
              fontSize: '1.7rem',
            },
            '& .MuiSelect-select': {
              fontSize: '1.7rem',
              lineHeight: '160%',
            },
            '& .MuiTablePagination-actions': {
              display: 'flex',
              gap: '.5rem',
            },
          }}
        />
      )}
    </div>
  );
};

export default ChartOrders;
