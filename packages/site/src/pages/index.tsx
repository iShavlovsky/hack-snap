import { LoadingButton } from '@mui/lab';
import { useQuery } from '@tanstack/react-query';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';

import { whatToFarm } from '../../../../mock/filterParamsData';
import { SnapRequestEnum } from '../../../../types/requests';
import { extractValues } from '../../../../utils/helper';
import { QueryKeys } from '../api/queryKeys';
import ApiService from '../api/service';
import { Card, InstallFlaskButton } from '../components';
import AccordionMui from '../components/AccordionMui';
import { AnalyticsForm } from '../components/AnalitycsForm';
import { AnalyticsFormSimple } from '../components/AnalitycsFormSimple';
import { CardTickersInfo } from '../components/CardTickersInfo';
import ChartOrders from '../components/ChartOrders';
import GreedIndex from '../components/GreedIndex';
import { defaultSnapOrigin } from '../config';
import { useStateContext } from '../contexts/StateContext';
import { useInvokeSnap, useMetaMask, useMetaMaskContext } from '../hooks';
import { isLocalSnap } from '../utils';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1;
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
  max-width: 50vw;
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
  const { isFlask, snapsDetected } = useMetaMask();
  const [resetSnapParams, { isLoading: isLoadingResetSnapParams }] =
    useInvokeSnap();
  const [updateSnapParams, { isLoading: isLoadingUpdateSnapParams }] =
    useInvokeSnap();

  const { params, handleParams, resetStore } = useStateContext();

  const whatToFarmSelectedParams = useMemo(
    () => params.whatToFarm,
    [params.whatToFarm],
  );

  const tokenAnalitycsWhtfByParams = useMemo(
    () => whatToFarm.filter((item) => params.whatToFarm.includes(item.value)),
    [params.whatToFarm],
  );

  const { data: pairFilterData, isPending: isPendingPairFilterData } = useQuery(
    {
      queryKey: [QueryKeys.LiquidPair],
      queryFn: async () =>
        await ApiService.fetchPairData({
          inv: false,
          slug: '0x3Cb104f044dB23d6513F2A6100a1997Fa5e3F587',
        }),
      select: (getData) =>
        extractValues(getData, tokenAnalitycsWhtfByParams) || [],
      refetchInterval: 30000,
    },
  );

  const { data: tableData, isPending: isPendingTableData } = useQuery({
    queryKey: [QueryKeys.TablePair],
    queryFn: async () =>
      await ApiService.fetchTableData({
        page: 1,
        size: 10,
        slug: '0x3Cb104f044dB23d6513F2A6100a1997Fa5e3F587',
      }),
    refetchInterval: 30000,
  });

  useEffect(() => console.log(tableData), [tableData]);

  const isMetaMaskReady = isLocalSnap(defaultSnapOrigin)
    ? isFlask
    : snapsDetected;

  const onResetParams = async () => {
    await resetSnapParams({
      method: SnapRequestEnum.RemoveParams,
    });
    resetStore();
  };

  const onSendParams = useCallback(async () => {
    await updateSnapParams({
      method: SnapRequestEnum.UpdateParams,
      params: {
        fields: params.whatToFarm,
      },
    });
  }, [params.whatToFarm]);

  const [isNoticeVisible, setNoticeVisible] = useState<boolean>(false); // Установить начальное значение в false

  const toggleNotice = (visible: boolean) => {
    setNoticeVisible(visible);
  };

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
          {/* todo: form 2 WhatToFarm*/}

          <WrapperRow>
            <LoadingButton
              style={{ flexGrow: 1 }}
              size="large"
              variant="outlined"
              onClick={onResetParams}
              loading={isLoadingResetSnapParams}
            >
              <span>Clear</span>
            </LoadingButton>
            <LoadingButton
              style={{ flexGrow: 1 }}
              size="large"
              variant="contained"
              onClick={onSendParams}
              loading={isLoadingUpdateSnapParams}
            >
              <span>Send Analitycs</span>
            </LoadingButton>
          </WrapperRow>
          <LoadingButton
            size="large"
            variant="text"
            color="success"
            loading={isLoadingResetSnapParams}
          >
            <span>buy pro</span>
          </LoadingButton>
        </Wrapper>
        <WrapperChart>
          {/* todo: Chart Indicators*/}
          <Wrapper>
            <iframe
              width="100%"
              height="100%"
              id="wtf-embed-chart"
              title="WhatToFarm Embed Chart"
              src="https://whattofarm.io/ru/chart-pairs-widget/0xDDed227D71A096c6B5D87807C1B5C456771aAA94"
            ></iframe>
          </Wrapper>
          {/* <ChartIndicators*/}
          {/*  content={{*/}
          {/*    title: '',*/}
          {/*  }}*/}
          {/* />*/}
          {/* todo: Chart Orders*/}
          <ChartOrders rows={tableData || []} />
        </WrapperChart>

        <CardContainer>
          {error && (
            <ErrorMessage>
              <b>An error happened:</b> {error.message}
            </ErrorMessage>
          )}
          {/* todo: Card Tickers Info*/}

          <CardTickersInfo
            data={pairFilterData}
            isPending={isPendingPairFilterData}
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
          {isNoticeVisible && (
            <Notice>
              <AccordionMui
                items={[
                  {
                    id: 'panel1',
                    summary: 'Go+ Security',
                    subSummary: '2 issues',
                    details: 'Stay tuned for updates and further releases.',
                    icon: (
                      <span style={{ color: 'currentcolor' }}>
                        <svg
                          width="18"
                          height="18"
                          viewBox="0 0 16 16"
                          fill="currentcolor"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M7.03676 1.21262C7.33097 1.04698 7.6629 0.959961 8.00053 0.959961C8.33817 0.959961 8.6701 1.04698 8.96431 1.21262C9.25852 1.37826 9.50507 1.61694 9.68018 1.90561L9.68172 1.90816L15.7368 12.0166C15.9083 12.3137 15.999 12.6505 16 12.9935C16.0009 13.3365 15.9121 13.6738 15.7422 13.9718C15.5723 14.2698 15.3274 14.5182 15.0317 14.6921C14.7361 14.8661 14.4001 14.9596 14.0571 14.9634L14.0512 14.9634L1.944 14.9634C1.601 14.9596 1.26496 14.8661 0.969326 14.6921C0.673687 14.5182 0.42875 14.2698 0.258885 13.9718C0.0890193 13.6738 0.000145875 13.3365 0.00110634 12.9935C0.0020668 12.6505 0.0928279 12.3137 0.26436 12.0166L0.268653 12.0092L6.31936 1.90816L6.32089 1.90561C6.496 1.61694 6.74255 1.37826 7.03676 1.21262ZM8.74239 5.07174C8.74239 4.66127 8.40963 4.32851 7.99916 4.32851C7.58868 4.32851 7.25592 4.66127 7.25592 5.07174V9.03566C7.25592 9.44613 7.58868 9.77889 7.99916 9.77889C8.40963 9.77889 8.74239 9.44613 8.74239 9.03566V5.07174ZM7.99916 11.0086C7.45186 11.0086 7.00818 11.4523 7.00818 11.9996C7.00818 12.5469 7.45186 12.9906 7.99916 12.9906H8.00907C8.55637 12.9906 9.00005 12.5469 9.00005 11.9996C9.00005 11.4523 8.55637 11.0086 8.00907 11.0086H7.99916Z"
                            fill="#EE495F"
                          />
                        </svg>
                      </span>
                    ),
                  },
                  {
                    id: 'panel2',
                    summary: 'Quick Intel',
                    subSummary: 'No issues',
                    details: 'Stay tuned for updates and further releases.',
                    icon: (
                      <span style={{ color: 'currentcolor' }}>
                        <svg
                          width="18"
                          height="18"
                          viewBox="0 0 16 16"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <g clipPath="url(#clip0_2139_330)">
                            <path
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M15.75 8C15.75 12.2802 12.2802 15.75 8 15.75C3.71979 15.75 0.25 12.2802 0.25 8C0.25 3.71979 3.71979 0.25 8 0.25C12.2802 0.25 15.75 3.71979 15.75 8ZM11.4697 6.80726C11.7448 6.53212 11.7448 6.08603 11.4697 5.81088C11.1945 5.53574 10.7484 5.53574 10.4733 5.81088L6.88336 9.40082L5.52331 8.04077C5.24817 7.76563 4.80207 7.76563 4.52693 8.04077C4.25179 8.31591 4.25179 8.76201 4.52693 9.03715L6.38517 10.8954C6.5173 11.0275 6.6965 11.1017 6.88336 11.1017C7.07021 11.1017 7.24942 11.0275 7.38155 10.8954L11.4697 6.80726Z"
                              fill="#109A68"
                            />
                          </g>
                          <defs>
                            <clipPath id="clip0_2139_330">
                              <rect width="16" height="16" fill="white" />
                            </clipPath>
                          </defs>
                        </svg>
                      </span>
                    ),
                  },
                  {
                    id: 'panel3',
                    summary: 'Token Sniffer',
                    subSummary: '100/100',
                    details: 'Stay tuned for updates and further releases.',
                    icon: (
                      <span style={{ color: 'currentcolor' }}>
                        <svg
                          width="18"
                          height="18"
                          viewBox="0 0 16 16"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <g clip-path="url(#clip0_2139_330)">
                            <path
                              fill-rule="evenodd"
                              clip-rule="evenodd"
                              d="M15.75 8C15.75 12.2802 12.2802 15.75 8 15.75C3.71979 15.75 0.25 12.2802 0.25 8C0.25 3.71979 3.71979 0.25 8 0.25C12.2802 0.25 15.75 3.71979 15.75 8ZM11.4697 6.80726C11.7448 6.53212 11.7448 6.08603 11.4697 5.81088C11.1945 5.53574 10.7484 5.53574 10.4733 5.81088L6.88336 9.40082L5.52331 8.04077C5.24817 7.76563 4.80207 7.76563 4.52693 8.04077C4.25179 8.31591 4.25179 8.76201 4.52693 9.03715L6.38517 10.8954C6.5173 11.0275 6.6965 11.1017 6.88336 11.1017C7.07021 11.1017 7.24942 11.0275 7.38155 10.8954L11.4697 6.80726Z"
                              fill="#109A68"
                            />
                          </g>
                          <defs>
                            <clipPath id="clip0_2139_330">
                              <rect width="16" height="16" fill="white" />
                            </clipPath>
                          </defs>
                        </svg>
                      </span>
                    ),
                  },
                ]}
              ></AccordionMui>
            </Notice>
          )}
          <AnalyticsFormSimple
            content={{
              title: 'DexScreneer',
            }}
            showSecurityCheck={true}
            toggleNotice={toggleNotice}
          />
          <AnalyticsFormSimple
            content={{
              title: 'BirdEye',
            }}
            showSecurityCheck={false}
            toggleNotice={toggleNotice}
          />
        </CardContainer>
      </ContainerRow>
    </Container>
  );
};

export default Index;
