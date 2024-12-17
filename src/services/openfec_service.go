package services

import (
	"encoding/json"
	"fmt"
	"net/http"
	"os"
)

const openFECBaseURL = "https://api.open.fec.gov/v1"

func FetchCandidates(zipCode string) ([]interface{}, error) {
	apiKey := os.Getenv("OPENFEC_API_KEY")
	state := "TX" // TODO: Convert zipCode to state

	url := fmt.Sprintf("%s/candidates/?api_key=%s&state=%s&election_year=2024&office=H",
		openFECBaseURL, apiKey, state)

	resp, err := http.Get(url)
	if err != nil {
		return nil, err
	}
	defer resp.Body.Close()

	var result map[string]interface{}
	if err := json.NewDecoder(resp.Body).Decode(&result); err != nil {
		return nil, err
	}

	candidates, ok := result["results"].([]interface{})
	if !ok {
		return []interface{}{}, nil
	}
	return candidates, nil
} 