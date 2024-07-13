export enum SnapRequestEnum {
  UpdateParams = 'update_params',
  RemoveParams = 'remove_params',
  SendParamsSuccess = 'send_params_success',
}

export type UpdateRequestParams = string[];

export type MockApiPairType = {
  id: number;
  selectedPair: TokenPairType;
  inv: boolean;
};

export enum TokenPairType {
  BhWeth = '0xf6d6d8AD2611832288FD0A0A0B77a81C7715aD0E',
  StgWeth = '0x72482cc775E9DD6245342f7042613a7036a0D2A0',
}
