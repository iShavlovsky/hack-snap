import type { AxiosResponse } from 'axios';
import type { TableDataItem } from 'src/types';

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

  async fetchTableData({
    slug,
    ...params
  }: {
    slug: string;
    page: number;
    size: number;
  }) {
    try {
      const response = await http.get<
        AxiosResponse<{
          list: TableDataItem[];
          page: { page: number; size: number; total: number };
        }>
      >(`pair-order-book/${slug}`, {
        params,
      });
      return response.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}

export default new ApiService();
