// TradingViewWidget.tsx
import React, { useEffect, useRef, memo } from 'react';
import styled from 'styled-components';

const WrapperChart = styled.div`
  aspect-ratio: 16 / 9;
  margin: -1px;
`;
/**
 *
 */
function tradingViewWidget() {
  const container = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (container.current && !container.current.querySelector('script')) {
      const script = document.createElement('script');
      script.src =
        'https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js';
      script.type = 'text/javascript';
      script.async = true;
      script.innerHTML = `
        {
          "autosize": true,
          "symbol": "BINANCE:BTCUSDT",
          "interval": "D",
          "timezone": "Etc/UTC",
          "theme": "dark",
          "style": "1",
          "locale": "en",
          "withdateranges": true,
          "hide_side_toolbar": false,
          "allow_symbol_change": true,
          "calendar": false,
          "support_host": "https://www.tradingview.com"
        }`;
      container.current.appendChild(script);
    }
  }, []);

  return (
    <WrapperChart>
      <div
        className="tradingview-widget-container"
        ref={container}
        style={{ height: '100%', width: '100%' }}
      >
        <div
          className="tradingview-widget-container__widget"
          style={{
            height: 'calc(100% - 32px)',
            width: '100%',
          }}
        ></div>
        <div
          style={{ backgroundColor: '#131722' }}
          className="tradingview-widget-copyright"
        >
          <a
            href="https://www.tradingview.com/"
            rel="noopener nofollow"
            target="_blank"
          >
            <span className="blue-text">Track all markets on TradingView</span>
          </a>
        </div>
      </div>
    </WrapperChart>
  );
}

export default memo(tradingViewWidget);
