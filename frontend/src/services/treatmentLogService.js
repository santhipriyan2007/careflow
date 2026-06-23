import API from "./api";

export const getAllLogs = async () => {
  const response = await API.get("/treatment-logs");
  return response.data;
};

export const getLogById = async (id) => {
  const response = await API.get(
    `/treatment-logs/${id}`
  );
  return response.data;
};

export const createLog = async (logData) => {
  const response = await API.post(
    "/treatment-logs",
    logData
  );
  return response.data;
};

export const updateLog = async (
  id,
  logData
) => {
  const response = await API.put(
    `/treatment-logs/${id}`,
    logData
  );
  return response.data;
};

export const deleteLog = async (id) => {
  const response = await API.delete(
    `/treatment-logs/${id}`
  );
  return response.data;
};