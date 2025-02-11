import axios from "axios";
import moment from "moment";

const API_URL = "/api/ports"; // Ensure this is the correct API route

export const fetchData = async (params = {}) => {
  try {
    const response = await axios.get(API_URL, { params });
    return response.data;
  } catch (error) {
    if (error.response && error.response.status === 500) {
      console.error("Server error:", error.response.data);
    } else {
      console.error("Error fetching data:", error);
    }
    throw error;
  }
};

export const createPort = async (port, setPorts) => {
  try {
    port.lastUpdated = moment().toISOString();
    port.address = port.address || "";
    await axios.post(API_URL, port);
    fetchData(setPorts);
  } catch (error) {
    if (error.response && error.response.status === 500) {
      console.error("Server error:", error.response.data);
    } else {
      console.error("Error creating port:", error.response ? error.response.data : error.message);
    }
  }
};

export const updatePort = async (id, port, setPorts) => {
  try {
    port.lastUpdated = moment().toISOString();
    port.address = port.address || "";
    await axios.put(`${API_URL}/${id}`, port);
    fetchData(setPorts);
  } catch (error) {
    if (error.response && error.response.status === 500) {
      console.error("Server error:", error.response.data);
    } else {
      console.error("Error updating port:", error.response ? error.response.data : error.message);
    }
  }
};

export const deletePort = async (id, setPorts) => {
  try {
    await axios.delete(`${API_URL}/${id}`);
    fetchData(setPorts);
  } catch (error) {
    if (error.response && error.response.status === 500) {
      console.error("Server error:", error.response.data);
    } else {
      console.error("Error deleting port:", error.response ? error.response.data : error.message);
    }
  }
};

export const getPorts = async () => {
  try {
    const response = await axios.get(API_URL);
    console.log("response data:", response);
    return response.data;
  } catch (error) {
    if (error.response && error.response.status === 500) {
      console.error("Server error:", error.response.data);
    } else {
      console.error("Error fetching ports:", error);
    }
    throw error;
  }
};

export const fetchUniqueValues = async () => {
  try {
    const response = await axios.get(`${API_URL}/uniqueValues`);
    return response.data;
  } catch (error) {
    if (error.response && error.response.status === 500) {
      console.error("Server error:", error.response.data);
    } else {
      console.error("Error fetching unique values:", error);
    }
    throw error;
  }
};
