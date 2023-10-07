import { useQuery } from 'react-query';
import { apiService } from 'services';

import { HistoryCheckoutItem } from './payment.types';

export function useGetPaymentHistory() {
  const getPaymentHistory = () => apiService.get(
    'payments/get-history',
  );

  return useQuery<HistoryCheckoutItem[]>(['paymentHistory'], getPaymentHistory);
}
