import { AxiosResponse } from "axios"
import axiosClient from "shared/axios/httpClient"
import { URL_API } from "shared/constant/constant"
import { IServerResponse } from "types/server/IServerResponse"
import { IPaging } from "types/Pagination"
import {
  Payment,
  PaymentWithoutAuthor,
  Refund,
  RefundWithoutReason,
  RefundTransaction
} from "types/Payment"

class PaymentService {
  //Payment
  async getPaymentByID(paymentID: string) {
    const res: AxiosResponse = await axiosClient.get(
      `${URL_API.PAYMENT}/GetPaymentByID?PaymentID=${paymentID}`
    )
    return res.data as IServerResponse<Payment>
  }
  async getAllPaymentTransaction(data: IPaging) {
    const res: AxiosResponse = await axiosClient.get(
      `${URL_API.PAYMENT}/GetAllPaymentTransaction`,
      {
        headers: {
          PageNumber: data.pageNumber,
          PageSize: data.pageSize
        }
      }
    )
    return res as AxiosResponse<IServerResponse<PaymentWithoutAuthor[]>>
  }
  //Refund
  async getRefundByID(refundID: string) {
    const res: AxiosResponse = await axiosClient.get(
      `${URL_API.PAYMENT}/GetRefundByID?RefundID=${refundID}`
    )
    return res.data as IServerResponse<Refund>
  }
  async getAllRefundTransaction(data: IPaging) {
    const res: AxiosResponse = await axiosClient.get(
      `${URL_API.PAYMENT}/GetAllRefundTransaction`,
      {
        headers: {
          PageNumber: data.pageNumber,
          PageSize: data.pageSize
        }
      }
    )
    return res as AxiosResponse<IServerResponse<RefundWithoutReason[]>>
  }
  async refundTransaction(refundTrans: RefundTransaction) {
    console.log(
      "🚀 ~ file: payment.service.ts:54 ~ PaymentService ~ refundTransaction ~ refundTrans:",
      refundTrans
    )
    const res = await axiosClient.post(
      `${URL_API.PAYMENT}/RefundTransaction`,
      refundTrans
    )
    return res.data as IServerResponse<null>
  }
}

export const paymentService = new PaymentService()
