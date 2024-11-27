import express, { Request, Response } from "express";

const app = express();
const PORT = 3000;

// Middleware to parse JSON
app.use(express.json());

// Define a simple route
app.get("/", (req: Request, res: Response) => {
  res.send("Home sweet home!");
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});