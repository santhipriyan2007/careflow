import API from "./api";

export const getAllLogs = async () => {
  const response = await API.get("/treatmentlogs");
  return response.data;
};

export const getLogById = async (id) => {
  const response = await API.get(
    `/treatmentlogs/${id}`
  );
  return response.data;
};

export const createLog = async (logData) => {
  const response = await API.post(
    "/treatmentlogs",
    logData
  );
  return response.data;
};

export const updateLog = async (
  id,
  logData
) => {
  const response = await API.put(
    `/treatmentlogs/${id}`,
    logData
  );
  return response.data;
};

export const deleteLog = async (id) => {
  const response = await API.delete(
    `/treatmentlogs/${id}`
  );
  return response.data;
};