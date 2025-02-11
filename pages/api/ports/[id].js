import axios from "axios";

const API_URL = "http://localhost:3000/ports"; // JSON server URL

export default async function handler(req, res) {
  const { method } = req;
  const { id } = req.query;

  if (method === "PUT") {
    try {
      console.log("Request body:", req.body);
      const response = await axios.put(`${API_URL}/${id}`, req.body);
      console.log("Response data:", response.data);
      res.status(200).json(response.data);
    } catch (error) {
      console.error("Error updating data:", error.response ? error.response.data : error.message);
      res.status(500).json({ error: "Error updating data" });
    }
  } else if (method === "DELETE") {
    try {
      await axios.delete(`${API_URL}/${id}`);
      res.status(204).end();
    } catch (error) {
      console.error("Error deleting data:", error.response ? error.response.data : error.message);
      res.status(500).json({ error: "Error deleting data" });
    }
  } else {
    res.setHeader("Allow", ["PUT", "DELETE"]);
    res.status(405).end(`Method ${method} Not Allowed`);
  }
}
