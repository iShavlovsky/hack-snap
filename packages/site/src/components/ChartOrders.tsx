import { Grid, Paper } from '@mui/material';
import styled from 'styled-components';

type ChartOrdersProps = {
  content: {
    title?: string;
  };
};

const Title = styled.h2`
  font-size: ${({ theme }) => theme.fontSizes.large};
  margin-bottom: 1rem;
  ${({ theme }) => theme.mediaQueries.small} {
    font-size: ${({ theme }) => theme.fontSizes.text};
  }
`;

/**
 *
 */

/**
 *
 */
function Orders() {
  return null;
}

export const ChartOrders = ({ content }: ChartOrdersProps) => {
  const { title } = content;
  return (
    <Grid item xs={12}>
      <Title>{title}</Title>
      <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
        <Orders />
      </Paper>
    </Grid>
  );
};
