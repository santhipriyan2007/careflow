import API from "./api";

export const getLeads = async () => {
  const response = await API.get("/leads");
  return response.data;
};

export const createLead = async (leadData) => {
  const response = await API.post("/leads", leadData);
  return response.data;
};

export const updateLead = async (id, leadData) => {
  const response = await API.put(`/leads/${id}`, leadData);
  return response.data;
};

export const deleteLead = async (id) => {
  const response = await API.delete(`/leads/${id}`);
  return response.data;
};