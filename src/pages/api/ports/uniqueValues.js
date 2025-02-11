import axios from "axios";

const API_URL = "http://localhost:3000/ports"; // JSON server URL

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      const response = await axios.get(API_URL);
      const data = response.data;
      const countries = [...new Set(data.map(item => item.country))];
      const cities = [...new Set(data.map(item => item.city))];
      res.status(200).json({ countries, cities });
    } catch (error) {
      console.error("Error fetching unique values:", error);
      res.status(500).json({ error: "Error fetching unique values" });
    }
  } else {
    res.setHeader("Allow", ["GET"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
