import type { OptionType } from '../packages/site/src/types';

type ResponseType = {
  [key: string]: any;
};

const getValueFromPath = <T extends string>(
  object: ResponseType,
  path: T,
): any => {
  return path
    .split('.')
    .reduce(
      (acc, key) => (acc && acc[key] !== 'undefined' ? acc[key] : null),
      object,
    );
};

export const extractValues = <T>(
  response: ResponseType,
  whatToFarm: OptionType<T>[],
): OptionType<any>[] => {
  return whatToFarm
    .map((item: OptionType<T>) => {
      const value = getValueFromPath(response, item.value as string);
      return {
        label: item.label,
        value: value !== null ? value : undefined,
        ...(item.fixedNumber && { fixedNumber: item.fixedNumber }),
      };
    })
    .filter((item: OptionType<any>) => item.value !== undefined);
};
