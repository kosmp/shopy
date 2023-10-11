import { useMutation } from 'react-query';
import { apiService } from 'services';
import { useRouter } from 'next/router';

export function useCreateSession<T>() {
  const router = useRouter();
  const createSession = (data: T) => apiService.post('/checkout/create-checkout-session', { checkOutData: data });

  return useMutation<{ sessionUrl: string }, unknown, T>(createSession, {
    onSuccess: (data) => router.push(data.sessionUrl),
  });
}
