import type {
  OnHomePageHandler,
  OnInstallHandler,
  OnRpcRequestHandler,
  OnTransactionHandler,
} from '@metamask/snaps-sdk';
import {
  address,
  divider,
  heading,
  image,
  panel,
  row,
  text,
} from '@metamask/snaps-sdk';

import { whatToFarm } from '../../../mock/filterParamsData';
import type { PairResponseType } from '../../../mock/mockApi';
import type {
  MockApiPairType,
  UpdateRequestParams,
} from '../../../types/requests';
import { SnapRequestEnum, TokenPairType } from '../../../types/requests';
import { extractValues } from '../../../utils/helper';

export const onTransaction: OnTransactionHandler = async ({ transaction }) => {
  let errorMessage = '';

  const pairName = (await fetch(
    `https://669276ed346eeafcf46d0217.mockapi.io/chain-pair/get-chain-pair`,
  )
    .then(async (response) => {
      if (!response.ok) {
        errorMessage = 'Network error';
      }
      return response.json();
    })
    .catch(() => {
      errorMessage = 'Network error';
    })) as MockApiPairType[];

  const toAddress = transaction.to.toLowerCase();
  const amount = transaction.value;

  const STG = '0x808d7c71ad2ba3FA531b068a2417C63106BC0949'.toLowerCase();
  const WETH = '0xe5D7C2a44FfDDf6b295A15c148167daaAf5Cf34f'.toLowerCase();
  const BH = '0x1cc8C191f3362FC13B5DDF95e5FAfb27e1b145c6'.toLowerCase();

  let pair = pairName[0]?.selectedPair;
  const inv = pairName[0]?.inv ?? false;

  if (toAddress === BH && pair === TokenPairType.StgWeth) {
    pair = TokenPairType.BhWeth;
    (await fetch(
      `https://669276ed346eeafcf46d0217.mockapi.io/chain-pair/get-chain-pair/1`,
      {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ inv, selectedPair: TokenPairType.BhWeth }),
      },
    )
      .then(async (response) => {
        if (!response.ok) {
          errorMessage = 'Network error 1';
        }
        return response.json();
      })
      .catch(() => (errorMessage = 'Network error 5'))) as MockApiPairType;
  } else if (toAddress === STG && pair === TokenPairType.BhWeth) {
    pair = TokenPairType.StgWeth;
    (await fetch(
      `https://669276ed346eeafcf46d0217.mockapi.io/chain-pair/get-chain-pair/1`,
      {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ inv, selectedPair: TokenPairType.StgWeth }),
      },
    )
      .then(async (response) => {
        if (!response.ok) {
          errorMessage = 'Network error 2';
        }
        return response.json();
      })
      .catch(() => (errorMessage = 'Network error 5'))) as MockApiPairType;
  }

  if (!pairName || toAddress === WETH) {
    pair = TokenPairType.StgWeth;
    (await fetch(
      `https://669276ed346eeafcf46d0217.mockapi.io/chain-pair/get-chain-pair/1`,
      {
        method: 'PUT',
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify({ inv, selectedPair: TokenPairType.StgWeth }),
      },
    )
      .then(async (response) => {
        if (!response.ok) {
          errorMessage = 'Network error 3';
        }
        return response.json();
      })
      .catch(() => (errorMessage = 'Network error 4'))) as MockApiPairType;
  }

  const pairData = (await fetch(
    `https://whattofarm.io/api/v3/open/pair-stat/${pair}?inv=${inv}&route=01`,
  )
    .then(async (response) => {
      if (!response.ok) {
        errorMessage = 'Network error';
      }
      return response.json();
    })
    .catch(() => {
      errorMessage = 'Network error';
    })) as PairResponseType;

  /**
   *
   * @param value
   * @param decimalPlaces
   */
  function truncateToFixed(value: number, decimalPlaces = 2) {
    const factor = Math.pow(10, decimalPlaces);
    const truncatedValue = Math.floor(value * factor) / factor;
    return truncatedValue.toFixed(decimalPlaces);
  }

  const persistedData = (await snap.request({
    method: 'snap_manageState',
    params: {
      operation: 'get',
      encrypted: false,
    },
  })) as { store: { fields: UpdateRequestParams } };

  const filteredData = persistedData?.store.fields
    ? whatToFarm.filter((item) =>
        persistedData.store.fields.includes(item.value),
      )
    : [];

  const values = extractValues(pairData, filteredData);

  return {
    content: panel([
      ...(errorMessage
        ? [text(`${errorMessage}`)]
        : [
            heading('Token Analytics'),
            text(`toAddress ${toAddress}`),
            text(`amount: ${amount}`),
            divider(),
            ...values
              .map(({ label, value, fixedNumber }) => [
                row(
                  `${label}`,
                  label === 'Token info'
                    ? address(value)
                    : text(
                        `${
                          fixedNumber
                            ? truncateToFixed(value, fixedNumber)
                            : value
                        }`,
                      ),
                ),
              ])
              .flat(),
          ]),
    ]),
  };
};

