import { useQuery } from 'react-query';

import { apiService } from 'services';

import { Product } from './product.types';

export function useList<T>(params: T) {
  const list = () => apiService.get('/products', params);

  interface ProductListResponse {
    count: number;
    items: Product[];
  }

  return useQuery<ProductListResponse>(['products', params], list);
}
