import { Grid, Paper } from '@mui/material';
import styled from 'styled-components';

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
function Chart() {
  return null;
}

export const ChartIndicators = ({ content }: ChartIndicatorsProps) => {
  const { title } = content;
  return (
    <Grid>
      <Title>{title}</Title>
      <Paper
        sx={{
          p: 2,
          display: 'flex',
          flexDirection: 'column',
          height: 240,
          mb: 2,
        }}
      >
        <Chart />
      </Paper>
    </Grid>
  );
};
