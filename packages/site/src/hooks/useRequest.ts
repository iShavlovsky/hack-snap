import type { RequestArguments } from '@metamask/providers';
import { useState } from 'react';

import { useMetaMaskContext } from './MetamaskContext';

export type Request = (params: RequestArguments) => Promise<unknown | null>;

/**
 * Utility hook to consume the provider `request` method with the available provider.
 *
 * @returns The `request` function.
 */
type UseRequestReturnType = [
  Request,
  {
    isLoading: boolean;
    error: Error | null;
    isSuccess: boolean;
    isError: boolean;
  },
];

enum AsyncState {
  Idle = 'idle',
  IsLoading = 'loading',
  IsSuccess = 'success',
  IsError = 'error',
}

export const useRequest = (): UseRequestReturnType => {
  const { provider, setError: setMetamaskError } = useMetaMaskContext();
  const [loadingState, setLoadingState] = useState(AsyncState.Idle);
  const [error, setError] = useState<Error | null>(null);
  /**
   * `provider.request` wrapper.
   *
   * @param params - The request params.
   * @param params.method - The method to call.
   * @param params.params - The method params.
   * @returns The result of the request.
   */
  const request: Request = async ({ method, params }) => {
    setLoadingState(AsyncState.IsLoading);
    try {
      const data =
        (await provider?.request({
          method,
          params,
        } as RequestArguments)) ?? null;

      setLoadingState(AsyncState.IsSuccess);
      error && setError(null);
      return data;
    } catch (requestError: any) {
      setMetamaskError(requestError);
      setLoadingState(AsyncState.IsError);
      setError(requestError);
      return null;
    }
  };

  return [
    request,
    {
      isLoading: loadingState === AsyncState.IsLoading,
      isSuccess: loadingState === AsyncState.IsSuccess,
      isError: loadingState === AsyncState.IsError,
      error,
    },
  ];
};
