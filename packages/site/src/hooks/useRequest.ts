import type { RequestArguments } from '@metamask/providers';
import { useCallback, useState } from 'react';

import { useMetaMaskContext } from './MetamaskContext';

export type Request = (params: RequestArguments) => Promise<unknown | null>;

/**
 * Utility hook to consume the provider `request` method with the available provider.
 *
 * @returns The `request` function.
 */
type UseRequestReturnType = [
  Request,
  { isLoading: boolean; error: Error | null },
];

export const useRequest = (): UseRequestReturnType => {
  const { provider, setError: setMetamaskError } = useMetaMaskContext();
  const [isLoading, setIsLoading] = useState(false);
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
    setIsLoading(true);
    try {
      const data =
        (await provider?.request({
          method,
          params,
        } as RequestArguments)) ?? null;

      setIsLoading(false);
      error && setError(null);
      return data;
    } catch (requestError: any) {
      setMetamaskError(requestError);
      setIsLoading(false);
      setError(requestError);
      return null;
    }
  };

  return [request, { isLoading, error }];
};
