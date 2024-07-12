import { LoadingButton } from '@mui/lab';
import { scopedCssBaselineClasses } from '@mui/material';
import { useCallback, useMemo } from 'react';
import styled from 'styled-components';

import { whatToFarm } from '../../../../mock/filterParamsData';
import { RequestEnum } from '../../../../types/requests';
import {
  ConnectButton,
  InstallFlaskButton,
  ReconnectButton,
  SendHelloButton,
  Card,
} from '../components';
import { AnalyticsForm } from '../components/AnalitycsForm';
import { CardTickersInfo } from '../components/CardTickersInfo';
import ChartMaterial from '../components/ChartMaterial';
import ChartOrders from '../components/ChartOrders';
import GreedIndex from '../components/GreedIndex';
import { defaultSnapOrigin } from '../config';
import { useStateContext } from '../contexts/StateContext';
import {
  useMetaMask,
  useInvokeSnap,
  useMetaMaskContext,
  useRequestSnap,
} from '../hooks';
import { isLocalSnap, shouldDisplayReconnectButton } from '../utils';
import { birdEye, dexScreneer } from './mockFiltersData';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1;
  margin-top: 2rem;
  margin-bottom: 7.6rem;
  ${({ theme }) => theme.mediaQueries.small} {
    padding-left: 2.4rem;
    padding-right: 2.4rem;
    margin-bottom: 2rem;
    width: auto;
  }
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1em;
`;

const WrapperChart = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 40vw;
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

const CardContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1em;
  flex-wrap: wrap;
  justify-content: space-between;
  max-width: 30rem;
  min-width: 350px;
  height: 100%;
`;

const Notice = styled.div`
  background-color: ${({ theme }) => theme.colors.background?.alternative};
  border: 1px solid ${({ theme }) => theme.colors.border?.default};
  color: ${({ theme }) => theme.colors.text?.alternative};
  border-radius: 0.5rem;
  padding: 2.4rem;

  & > * {
    margin: 0;
  }
  ${({ theme }) => theme.mediaQueries.small} {
    padding: 1.6rem;
  }
`;

const ErrorMessage = styled.div`
  background-color: ${({ theme }) => theme.colors.error?.muted};
  border: 1px solid ${({ theme }) => theme.colors.error?.default};
  color: ${({ theme }) => theme.colors.error?.alternative};
  border-radius: 0.5rem;
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

const Index = () => {
  const { error } = useMetaMaskContext();
  const { isFlask, snapsDetected, installedSnap } = useMetaMask();
  const [requestSnap] = useRequestSnap();
  const [
    resetSnapParams,
    {
      isLoading: isLoadingResetSnapParams,
      // error: errorResetSnapParams,
    },
  ] = useInvokeSnap();
  const [updateSnapParams, { isLoading: isLoadingUpdateSnapParams }] =
    useInvokeSnap();

  const { params, handleParams, resetStore } = useStateContext();

  const birdEyeSelectedParams = useMemo(() => params.birdEye, [params.birdEye]);

  const dexScreneerSelectedParams = useMemo(
    () => params.dexScreneer,
    [params.dexScreneer],
  );

  const whatToFarmSelectedParams = useMemo(
    () => params.whatToFarm,
    [params.whatToFarm],
  );

  const tokenAnalitycsWhtfByParams = useMemo(
    () =>
      whatToFarm.filter((item) =>
        whatToFarmSelectedParams.includes(item.value),
      ),
    [whatToFarmSelectedParams],
  );

  const isMetaMaskReady = isLocalSnap(defaultSnapOrigin)
    ? isFlask
    : snapsDetected;

  const onResetParams = async () => {
    await resetSnapParams({
      method: RequestEnum.RemoveParams,
    });
    resetStore();
  };

  const onSendParams = useCallback(async () => {
    await updateSnapParams({
      method: RequestEnum.UpdateParams,
      params: {
        fields: params.whatToFarm,
      },
    });
  }, [params.whatToFarm]);

  return (
    <Container>
      <ContainerRow>
        <Wrapper>
          <AnalyticsForm
            content={{
              title: 'WhatToFarm',
            }}
            data={whatToFarm}
            selectedValues={whatToFarmSelectedParams}
            onChange={(val) => handleParams('whatToFarm', val)}
          />
          <AnalyticsForm
            selectedValues={dexScreneerSelectedParams}
            data={dexScreneer}
            onChange={(val) => handleParams('dexScreneer', val)}
            content={{
              title: 'DexScreneer',
            }}
          />
          <AnalyticsForm
            selectedValues={birdEyeSelectedParams}
            data={birdEye}
            onChange={(val) => handleParams('birdEye', val)}
            content={{
              title: 'BirdEye',
            }}
          />

          <WrapperRow>
            <LoadingButton
              size="large"
              variant="outlined"
              onClick={onResetParams}
              loading={isLoadingResetSnapParams}
            >
              <span>Clear</span>
            </LoadingButton>
            <LoadingButton
              size="large"
              variant="contained"
              onClick={onSendParams}
              loading={isLoadingUpdateSnapParams}
            >
              <span>Send Analitycs</span>
            </LoadingButton>
          </WrapperRow>
        </Wrapper>
        <WrapperChart>
          {/* todo: Chart Indicators*/}
          <ChartMaterial />
          {/* todo: Chart Orders*/}
          <ChartOrders />
        </WrapperChart>

        <CardContainer>
          {error && (
            <ErrorMessage>
              <b>An error happened:</b> {error.message}
            </ErrorMessage>
          )}
          {/* todo: Card Tickers Info*/}
          <CardTickersInfo
            data={tokenAnalitycsWhtfByParams}
            content={{
              title: 'Token Analytics',
            }}
          />
          <GreedIndex />
          {!isMetaMaskReady && (
            <Card
              content={{
                title: 'Install',
                description:
                  'Snaps is pre-release software only available in MetaMask Flask, a canary distribution for developers with access to upcoming features.',
                button: <InstallFlaskButton />,
              }}
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
                  // onClick={handleSendHelloClick}
                  disabled={!installedSnap}
                />
              ),
            }}
            disabled={!installedSnap}
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
