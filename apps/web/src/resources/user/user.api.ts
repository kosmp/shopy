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

export function useUpdateProductsInCart<T>() {
  const update = (data: T) => apiService.patch('/users', data);

  return useMutation<User, unknown, T>(update, {
    onSuccess: (data) => {
      queryClient.setQueryData(['users'], data._id);
    },
  });
}
