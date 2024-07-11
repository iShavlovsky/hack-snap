import type { ReactNode } from 'react';
import { createContext, useContext, useEffect, useState } from 'react';

import type { UpdateRequestParams } from '../../../../types/requests';
import { getLocalStorage, setLocalStorage } from '../utils/localStorage';

type StateParamsType = {
  whatToFarm: UpdateRequestParams;
  dexScreneer: UpdateRequestParams;
  birdEye: UpdateRequestParams;
};

type StateType = {
  params: StateParamsType;
  handleParams: (
    key: keyof StateParamsType,
    param: StateParamsType[keyof StateParamsType][number],
  ) => void;
  resetStore: () => void;
};

const initialStateParams = {
  whatToFarm: [],
  dexScreneer: [],
  birdEye: [],
};

const getInitialState = () => {
  const params = getLocalStorage('params');
  return params ? JSON.parse(params) : initialStateParams;
};

export const StateContext = createContext<StateType>({
  params: {
    whatToFarm: [],
    dexScreneer: [],
    birdEye: [],
  },
  handleParams: () => {},
  resetStore: () => {},
});

export const StateProvider = ({ children }: { children: ReactNode }) => {
  const [params, setParams] = useState<StateType['params']>(getInitialState());

  const handleParams: StateType['handleParams'] = (key, param) => {
    if (params[key]?.includes(param)) {
      setParams((prevState) => ({
        ...prevState,
        [key]: prevState[key].filter((item) => item !== param),
      }));
    } else {
      setParams((prevState) => ({
        ...prevState,
        [key]: [...prevState[key], param],
      }));
    }
  };

  useEffect(() => {
    setLocalStorage('params', JSON.stringify(params));
  }, [params]);

  const resetStore = () => {
    setParams(initialStateParams);
  };

  return (
    <StateContext.Provider value={{ params, handleParams, resetStore }}>
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => {
  return useContext(StateContext);
};
