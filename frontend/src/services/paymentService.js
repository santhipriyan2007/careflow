import API from "./api";

export const getPayments = async () => {
  const response = await API.get("/payments");
  return response.data;
};

export const createPayment = async (paymentData) => {
  const response = await API.post(
    "/payments",
    paymentData
  );
  return response.data;
};

export const updatePayment = async (
  id,
  paymentData
) => {
  const response = await API.put(
    `/payments/${id}`,
    paymentData
  );
  return response.data;
};

export const deletePayment = async (id) => {
  const response = await API.delete(
    `/payments/${id}`
  );
  return response.data;
};