export const onRpcRequest: OnRpcRequestHandler = async ({ request }) => {
  switch (request.method) {
    case SnapRequestEnum.UpdateParams:
      return await snap.request({
        method: 'snap_manageState',
        params: {
          operation: 'update',
          newState: { store: request.params as UpdateRequestParams },
          encrypted: false,
        },
      });
    case SnapRequestEnum.RemoveParams:
      return await snap.request({
        method: 'snap_manageState',
        params: {
          operation: 'clear',
          encrypted: false,
        },
      });
    case SnapRequestEnum.SendParamsSuccess:
      return await snap.request({
        method: 'snap_dialog',
        params: {
          type: 'alert',
          content: panel([
            image(
              '<svg width="230" height="102" viewBox="0 0 230 102" fill="none" xmlns="http://www.w3.org/2000/svg">\n' +
                '<circle cx="115" cy="51" r="25" fill="#25AE88"/>\n' +
                '<polyline points="128,41 112,59 102,51" fill="none" stroke="#FFFFFF"\n' +
                'stroke-width="2" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10"/>\n' +
                '</svg>',
            ),
            heading('Success update params'),
            text('Your settings for snap Degen Watch have been updated'),
          ]),
        },
      });
    default:
      throw new Error('Method not found.');
  }
};
/**
 *
 */

