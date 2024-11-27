import express, { Request, Response } from "express";
import { ParamsDictionary } from "express-serve-static-core";
import { ParsedQs } from "qs";
import { fetchCandidates } from "./services/openFecService";
import dotenv from "dotenv";
dotenv.config();

const app = express();

app.get("/api/candidates", async (req: Request, res: Response) => {
  const zipCode = req.query.zipCode as string;

  if (!zipCode) {
    // Respond with a 400 error if the ZIP code is missing
    res.status(400).send("a Zip code is required");
    return;
  }

  try {
    // Call your candidate fetching service (ensure it's implemented correctly)/
    const candidates: Record<string, any> = await fetchCandidates(zipCode);

    res.status(200).json({ candidates });
    return;
  } catch (error) {
    console.error("Error fetching candidates in Server.ts:", error);
    res.status(500).json({ error: "Failed to fetch candidate data in server" });
    return;
  }
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
