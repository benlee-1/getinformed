import express, { Request, Response } from "express";
import { fetchCandidates } from "./services/openFecService";

const app = express();
const PORT = 3000;

app.use(express.json());

app.get("/api/candidates", async (req: Request, res: Response) => {
  // Explicitly define the query parameter type for TypeScript safety
  const zipCode = req.query.zipCode as string;

  if (!zipCode) {
    // Respond with a 400 error if the ZIP code is missing
    return res.status(400).json({ error: "ZIP code is required" });
  }

  try {
    // Call your candidate fetching service (ensure it's implemented correctly)
    const candidates = await fetchCandidates(zipCode);

    // Return the result in JSON format
    return res.status(200).json({ candidates });
  } catch (error) {
    console.error("Error fetching candidates:", error);
    return res.status(500).json({ error: "Failed to fetch candidate data" });
  }
});

//start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
