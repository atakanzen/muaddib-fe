import express from "express";
import path from "path";

import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.port || 8080;

// Serve static files from the "dist" directory
app.use(express.static(path.join(__dirname, "dist")));

// Fallback to index.html for React Router paths
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "dist", "index.html"));
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
