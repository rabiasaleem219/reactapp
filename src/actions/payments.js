import { endPoints } from "const/endPoints";
import { fetchWithToken } from "helpers/fetch";

//*Create payment */

export const startCreatePayment = async (value) => {
  const resp = await fetchWithToken(
    `${endPoints.create_payment}`,
    value,
    "PUT"
  );
  const body = await resp.json();
  return body;
};

//*Get payment */

export const startGetAllPayments = async () => {
  const resp = await fetchWithToken(`${endPoints.get_all_payments}`, {}, "GET");
  const body = await resp.json();
  return body;
};

export const startGetAllPaymentsForCharts = async (value) => {
  const resp = await fetchWithToken(
    `${endPoints.get_all_payments_for_charts}`,
    value,
    "GET"
  );
  const body = await resp.json();
  return body;
};

//*Payment Approved */

export const startPaymentApproved = async (paymentId) => {
  const resp = await fetchWithToken(
    `${endPoints.payment_approved}/${paymentId}`,
    {},
    "PUT"
  );
  const body = await resp.json();
  return body;
};

//*Payment Rejected */

export const startPaymentRejected = async (paymentId) => {
  const resp = await fetchWithToken(
    `${endPoints.payment_rejected}/${paymentId}`,
    {},
    "PUT"
  );
  const body = await resp.json();
  return body;
};
