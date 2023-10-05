export interface HistoryColumnsData {
  productName: string,
  productPrice: number,
  purchaseDate: Date,
  imageUrl: string,
}

export interface CheckOutData {
  productId: string,
  priceId: string,
  productPrice: number,
  pickedQuantity: number,
}
