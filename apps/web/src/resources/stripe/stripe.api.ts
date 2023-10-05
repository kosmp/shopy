import { useMutation } from 'react-query';
import { apiService } from 'services';

export function useCreateSession<T>() {
  const createSession = (data: T) => apiService.post('/stripe/create-checkout-session', data);

  interface CreateSessionResponse {
    price: string;
    quantity: number;
  }

  return useMutation<CreateSessionResponse[], unknown, T>(createSession);
}
