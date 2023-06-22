import { useMutation, useQuery } from "@tanstack/react-query"
import { QUERY_KEYS } from "shared/constant/constant"
import { IPaging } from "types/Pagination"
import { paymentService } from "../../../services/payment.service"
import { RefundTransaction } from "types/Payment"

//payment
export const useGetPaymentByIDQuery = (paymentID: string) => {
  const queryKey = [QUERY_KEYS.PAYMENT, paymentID]
  return useQuery({
    queryKey,
    queryFn: () => paymentService.getPaymentByID(paymentID)
  })
}
export const useGetAllPaymentTransactionQuery = (data: IPaging) => {
  const queryKey = [QUERY_KEYS.PAYMENT, data.pageNumber, data.pageSize]
  return useQuery({
    queryKey,
    queryFn: () =>
      paymentService.getAllPaymentTransaction({
        pageNumber: data.pageNumber,
        pageSize: data.pageSize
      })
  })
}
//refund
export const useGetRefundByIDQuery = (refundID: string) => {
  const queryKey = [QUERY_KEYS.PAYMENT, refundID]
  return useQuery({
    queryKey,
    queryFn: () => paymentService.getRefundByID(refundID)
  })
}
export const useGetAllRefundTransactionQuery = (data: IPaging) => {
  const queryKey = [QUERY_KEYS.PAYMENT, data.pageNumber, data.pageSize]
  return useQuery({
    queryKey,
    queryFn: () =>
      paymentService.getAllRefundTransaction({
        pageNumber: data.pageNumber,
        pageSize: data.pageSize
      })
  })
}
export const useRefundTransactionMutation = () => {
  const refundTransaction = useMutation({
    mutationFn: (refundTrans: RefundTransaction) =>
      paymentService.refundTransaction(refundTrans)
  })

  return refundTransaction
}
