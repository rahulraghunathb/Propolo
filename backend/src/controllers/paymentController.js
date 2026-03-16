import { listPayments, updatePaymentStatus } from "../services/paymentService.js";

export function getPayments(request, response, next) {
  try {
    response.json({
      data: listPayments(request.query.month)
    });
  } catch (error) {
    next(error);
  }
}

export function patchMarkPaid(request, response, next) {
  try {
    response.json({
      data: updatePaymentStatus(Number(request.params.tenantId), request.body?.paymentMonth)
    });
  } catch (error) {
    next(error);
  }
}
