import type {
  OnTransactionHandler,
  OnRpcRequestHandler,
  OnInstallHandler,
} from '@metamask/snaps-sdk';
import { heading, panel, text, divider } from '@metamask/snaps-sdk';

import { whatToFarm } from '../../../mock/filterParamsData';
import type { UpdateRequestParams } from '../../../types/requests';
import { RequestEnum } from '../../../types/requests';

export const onTransaction: OnTransactionHandler = async ({ transaction }) => {
  const tokenAddress = transaction.to; // адрес токена
  const amount = transaction.value; // количество токенов

  // const response = await fetch('https://yourapi.com/token-analytics', {
  //   method: 'GET',
  //   headers: {
  //     'Content-Type': 'application/json',
  //   },
  //   body: JSON.stringify({
  //     tokenAddress,
  //     amount,
  //   }),
  // });
  //
  // const analytics = await response.json();
  let post1 = {
    id: 0,
    slug: '',
    url: '',
    title: '',
    content: '',
    image: '',
    thumbnail: '',
    status: '',
    category: '',
    publishedAt: '',
    updatedAt: '',
    userId: 0,
  };
  await fetch('https://jsonplaceholder.org/posts/1')
    .then(async (response) => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then((post) => {
      post1 = post;
      console.log(post);
    })
    .catch((error) => {
      console.error('There was a problem with the fetch operation:', error);
    });

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

  return {
    content: panel([
      heading('Token Analytics'),
      text(`tokenAddress: ${tokenAddress}`),
      text(`amount: ${amount}`),
      divider(),
      ...filteredData
        .map(({ label }, index) => [text(`${label} ${index}`), divider()])
        .flat(),
    ]),
  };
};

export const onRpcRequest: OnRpcRequestHandler = async ({ request }) => {
  switch (request.method) {
    case RequestEnum.UpdateParams:
      return await snap.request({
        method: 'snap_manageState',
        params: {
          operation: 'update',
          newState: { store: request.params as UpdateRequestParams },
          encrypted: false,
        },
      });
    case RequestEnum.RemoveParams:
      return await snap.request({
        method: 'snap_manageState',
        params: {
          operation: 'clear',
          encrypted: false,
        },
      });
    default:
      throw new Error('Method not found.');
  }
};

export const onInstall: OnInstallHandler = async () => {
  await snap.request({
    method: 'snap_dialog',
    params: {
      type: 'alert',
      content: panel([
        heading('Thank you for installing Degen Watch snap'),
        text(
          'To use this Snap, visit the companion dapp at [metamask.io](https://metamask.io).',
        ),
      ]),
    },
  });
};
