import { defaultSnapOrigin } from '../config';
import { useRequest } from './useRequest';

export type InvokeSnapParams = {
  method: string;
  params?: Record<string, unknown>;
};

/**
 * Utility hook to wrap the `wallet_invokeSnap` method.
 *
 * @param snapId - The Snap ID to invoke. Defaults to the snap ID specified in the
 * config.
 * @returns The invokeSnap wrapper method.
 */

type UseInvokeReturnType = [
  (params: InvokeSnapParams) => Promise<unknown>,
  { isLoading: boolean; error: Error | null; isSuccess: boolean },
];

export const useInvokeSnap = (
  snapId = defaultSnapOrigin,
): UseInvokeReturnType => {
  const [request, { error, isLoading, isSuccess }] = useRequest();

  /**
   * Invoke the requested Snap method.
   *
   * @param params - The invoke params.
   * @param params.method - The method name.
   * @param params.params - The method params.
   * @returns The Snap response.
   */
  const invokeSnap = async ({ method, params }: InvokeSnapParams) => {
    await request({
      method: 'wallet_invokeSnap',
      params: {
        snapId,
        request: params ? { method, params } : { method },
      },
    });
  };

  return [invokeSnap, { error, isLoading, isSuccess }];
};
