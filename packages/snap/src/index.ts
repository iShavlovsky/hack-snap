import type {
  OnInstallHandler,
  OnRpcRequestHandler,
  OnTransactionHandler,
} from '@metamask/snaps-sdk';
import { heading, panel, text, divider } from '@metamask/snaps-sdk';

import { mock } from './mock-api';

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

  const analytics = mock;

  return {
    content: panel([
      heading('Token Analytics'),
      text(`post1: ${post1.title}`),
      divider(),
      text(`tokenAddress: ${tokenAddress}`),
      text(`amount: ${amount}`),
      divider(),
      text(`Token: ${analytics.pairInfo.ticker}`),
      text(`Liquidity: $${analytics.liquidity.toFixed(2)}`),
      text(`Market Cap: $${analytics.marketCap.toFixed(2)}`),
      text(`Price: $${analytics.price.toFixed(2)}`),
      text(`Price Change (24H): ${analytics.pricePercentCount.h24}%`),
      text(`DEX Transactions (24H): ${analytics.txsCount.h24}`),
      text(`Buys (24H): ${analytics.txsBuysCount.h24}`),
      text(`Sells (24H): ${analytics.txsSellsCount.h24}`),
      text(`Volume (24H): $${analytics.volumeCount.h24.toFixed(2)}`),
      text(`DEX: ${analytics.dex.name}`),
      text(`Network: ${analytics.network.name}`),
    ]),
  };
};

export const onInstall: OnInstallHandler = async () => {
  await snap.request({
    method: 'snap_dialog',
    params: {
      type: 'alert',
      content: panel([
        heading('Привте Мир'),
        text('Смотри доки [metamask.io](https://metamask.io).'),
      ]),
    },
  });
};

export const onRpcRequest: OnRpcRequestHandler = async ({
  origin,
  request,
}) => {
  // const analytics = mock;
  switch (request.method) {
    case 'hello':
      return await snap.request({
        method: 'snap_dialog',
        params: {
          type: 'alert',

          content: panel([
            text(`origin: ${origin}`),
            text(`request: ${JSON.stringify(request.params)}`),
          ]),
        },
      });

    default:
      throw new Error('Method not found.');
  }
};