export const onInstall: OnInstallHandler = async () => {
  const component = panel([
    image(
      '<svg width="230" height="102" viewBox="0 0 230 102" fill="none" xmlns="http://www.w3.org/2000/svg">\n' +
        '<path fill-rule="evenodd" clip-rule="evenodd" d="M71.5 83C78.1995 83 84.4655 81.1442 89.812 77.9187C94.3083 85.1704 102.34 90 111.5 90C121.838 90 130.74 83.8478 134.743 75.0047C137.22 75.6542 139.819 76 142.5 76C143.602 76 144.69 75.9416 145.761 75.8277C151.346 82.0707 159.464 86 168.5 86C175.067 86 181.149 83.9248 186.126 80.3943C188.189 80.7918 190.32 81 192.5 81C211.002 81 226 66.0015 226 47.5C226 28.9985 211.002 14 192.5 14C182.654 14 173.8 18.2479 167.67 25.0111C166.851 25.0329 166.04 25.0871 165.239 25.1723C159.654 18.9292 151.536 15 142.5 15C132.382 15 123.414 19.9273 117.866 27.5133C116.008 23.6594 112.065 21 107.5 21C104.065 21 100.981 22.5064 98.8737 24.8947C92.3623 17.0187 82.5173 12 71.5 12C64.4996 12 57.9725 14.0262 52.4731 17.5242C47.9671 15.269 42.8817 14 37.5 14C18.9985 14 4 28.9985 4 47.5C4 66.0015 18.9985 81 37.5 81C42.8818 81 47.9671 79.7309 52.4731 77.4758C57.9725 80.9738 64.4996 83 71.5 83ZM118.5 22C120.433 22 122 20.433 122 18.5C122 16.567 120.433 15 118.5 15C116.567 15 115 16.567 115 18.5C115 20.433 116.567 22 118.5 22ZM93 86.5C93 87.8807 91.8807 89 90.5 89C89.1193 89 88 87.8807 88 86.5C88 85.1193 89.1193 84 90.5 84C91.8807 84 93 85.1193 93 86.5ZM83.5 86C84.3284 86 85 85.3284 85 84.5C85 83.6716 84.3284 83 83.5 83C82.6716 83 82 83.6716 82 84.5C82 85.3284 82.6716 86 83.5 86Z" fill="#24272A"/>\n' +
        '<path fill-rule="evenodd" clip-rule="evenodd" d="M38.6596 31C47.3081 31 54.3191 38.1634 54.3191 47C54.3191 55.8366 47.3081 63 38.6596 63C30.011 63 23 55.8366 23 47C23 38.1634 30.011 31 38.6596 31ZM64 55.3371H70.4345C75.7636 55.3371 79.0914 51.9628 79.0914 46.6685C79.0914 41.3743 75.7171 38 70.4345 38H64V55.3371ZM70.2251 51.8464H68.1888V41.4907H70.1785C73.3667 41.4907 74.8793 43.2477 74.8793 46.6685C74.8793 50.0778 73.4016 51.8464 70.2251 51.8464ZM86.1657 55.6164C82.3958 55.6164 79.8359 52.9402 79.8359 49.1935C79.8359 45.4468 82.4191 42.7706 86.061 42.7706C89.7495 42.7706 92.2977 45.377 92.2977 49.1004V50.1825H83.7455C83.7921 51.7417 84.7229 52.7307 86.3054 52.7307C87.4806 52.7307 88.3183 52.2188 88.6092 51.4043H92.2046C91.7508 53.8827 89.2724 55.6164 86.1657 55.6164ZM86.1657 45.7261C84.816 45.7261 83.9433 46.494 83.7688 47.7856H88.5627C88.3881 46.494 87.5038 45.7261 86.1657 45.7261ZM111.603 55.6164C107.833 55.6164 105.273 52.9402 105.273 49.1935C105.273 45.4468 107.857 42.7706 111.499 42.7706C115.187 42.7706 117.735 45.377 117.735 49.1004V50.1825H109.183C109.23 51.7417 110.16 52.7307 111.743 52.7307C112.918 52.7307 113.756 52.2188 114.047 51.4043H117.642C117.188 53.8827 114.71 55.6164 111.603 55.6164ZM114 47.7856C113.826 46.494 112.941 45.7261 111.603 45.7261C110.253 45.7261 109.381 46.494 109.206 47.7856H114ZM118.945 55.3371V43.0499H122.797L125.88 47.483C126.52 48.3906 127.067 49.2284 127.591 50.0429V43.0499H131.454V55.3371H127.614L124.519 50.9039C123.974 50.1215 123.505 49.4065 123.048 48.7087L123.048 48.7086L122.808 48.3441V55.3371H118.945ZM92.7422 49.2051C92.7422 53.103 95.2089 55.5349 98.9207 55.5349C102.342 55.5349 104.692 53.4754 104.692 50.229V48.3208H99.0254V50.9854H101.038C101.003 51.7533 100.317 52.2769 99.0254 52.2769C97.3732 52.2769 96.5587 51.1832 96.5587 49.1818C96.5587 47.2038 97.3848 46.0984 99.0022 46.0984C99.9912 46.0984 100.596 46.4707 100.759 47.2736H104.576C104.355 44.5509 101.853 42.8521 98.8742 42.8521C95.4766 42.8521 92.7422 45.0977 92.7422 49.2051ZM198.487 43.0499V47.4133H202.874V43.0499H206.888V55.3372H202.874V50.6945H198.487V55.3372H194.484V43.0499H198.487ZM180.902 49.1935C180.902 53.0216 183.451 55.6164 187.255 55.6164C190.734 55.6164 193.201 53.4754 193.283 50.4734H189.408C189.257 51.6719 188.524 52.4398 187.337 52.4398C185.847 52.4398 184.963 51.2065 184.963 49.1935C184.963 47.1805 185.836 45.9472 187.337 45.9472C188.524 45.9472 189.292 46.7035 189.42 47.8787H193.283C193.108 44.865 190.676 42.7706 187.255 42.7706C183.451 42.7706 180.902 45.377 180.902 49.1935ZM172.573 55.3372V46.3079H168.523V43.0499H180.624V46.3079H176.575V55.3372H172.573ZM160.283 43.0499L156.223 55.3372H160.609L161.075 53.6965H164.856L165.287 55.3372H169.801L165.694 43.0499H160.283ZM164.065 50.648H161.901C162.108 49.8583 162.32 49.0841 162.53 48.3119L162.531 48.311C162.686 47.7409 162.841 47.1719 162.995 46.5988C163.367 47.9485 163.728 49.2634 164.065 50.648ZM139.561 55.3371L134.941 38H139.444L141.166 45.7028C141.492 47.2387 141.795 48.763 142.074 50.2872C142.377 48.763 142.702 47.2387 143.063 45.7028L144.913 38H149.067L150.917 45.7028C151.266 47.2271 151.592 48.7397 151.895 50.264C152.174 48.7397 152.476 47.2271 152.802 45.7028L154.524 38H159.039L154.408 55.3371H149.777L147.554 46.5755C147.374 45.8666 147.205 45.0489 147.005 44.0803L147.005 44.0796L146.984 43.9807L146.964 44.0801C146.763 45.0488 146.594 45.8665 146.414 46.5755L144.203 55.3371H139.561Z" fill="white"/>\n' +
        '<path fill-rule="evenodd" clip-rule="evenodd" d="M36.5378 37.625C36.5378 37.2798 36.264 37 35.9261 37H33.9382C33.6003 37 33.3265 37.2798 33.3265 37.625V40.0036C33.3265 40.2846 33.1426 40.5298 32.8796 40.6121C31.9738 40.8954 31.1342 41.2437 30.3807 41.6492C29.0242 42.3793 27.8096 43.3812 27.0922 44.6252C26.8754 45.0013 27.1663 45.4375 27.5935 45.4375H29.7368C29.9049 45.4375 30.0642 45.3654 30.1867 45.2478C30.56 44.8896 31.0554 44.5298 31.6949 44.1856C31.9562 44.045 32.2345 43.9115 32.5285 43.786C32.9148 43.6211 33.3265 43.9225 33.3265 44.3503V49.8419C33.3265 50.2697 32.9148 50.5712 32.5285 50.4063C32.2345 50.2808 31.9562 50.1472 31.6949 50.0066C30.9578 49.6099 30.4122 49.1926 30.0243 48.7806C29.8983 48.6468 29.7278 48.5625 29.5461 48.5625H27.4889C27.0726 48.5625 26.7809 48.9793 26.976 49.355C27.6735 50.6976 28.948 51.7719 30.3807 52.543C31.1342 52.9486 31.9738 53.2969 32.8796 53.5802C33.1426 53.6624 33.3265 53.9077 33.3265 54.1887V56.375C33.3265 56.7202 33.6003 57 33.9382 57H35.9261C36.264 57 36.5378 56.7202 36.5378 56.375V55.015C36.5378 54.6444 36.8515 54.356 37.2133 54.3824C37.7345 54.4204 38.2649 54.4399 38.8016 54.4399C42.0158 54.4399 44.9955 53.7418 47.2227 52.543C48.6554 51.7719 49.9298 50.6976 50.6274 49.355C50.8225 48.9793 50.5308 48.5625 50.1144 48.5625H48.0572C47.8756 48.5625 47.7051 48.6468 47.579 48.7806C47.1912 49.1926 46.6455 49.6099 45.9084 50.0066C44.1618 50.9467 41.6515 51.5715 38.8016 51.5715C38.2114 51.5715 37.6356 51.5447 37.0781 51.4939C36.7695 51.4657 36.5378 51.198 36.5378 50.8814V43.3109C36.5378 42.9943 36.7695 42.7266 37.0781 42.6984C37.6356 42.6475 38.2114 42.6207 38.8016 42.6207C41.6515 42.6207 44.1618 43.2455 45.9084 44.1856C46.5479 44.5298 47.0434 44.8896 47.4167 45.2478C47.5391 45.3654 47.6984 45.4375 47.8665 45.4375H50.0099C50.437 45.4375 50.728 45.0013 50.5112 44.6252C49.7938 43.3812 48.5792 42.3793 47.2227 41.6492C44.9955 40.4505 42.0158 39.7524 38.8016 39.7524C38.2649 39.7524 37.7345 39.7719 37.2133 39.8099C36.8515 39.8363 36.5378 39.5478 36.5378 39.1773V37.625Z" fill="black"/>\n' +
        '</svg>\n',
    ),
    divider(),

    text(
      'This is your analytical assistant! You can get analytics on your transactions and much more',
    ),
    text(
      'Check out more about our Snap at [Degen Watch Snap](https://aa.com/snap)',
    ),
  ]);

  await snap.request({
    method: 'snap_dialog',
    params: {
      type: 'alert',
      content: component,
    },
  });
};

