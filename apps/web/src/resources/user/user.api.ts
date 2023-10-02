import { useMutation, useQuery } from 'react-query';

import { apiService } from 'services';

import queryClient from 'query-client';
import { User } from './user.types';

export function useList<T>(params: T) {
  const list = () => apiService.get('/users', params);

  interface UserListResponse {
    count: number;
    items: User[];
    totalPages: number;
  }

  return useQuery<UserListResponse>(['users', params], list);
}

export function useAddProductToCart<T>() {
  const addToCart = (data: T) => apiService.patch('/users/addToCart', data);

  return useMutation<User, unknown, T>(addToCart, {
    onSuccess: (data) => {
      queryClient.setQueryData(['account'], data._id);
    },
  });
}

export function useRemoveProductFromCart<T>() {
  const removeFromCart = (data: T) => apiService.patch('/users/removeFromCart', data);

  return useMutation<User, unknown, T>(removeFromCart, {
    onSuccess: async () => {
      await queryClient.invalidateQueries(['account']);
    },
  });
}
