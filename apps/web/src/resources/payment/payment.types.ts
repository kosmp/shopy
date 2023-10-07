export enum PaymentStatus {
  PAID = 'paid',
  COMPLETE = 'complete',
  EXPIRED = 'expired',
}

export interface HistoryCheckoutItem {
  createdDate: Date,
  productList: {
    priceId: string,
    quantity: number,
  }[],
  payment_status: PaymentStatus,
}
