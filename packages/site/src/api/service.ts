import type { PairResponseType } from '../../../../mock/mockApi';
import type { MockApiPairType } from '../../../../types/requests';
import type { TableDataResp } from '../types';
import http from './config';

class ApiService {
  async fetchPairData({
    slug,
    inv,
    route = '01',
  }: {
    slug: string;
    inv: boolean;
    route?: string;
  }) {
    try {
      const response = await http.get<PairResponseType>(`pair-stat/${slug}`, {
        params: { inv, route },
      });
      return response.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async fetchTableData({
    slug,
    ...params
  }: {
    slug: string;
    page: number;
    size: number;
    inv: boolean;
  }) {
    try {
      const response = await http.get<TableDataResp>(
        `pair-order-book/${slug}`,
        {
          params,
        },
      );
      return response.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async fetchCurrentPair() {
    try {
      const { data } = await axios.get<MockApiPairType[]>(
        `https://669276ed346eeafcf46d0217.mockapi.io/chain-pair/get-chain-pair`,
      );
      return data[0];
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async changeCurrentPair(body: Pick<MockApiPairType, 'inv' | 'selectedPair'>) {
    try {
      const { data } = await axios.put(
        `https://669276ed346eeafcf46d0217.mockapi.io/chain-pair/get-chain-pair/1`,
        { ...body },
      );
      return data.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}

export default new ApiService();
