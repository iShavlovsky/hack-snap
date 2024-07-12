import { defaultSnapOrigin } from '../config';
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
    console.log(snaps);
    setInstalledSnap(snaps?.[snapId] ?? null);
    // Updates the `installedSnap` context variable since we just installed the Snap.
  };

  return [requestSnap, { error, isLoading }];
};
