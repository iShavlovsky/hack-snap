import type { AxiosResponse } from 'axios';

import type { PairResponseType } from '../../../../mock/mockApi';
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
      const response = await http.get<AxiosResponse<PairResponseType>>(
        `pair-stat/${slug}`,
        {
          params: { inv, route },
        },
      );
      return response.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async fetchTableData() {
    try {
      const response = await http.get('chart/pair/history');
      return response.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}

export default new ApiService();
