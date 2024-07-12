import type { OptionType } from 'site/src/types';

type ResponseType = {
  [key: string]: any;
};

const getValueFromPath = <Type extends string>(
  object: ResponseType,
  path: Type,
) => {
  return path
    .split('.')
    .reduce(
      (acc, key) => (acc && acc[key] !== 'undefined' ? acc[key] : null),
      object,
    );
};

export const extractValues = <Type>(
  response: ResponseType,
  whatToFarm: OptionType<Type>[],
): OptionType<any>[] => {
  return whatToFarm
    .map((item: OptionType<Type>) => {
      const value = getValueFromPath(response, item.value as unknown as string);
      return {
        label: item.label,
        value: value === null ? undefined : value,
        ...(item.fixedNumber && { fixedNumber: item.fixedNumber }),
      };
    })
    .filter((item: OptionType<any>) => item.value !== undefined);
};
