import axios from "axios";

const API_URL = "http://localhost:3000/ports"; // JSON server URL

export default async function handler(req, res) {
  const { method } = req;

  if (method === "GET") {
    try {
      const { q, lastUpdatedFrom, lastUpdatedTo, _page = 1, _limit = 10, _sort, _order, country, city } = req.query;
      const response = await axios.get(API_URL);
      let data = response.data;

      // Apply search filter
      if (q) {
        data = data.filter(item =>
          Object.values(item).some(value =>
            value.toString().toLowerCase().includes(q.toLowerCase())
          )
        );
      }

      // Apply date filters
      if (lastUpdatedFrom) {
        data = data.filter(item => new Date(item.lastUpdated) >= new Date(lastUpdatedFrom));
      }

      if (lastUpdatedTo) {
        data = data.filter(item => new Date(item.lastUpdated) <= new Date(lastUpdatedTo));
      }

      // Apply country and city filters
      if (country) {
        data = data.filter(item => item.country.toLowerCase() === country.toLowerCase());
      }

      if (city) {
        data = data.filter(item => item.city.toLowerCase() === city.toLowerCase());
      }

      // Apply sorting
      if (_sort && _order) {
        data = data.sort((a, b) => {
          if (_order === "asc") {
            return a[_sort] > b[_sort] ? 1 : -1;
          } else {
            return a[_sort] < b[_sort] ? 1 : -1;
          }
        });
      }

      const totalItems = data.length;
      const totalPages = Math.ceil(totalItems / _limit);
      const startIndex = (_page - 1) * _limit;
      const endIndex = startIndex + _limit;
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
