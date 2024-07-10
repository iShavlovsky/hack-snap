import { Divider } from '@mui/material';
import styled from 'styled-components';

import { mock } from './mock-api';

const analytics = mock;

type CardTickersInfoProps = {
  content: {
    title?: string;
  };
  disabled?: boolean;
  fullWidth?: boolean;
};

const CardTickersInfoWrapep = styled.div<{
  fullWidth?: boolean | undefined;
  disabled?: boolean | undefined;
}>`
  display: flex;
  flex-direction: column;
  width: ${({ fullWidth }) => (fullWidth ? '100%' : '250px')};
  background-color: ${({ theme }) => theme.colors.card?.default};
  margin-bottom: 2.4rem;
  padding: 2.4rem;
  border: 1px solid ${({ theme }) => theme.colors.border?.default};
  border-radius: ${({ theme }) => theme.radii.default};
  box-shadow: ${({ theme }) => theme.shadows.default};
  filter: opacity(${({ disabled }) => (disabled ? '.4' : '1')});
  align-self: stretch;
  ${({ theme }) => theme.mediaQueries.small} {
    width: 100%;
    margin-top: 1.2rem;
    margin-bottom: 1.2rem;
    padding: 1.6rem;
  }
`;

const Title = styled.h2`
  font-size: ${({ theme }) => theme.fontSizes.large};
  margin: 0 0 1rem 0;
  ${({ theme }) => theme.mediaQueries.small} {
    font-size: ${({ theme }) => theme.fontSizes.text};
  }
`;

const Description = styled.div`
  margin-top: 1rem;
`;

export const CardTickersInfo = ({
  content,
  disabled = false,
  fullWidth,
}: CardTickersInfoProps) => {
  const { title } = content;
  return (
    <CardTickersInfoWrapep fullWidth={fullWidth} disabled={disabled}>
      {title && <Title>{title}</Title>}
      <Description>Token: {analytics.pairInfo.ticker}</Description>
      <Divider />
      <Description>Liquidity: ${analytics.liquidity.toFixed(2)}</Description>
      <Divider />
      <Description>Market Cap: ${analytics.marketCap.toFixed(2)}</Description>
      <Divider />
      <Description>Price: ${analytics.price.toFixed(2)}</Description>
      <Divider />
      <Description>
        Price Change (24H): {analytics.pricePercentCount.h24.toFixed(2)}%
      </Description>
      <Divider />
      <Description>
        DEX Transactions (24H): {analytics.txsCount.h24}
      </Description>
      <Divider />
      <Description>Buys (24H): {analytics.txsBuysCount.h24}</Description>
      <Divider />
      <Description>Sells (24H): {analytics.txsSellsCount.h24}</Description>
      <Divider />
      <Description>
        Volume (24H): ${analytics.volumeCount.h24.toFixed(2)}
      </Description>
      <Divider />
      <Description>DEX: {analytics.dex.name}</Description>
      <Divider />
      <Description>Network: {analytics.network.name}</Description>
      <Divider />
    </CardTickersInfoWrapep>
  );
};
