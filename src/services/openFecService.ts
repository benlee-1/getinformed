import axios from "axios";

const OPENFEC_BASE_URL = "https://api.open.fec.gov/v1";

export const fetchCandidates = async (zipCode: string) => {
  try {
    // Example: Derive state or other filters from ZIP code here if needed
    const state = "TX"; // Mocked example. Replace with actual logic.
    const response = await axios.get(`${OPENFEC_BASE_URL}/candidates/`, {
      params: {
        api_key: process.env.OPENFEC_API_KEY, // Load the API key from environment variables
        state: state, // Filter by state (mocked example)
        election_year: 2024, // Example filter for the election year
        office: "H", // Example filter for House of Representatives candidates
      },
    });

    return response.data.results; // Return results from API response
  } catch (error) {
    console.error("Error fetching candidates in OpenFecService.ts:", error);
    throw error;
  }
};
