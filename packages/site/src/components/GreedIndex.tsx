import React, { useEffect, useRef, memo } from 'react';
import styled from 'styled-components';

const GreedIndexWrapper = styled.div`
  height: 38rem;

  background-color: ${({ theme }) => theme.colors.card?.default};
  margin-bottom: 2.4rem;
  border: 1px solid ${({ theme }) => theme.colors.border?.default};
  border-radius: ${({ theme }) => theme.radii.default};
  overflow: hidden;
  box-shadow: ${({ theme }) => theme.shadows.default};

  align-self: stretch;
  ${({ theme }) => theme.mediaQueries.small} {
    width: 100%;
    margin-top: 1.2rem;
    margin-bottom: 1.2rem;
    padding: 1.6rem;
  }
`;

const tradingViewGreed: React.FC = () => {
  const container = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (container.current && !container.current.querySelector('script')) {
      const script = document.createElement('script');
      script.src =
        'https://s3.tradingview.com/external-embedding/embed-widget-technical-analysis.js';
      script.type = 'text/javascript';
      script.async = true;
      script.innerHTML = JSON.stringify({
        interval: '1h',
        width: '100%',
        isTransparent: false,
        height: '100%',
        symbol: 'BINANCE:ETHUSDT',
        showIntervalTabs: true,
        displayMode: 'single',
        locale: 'en',
        colorTheme: 'dark',
      });
      container.current.appendChild(script);
    }
  }, []);

  return (
    <GreedIndexWrapper>
      <div
        className="tradingview-widget-container"
        ref={container}
        style={{ height: '100%', width: '100%' }}
      >
        <div
          className="tradingview-widget-container__widget"
          style={{ height: '100%', width: '100%' }}
        ></div>
      </div>
    </GreedIndexWrapper>
  );
};

export default memo(tradingViewGreed);
