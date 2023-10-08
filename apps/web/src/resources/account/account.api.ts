import { useMutation, useQuery } from 'react-query';

import queryClient from 'query-client';
import { apiService } from 'services';

import { userTypes } from 'resources/user';
import { User } from '../user/user.types';

export function useSignIn<T>() {
  const signIn = (data: T) => apiService.post('/account/sign-in', data);

  return useMutation<userTypes.User, unknown, T>(signIn, {
    onSuccess: (data) => {
      queryClient.setQueryData(['account'], data);
    },
  });
}

export function useSignOut() {
  const signOut = () => apiService.post('/account/sign-out');

  return useMutation(signOut, {
    onSuccess: () => {
      queryClient.setQueryData(['account'], null);
    },
  });
}

export function useSignUp<T>() {
  const signUp = (data: T) => apiService.post('/account/sign-up', data);

  interface SignUpResponse {
    signupToken: string;
  }

  return useMutation<SignUpResponse, unknown, T>(signUp);
}

export function useResendEmail<T>() {
  const resendEmail = (data: T) => apiService.post('/account/resend-email', data);

  return useMutation<{}, unknown, T>(resendEmail);
}

export function useGet(options? : {}) {
  const get = () => apiService.get('/account');

  return useQuery<userTypes.User>(['account'], get, options);
}

export function useUpdate<T>() {
  const update = (data: T) => apiService.put('/account', data);

  return useMutation<userTypes.User, unknown, T>(update);
}

export function useAddProductToCart<T>() {
  const addToCart = (data: T) => apiService.patch('/account/addToCart', data);

  return useMutation<User, unknown, T>(addToCart, {
    onSuccess: async () => {
      await queryClient.invalidateQueries(['account']);
    },
  });
}

export function useRemoveProductFromCart<T>() {
  const removeFromCart = (data: T) => apiService.patch('/account/removeFromCart', data);

  return useMutation<User, unknown, T>(removeFromCart, {
    onSuccess: async () => {
      await queryClient.invalidateQueries(['account']);
    },
  });
}