export const onHomePage: OnHomePageHandler = async () => {
  const component = panel([
    image(
      '<svg width="230" height="102" viewBox="0 0 230 102" fill="none" xmlns="http://www.w3.org/2000/svg">\n' +
        '<path fill-rule="evenodd" clip-rule="evenodd" d="M71.5 83C78.1995 83 84.4655 81.1442 89.812 77.9187C94.3083 85.1704 102.34 90 111.5 90C121.838 90 130.74 83.8478 134.743 75.0047C137.22 75.6542 139.819 76 142.5 76C143.602 76 144.69 75.9416 145.761 75.8277C151.346 82.0707 159.464 86 168.5 86C175.067 86 181.149 83.9248 186.126 80.3943C188.189 80.7918 190.32 81 192.5 81C211.002 81 226 66.0015 226 47.5C226 28.9985 211.002 14 192.5 14C182.654 14 173.8 18.2479 167.67 25.0111C166.851 25.0329 166.04 25.0871 165.239 25.1723C159.654 18.9292 151.536 15 142.5 15C132.382 15 123.414 19.9273 117.866 27.5133C116.008 23.6594 112.065 21 107.5 21C104.065 21 100.981 22.5064 98.8737 24.8947C92.3623 17.0187 82.5173 12 71.5 12C64.4996 12 57.9725 14.0262 52.4731 17.5242C47.9671 15.269 42.8817 14 37.5 14C18.9985 14 4 28.9985 4 47.5C4 66.0015 18.9985 81 37.5 81C42.8818 81 47.9671 79.7309 52.4731 77.4758C57.9725 80.9738 64.4996 83 71.5 83ZM118.5 22C120.433 22 122 20.433 122 18.5C122 16.567 120.433 15 118.5 15C116.567 15 115 16.567 115 18.5C115 20.433 116.567 22 118.5 22ZM93 86.5C93 87.8807 91.8807 89 90.5 89C89.1193 89 88 87.8807 88 86.5C88 85.1193 89.1193 84 90.5 84C91.8807 84 93 85.1193 93 86.5ZM83.5 86C84.3284 86 85 85.3284 85 84.5C85 83.6716 84.3284 83 83.5 83C82.6716 83 82 83.6716 82 84.5C82 85.3284 82.6716 86 83.5 86Z" fill="#24272A"/>\n' +
        '<path fill-rule="evenodd" clip-rule="evenodd" d="M38.6596 31C47.3081 31 54.3191 38.1634 54.3191 47C54.3191 55.8366 47.3081 63 38.6596 63C30.011 63 23 55.8366 23 47C23 38.1634 30.011 31 38.6596 31ZM64 55.3371H70.4345C75.7636 55.3371 79.0914 51.9628 79.0914 46.6685C79.0914 41.3743 75.7171 38 70.4345 38H64V55.3371ZM70.2251 51.8464H68.1888V41.4907H70.1785C73.3667 41.4907 74.8793 43.2477 74.8793 46.6685C74.8793 50.0778 73.4016 51.8464 70.2251 51.8464ZM86.1657 55.6164C82.3958 55.6164 79.8359 52.9402 79.8359 49.1935C79.8359 45.4468 82.4191 42.7706 86.061 42.7706C89.7495 42.7706 92.2977 45.377 92.2977 49.1004V50.1825H83.7455C83.7921 51.7417 84.7229 52.7307 86.3054 52.7307C87.4806 52.7307 88.3183 52.2188 88.6092 51.4043H92.2046C91.7508 53.8827 89.2724 55.6164 86.1657 55.6164ZM86.1657 45.7261C84.816 45.7261 83.9433 46.494 83.7688 47.7856H88.5627C88.3881 46.494 87.5038 45.7261 86.1657 45.7261ZM111.603 55.6164C107.833 55.6164 105.273 52.9402 105.273 49.1935C105.273 45.4468 107.857 42.7706 111.499 42.7706C115.187 42.7706 117.735 45.377 117.735 49.1004V50.1825H109.183C109.23 51.7417 110.16 52.7307 111.743 52.7307C112.918 52.7307 113.756 52.2188 114.047 51.4043H117.642C117.188 53.8827 114.71 55.6164 111.603 55.6164ZM114 47.7856C113.826 46.494 112.941 45.7261 111.603 45.7261C110.253 45.7261 109.381 46.494 109.206 47.7856H114ZM118.945 55.3371V43.0499H122.797L125.88 47.483C126.52 48.3906 127.067 49.2284 127.591 50.0429V43.0499H131.454V55.3371H127.614L124.519 50.9039C123.974 50.1215 123.505 49.4065 123.048 48.7087L123.048 48.7086L122.808 48.3441V55.3371H118.945ZM92.7422 49.2051C92.7422 53.103 95.2089 55.5349 98.9207 55.5349C102.342 55.5349 104.692 53.4754 104.692 50.229V48.3208H99.0254V50.9854H101.038C101.003 51.7533 100.317 52.2769 99.0254 52.2769C97.3732 52.2769 96.5587 51.1832 96.5587 49.1818C96.5587 47.2038 97.3848 46.0984 99.0022 46.0984C99.9912 46.0984 100.596 46.4707 100.759 47.2736H104.576C104.355 44.5509 101.853 42.8521 98.8742 42.8521C95.4766 42.8521 92.7422 45.0977 92.7422 49.2051ZM198.487 43.0499V47.4133H202.874V43.0499H206.888V55.3372H202.874V50.6945H198.487V55.3372H194.484V43.0499H198.487ZM180.902 49.1935C180.902 53.0216 183.451 55.6164 187.255 55.6164C190.734 55.6164 193.201 53.4754 193.283 50.4734H189.408C189.257 51.6719 188.524 52.4398 187.337 52.4398C185.847 52.4398 184.963 51.2065 184.963 49.1935C184.963 47.1805 185.836 45.9472 187.337 45.9472C188.524 45.9472 189.292 46.7035 189.42 47.8787H193.283C193.108 44.865 190.676 42.7706 187.255 42.7706C183.451 42.7706 180.902 45.377 180.902 49.1935ZM172.573 55.3372V46.3079H168.523V43.0499H180.624V46.3079H176.575V55.3372H172.573ZM160.283 43.0499L156.223 55.3372H160.609L161.075 53.6965H164.856L165.287 55.3372H169.801L165.694 43.0499H160.283ZM164.065 50.648H161.901C162.108 49.8583 162.32 49.0841 162.53 48.3119L162.531 48.311C162.686 47.7409 162.841 47.1719 162.995 46.5988C163.367 47.9485 163.728 49.2634 164.065 50.648ZM139.561 55.3371L134.941 38H139.444L141.166 45.7028C141.492 47.2387 141.795 48.763 142.074 50.2872C142.377 48.763 142.702 47.2387 143.063 45.7028L144.913 38H149.067L150.917 45.7028C151.266 47.2271 151.592 48.7397 151.895 50.264C152.174 48.7397 152.476 47.2271 152.802 45.7028L154.524 38H159.039L154.408 55.3371H149.777L147.554 46.5755C147.374 45.8666 147.205 45.0489 147.005 44.0803L147.005 44.0796L146.984 43.9807L146.964 44.0801C146.763 45.0488 146.594 45.8665 146.414 46.5755L144.203 55.3371H139.561Z" fill="white"/>\n' +
        '<path fill-rule="evenodd" clip-rule="evenodd" d="M36.5378 37.625C36.5378 37.2798 36.264 37 35.9261 37H33.9382C33.6003 37 33.3265 37.2798 33.3265 37.625V40.0036C33.3265 40.2846 33.1426 40.5298 32.8796 40.6121C31.9738 40.8954 31.1342 41.2437 30.3807 41.6492C29.0242 42.3793 27.8096 43.3812 27.0922 44.6252C26.8754 45.0013 27.1663 45.4375 27.5935 45.4375H29.7368C29.9049 45.4375 30.0642 45.3654 30.1867 45.2478C30.56 44.8896 31.0554 44.5298 31.6949 44.1856C31.9562 44.045 32.2345 43.9115 32.5285 43.786C32.9148 43.6211 33.3265 43.9225 33.3265 44.3503V49.8419C33.3265 50.2697 32.9148 50.5712 32.5285 50.4063C32.2345 50.2808 31.9562 50.1472 31.6949 50.0066C30.9578 49.6099 30.4122 49.1926 30.0243 48.7806C29.8983 48.6468 29.7278 48.5625 29.5461 48.5625H27.4889C27.0726 48.5625 26.7809 48.9793 26.976 49.355C27.6735 50.6976 28.948 51.7719 30.3807 52.543C31.1342 52.9486 31.9738 53.2969 32.8796 53.5802C33.1426 53.6624 33.3265 53.9077 33.3265 54.1887V56.375C33.3265 56.7202 33.6003 57 33.9382 57H35.9261C36.264 57 36.5378 56.7202 36.5378 56.375V55.015C36.5378 54.6444 36.8515 54.356 37.2133 54.3824C37.7345 54.4204 38.2649 54.4399 38.8016 54.4399C42.0158 54.4399 44.9955 53.7418 47.2227 52.543C48.6554 51.7719 49.9298 50.6976 50.6274 49.355C50.8225 48.9793 50.5308 48.5625 50.1144 48.5625H48.0572C47.8756 48.5625 47.7051 48.6468 47.579 48.7806C47.1912 49.1926 46.6455 49.6099 45.9084 50.0066C44.1618 50.9467 41.6515 51.5715 38.8016 51.5715C38.2114 51.5715 37.6356 51.5447 37.0781 51.4939C36.7695 51.4657 36.5378 51.198 36.5378 50.8814V43.3109C36.5378 42.9943 36.7695 42.7266 37.0781 42.6984C37.6356 42.6475 38.2114 42.6207 38.8016 42.6207C41.6515 42.6207 44.1618 43.2455 45.9084 44.1856C46.5479 44.5298 47.0434 44.8896 47.4167 45.2478C47.5391 45.3654 47.6984 45.4375 47.8665 45.4375H50.0099C50.437 45.4375 50.728 45.0013 50.5112 44.6252C49.7938 43.3812 48.5792 42.3793 47.2227 41.6492C44.9955 40.4505 42.0158 39.7524 38.8016 39.7524C38.2649 39.7524 37.7345 39.7719 37.2133 39.8099C36.8515 39.8363 36.5378 39.5478 36.5378 39.1773V37.625Z" fill="black"/>\n' +
        '</svg>\n',
    ),
    heading('DESCRIPTION BY DEGEN WATCH'),
    text(
      'Degen Watch snap is a tool that helps to customize your on-chain experience with real-time data. The snap uses real time database of blockchain scanner provider and provide user with token insights at a glance on the MetaMask wallet.',
    ),
    text(
      'After installing the Snap, it will appear in the transaction confirmation screen.',
    ),
    heading('PERMISSIONS BY DEGEN WATCH'),
    text('• Allow websites to communicate with Degeb Watch'),
    text('• Allow websites to communicate with Degeb Watch'),
  ]);

  return {
    content: component,
  };
};
