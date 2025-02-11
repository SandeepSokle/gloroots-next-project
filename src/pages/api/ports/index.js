import axios from "axios";

const API_URL = "http://localhost:3000/ports"; // JSON server URL

export default async function handler(req, res) {
  const { method } = req;

if (method === "GET") {
    try {
        const { q, lastUpdatedFrom, lastUpdatedTo, page = 1, limit = 10 } = req.query;
        const response = await axios.get(API_URL, { params: req.query });
        let data = response.data;

        if (q) {
            data = data.filter(item =>
                Object.values(item).some(value =>
                    value.toString().toLowerCase().includes(q.toLowerCase())
                )
            );
        }
        if (lastUpdatedFrom) {
            data = data.filter(item => new Date(item.lastUpdated) >= new Date(lastUpdatedFrom));
        }

        if (lastUpdatedTo) {
            data = data.filter(item => new Date(item.lastUpdated) <= new Date(lastUpdatedTo));
        }

        const totalItems = data.length;
        const totalPages = Math.ceil(totalItems / limit);
        const startIndex = (page - 1) * limit;
        const endIndex = startIndex + limit;
        const paginatedData = data.slice(startIndex, endIndex);

        res.status(200).json({ data: paginatedData, totalPages });
    } catch (error) {
        console.error("Error fetching data:", error);
        res.status(500).json({ error: "Error fetching data" });
    }
} else if (method === "POST") {
    try {
      console.log("Request body:", req.body);
      const response = await axios.post(API_URL, req.body);
      console.log("Response data:", response.data);
      res.status(201).json(response.data);
    } catch (error) {
      console.error("Error creating data:", error.response ? error.response.data : error.message);
      res.status(500).json({ error: "Error creating data" });
    }
  } else {
    res.setHeader("Allow", ["GET", "POST"]);
    res.status(405).end(`Method ${method} Not Allowed`);
  }
}
