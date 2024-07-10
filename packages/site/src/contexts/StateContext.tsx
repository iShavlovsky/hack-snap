import type { ReactNode } from 'react';
import { createContext, useContext, useEffect, useState } from 'react';

import type { UpdateRequestParams } from '../../../../types/requests';
import { getLocalStorage, setLocalStorage } from '../utils/localStorage';

type StateType = {
  params: UpdateRequestParams;
  handleParams: (param: StateType['params'][number]) => void;
};

const getInitialState = () => {
  const params = getLocalStorage('params');
  return params ? JSON.parse(params) : [];
};

export const StateContext = createContext<StateType>({
  params: [],
  handleParams: () => {},
});

export const StateProvider = ({ children }: { children: ReactNode }) => {
  const [params, setParams] = useState<StateType['params']>(getInitialState());

  const handleParams = (param: StateType['params'][number]) => {
    if (params.includes(param)) {
      setParams((preState) => preState.filter((item) => item !== param));
    } else {
      setParams((preState) => [...preState, param]);
    }
  };

  useEffect(() => {
    setLocalStorage('params', JSON.stringify(params));
  }, [params]);

  return (
    <StateContext.Provider value={{ params, handleParams }}>
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => {
  return useContext(StateContext);
};
