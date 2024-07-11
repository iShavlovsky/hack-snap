import { Grid, Paper } from '@mui/material';
import styled from 'styled-components';

import Chart from './Chart';

type ChartIndicatorsProps = {
  content: {
    title?: string;
  };
};

const Title = styled.h2`
  font-size: ${({ theme }) => theme.fontSizes.large};
  margin: 0 0 1rem 0;
  ${({ theme }) => theme.mediaQueries.small} {
    font-size: ${({ theme }) => theme.fontSizes.text};
  }
`;

/**
 *
 */

export const ChartIndicators = ({ content }: ChartIndicatorsProps) => {
  const { title } = content;
  return (
    <Grid>
      {title && <Title>{title}</Title>}
      <Paper
        sx={{
          borderRadius: 5,
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          mb: 2,
        }}
      >
        <Chart />
      </Paper>
    </Grid>
  );
};
