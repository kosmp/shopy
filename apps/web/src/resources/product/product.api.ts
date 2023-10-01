import { useMutation, useQuery } from 'react-query';
import queryClient from 'query-client';
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

export function useUploadProduct<T>() {
  const uploadProduct = (data: T) => apiService.post('/products', data);

  return useMutation<Product, unknown, T>(uploadProduct, {
    onSuccess: (data) => {
      queryClient.setQueryData(['products'], data._id);
    },
  });
}

export function useRemoveProduct(id: string) {
  const removeProduct = () => apiService.delete(`/products/${id}`);

  return useMutation<Product>(removeProduct, {
    onSuccess: async () => {
      await queryClient.invalidateQueries(['products']);
    },
  });
}
