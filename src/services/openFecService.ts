import axios from "axios";

const OPENFEC_BASE_URL = "https://api.open.fec.gov/v1";

export const fetchCandidates = async (zipCode: string) => {
  try {
    const response = await axios.get(`${OPENFEC_BASE_URL}/candidates/`, {
      params: {
        api_key: process.env.OPENFEC_API_KEY,
        zip: zipCode, // Customize your filtering here
      },
    });
    return response.data.results; // Adjust based on the API's response structure
  } catch (error) {
    console.error("Error fetching candidates:", error);
    throw error;
  }
};
