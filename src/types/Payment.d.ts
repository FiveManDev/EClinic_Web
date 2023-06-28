export interface Payment {
  paymentID: string
  paymentAmount: number
  paymentTime: string
  paymentService: string
  author: Author
  isRefund: boolean
}
export type PaymentWithoutAuthor = Omit<Payment, "author">
export interface Refund {
  refundID: string
  refundAmount: number
  refundTime: string
  refundReason: string
  paymentService: string
}
export type RefundWithoutReason = Omit<Refund, "refundReason">
export interface RefundTransaction {
  paymentID: string
  reason: string
}
export interface Author {
  userID: string
  firstName: string
  lastName: string
  avatar: string
}
