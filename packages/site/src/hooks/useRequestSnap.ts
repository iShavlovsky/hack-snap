import { SnapRequestEnum } from '../../../../types/requests';
import { defaultSnapOrigin } from '../config';
import { useStateContext } from '../contexts/StateContext';
import type { Snap } from '../types';
import { useMetaMaskContext } from './MetamaskContext';
import { useRequest } from './useRequest';

/**
 * Utility hook to wrap the `wallet_requestSnaps` method.
 *
 * @param snapId - The requested Snap ID. Defaults to the snap ID specified in the
 * config.
 * @param version - The requested version.
 * @returns The `wallet_requestSnaps` wrapper.
 */
type UseRequestSnapReturnType = [
  () => Promise<void>,
  { isLoading: boolean; error: Error | null },
];

export const useRequestSnap = (
  snapId = defaultSnapOrigin,
  version?: string,
): UseRequestSnapReturnType => {
  const [request, { error, isLoading }] = useRequest();
  const { setInstalledSnap } = useMetaMaskContext();
  const { params } = useStateContext();
  /**
   * Request the Snap.
   */
  const requestSnap = async () => {
    const snaps = (await request({
      method: 'wallet_requestSnaps',
      params: {
        [snapId]: version ? { version } : {},
      },
    })) as Record<string, Snap>;
    setInstalledSnap(snaps?.[snapId] ?? null);
    if (params.whatToFarm.length) {
      await request({
        method: 'wallet_invokeSnap',
        params: {
          snapId,
          request: {
            method: SnapRequestEnum.UpdateParams,
            params: {
              fields: params.whatToFarm,
            },
          },
        },
      });
    }
    // Updates the `installedSnap` context variable since we just installed the Snap.
  };

  return [requestSnap, { error, isLoading }];
};
