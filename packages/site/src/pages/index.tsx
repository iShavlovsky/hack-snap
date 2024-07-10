import styled from 'styled-components';

import {
  ConnectButton,
  InstallFlaskButton,
  ReconnectButton,
  SendHelloButton,
  Card,
  SendButton,
  ClearButton,
} from '../components';
import { AnalyticsForm } from '../components/AnalyticsForm';
import { CardTickersInfo } from '../components/CardTickersInfo';
import { ChartIndicators } from '../components/ChartIndicators';
import { ChartOrders } from '../components/ChartOrders';
import { defaultSnapOrigin } from '../config';
import {
  useMetaMask,
  useInvokeSnap,
  useMetaMaskContext,
  useRequestSnap,
} from '../hooks';
import { isLocalSnap, shouldDisplayReconnectButton } from '../utils';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  margin-top: 7.6rem;
  margin-bottom: 7.6rem;
  ${({ theme }) => theme.mediaQueries.small} {
    padding-left: 2.4rem;
    padding-right: 2.4rem;
    margin-top: 2rem;
    margin-bottom: 2rem;
    width: auto;
  }
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const WrapperChart = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
`;

const WrapperRow = styled.div`
  display: flex;
  flex-direction: row;
  gap: 2rem;
  margin-top: 2rem;
`;

const ContainerRow = styled.div`
  display: flex;
  flex-direction: row;
  align-items: start;
  flex: 1;
  margin-top: 4rem;
  margin-bottom: 4rem;
  gap: 2rem;
  padding: 0 5rem;
`;

const Heading = styled.h1`
  margin-top: 0;
  margin-bottom: 2.4rem;
  text-align: center;
`;

const Span = styled.span`
  color: ${(props) => props.theme.colors.primary?.default};
`;

const Subtitle = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.large};
  font-weight: 500;
  margin-top: 0;
  margin-bottom: 0;
  text-align: center;
  ${({ theme }) => theme.mediaQueries.small} {
    font-size: ${({ theme }) => theme.fontSizes.text};
  }
`;

const CardContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  justify-content: space-between;
  max-width: 30rem;
  width: 100%;
  height: 100%;
`;

const Notice = styled.div`
  background-color: ${({ theme }) => theme.colors.background?.alternative};
  border: 1px solid ${({ theme }) => theme.colors.border?.default};
  color: ${({ theme }) => theme.colors.text?.alternative};
  border-radius: ${({ theme }) => theme.radii.default};
  padding: 2.4rem;
  margin-top: 2.4rem;

  & > * {
    margin: 0;
  }
  ${({ theme }) => theme.mediaQueries.small} {
    margin-top: 1.2rem;
    padding: 1.6rem;
  }
`;

const ErrorMessage = styled.div`
  background-color: ${({ theme }) => theme.colors.error?.muted};
  border: 1px solid ${({ theme }) => theme.colors.error?.default};
  color: ${({ theme }) => theme.colors.error?.alternative};
  border-radius: ${({ theme }) => theme.radii.default};
  padding: 2.4rem;
  margin-bottom: 2.4rem;
  margin-top: 2.4rem;
  max-width: 60rem;
  width: 100%;
  ${({ theme }) => theme.mediaQueries.small} {
    padding: 1.6rem;
    margin-bottom: 1.2rem;
    margin-top: 1.2rem;
    max-width: 100%;
  }
`;

// /**
//  *
//  */
// function Chart() {
//   return null;
// }
//
// /**
//  *
//  */
// function Deposits() {
//   return null;
// }
//
// /**
//  *
//  */
// function Orders() {
//   return null;
// }
//
// /**
//  *
//  * @param props
//  * @param props.sx
//  * @param props.sx.pt
//  */
// function Copyright(props: { sx: { pt: number } }) {
//   return null;
// }

const Index = () => {
  const { error } = useMetaMaskContext();
  const { isFlask, snapsDetected, installedSnap } = useMetaMask();
  const requestSnap = useRequestSnap();
  const invokeSnap = useInvokeSnap();

  const isMetaMaskReady = isLocalSnap(defaultSnapOrigin)
    ? isFlask
    : snapsDetected;

  const handleSendHelloClick = async () => {
    await invokeSnap({
      method: 'hello',
      params: { filter1: true, filter2: false },
    });
  };

  return (
    <Container>
      <Heading>
        Welcome to <Span>WTF Analytics</Span>
      </Heading>
      <Subtitle>
        Get started by <code>https://whattofarm.io</code>
      </Subtitle>
      <ContainerRow>
        <Wrapper>
          {/* todo: form 1 WhatToFarm*/}
          <AnalyticsForm
            content={{
              title: 'WhatToFarm',
            }}
          />

          {/* todo: form 2 WhatToFarm*/}
          <AnalyticsForm
            content={{
              title: 'DexScreneer',
            }}
          />

          {/* todo: form 3 WhatToFarm*/}
          <AnalyticsForm
            content={{
              title: 'BirdEye',
            }}
          />

          <WrapperRow>
            <ClearButton
              onClick={handleSendHelloClick}
              disabled={!installedSnap}
            />
            <SendButton
              onClick={handleSendHelloClick}
              disabled={!installedSnap}
            />
          </WrapperRow>
        </Wrapper>
        <WrapperChart>
          {/* todo: Chart Indicators*/}
          <ChartIndicators
            content={{
              title: 'ETH/USDC',
            }}
          />
          {/* todo: Chart Orders*/}
          <ChartOrders
            content={{
              title: 'Price Chart',
            }}
          />
        </WrapperChart>

        <CardContainer>
          {error && (
            <ErrorMessage>
              <b>An error happened:</b> {error.message}
            </ErrorMessage>
          )}
          {/* todo: Card Tickers Info*/}
          <CardTickersInfo
            content={{
              title: 'Token Analytics',
            }}
          />

          {!isMetaMaskReady && (
            <Card
              content={{
                title: 'Install',
                description:
                  'Snaps is pre-release software only available in MetaMask Flask, a canary distribution for developers with access to upcoming features.',
                button: <InstallFlaskButton />,
              }}
              fullWidth
            />
          )}
          {!installedSnap && (
            <Card
              content={{
                title: 'Connect',
                description:
                  'Get started by connecting to and installing the example snap.',
                button: (
                  <ConnectButton
                    onClick={requestSnap}
                    disabled={!isMetaMaskReady}
                  />
                ),
              }}
              disabled={!isMetaMaskReady}
            />
          )}
          {shouldDisplayReconnectButton(installedSnap) && (
            <Card
              content={{
                title: 'Reconnect',
                description:
                  'While connected to a local running snap this button will always be displayed in order to update the snap if a change is made.',
                button: (
                  <ReconnectButton
                    onClick={requestSnap}
                    disabled={!installedSnap}
                  />
                ),
              }}
              disabled={!installedSnap}
            />
          )}
          <Card
            content={{
              title: 'Send Hello message',
              description:
                'Display a custom message within a confirmation screen in MetaMask.',
              button: (
                <SendHelloButton
                  onClick={handleSendHelloClick}
                  disabled={!installedSnap}
                />
              ),
            }}
            disabled={!installedSnap}
            fullWidth={
              isMetaMaskReady &&
              Boolean(installedSnap) &&
              !shouldDisplayReconnectButton(installedSnap)
            }
          />
          <Notice>
            <p>
              Please note that the <b>snap.manifest.json</b> and{' '}
              <b>package.json</b> must be located in the server root directory
              and the bundle must be hosted at the location specified by the
              location field.
            </p>
          </Notice>
        </CardContainer>
      </ContainerRow>
    </Container>
  );
};

export default Index;
