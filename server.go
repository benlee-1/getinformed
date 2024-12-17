package main

import (
	"encoding/json"
	"log"
	"net/http"
	"os"

	"github.com/joho/godotenv"
)

func main() {
	// Load .env file
	if err := godotenv.Load(); err != nil {
		log.Printf("Warning: .env file not found: %v", err)
	}

	http.HandleFunc("/api/candidates", handleCandidates)

	port := os.Getenv("PORT")
	if port == "" {
		port = "3000"
	}

	log.Printf("Server running on http://localhost:%s", port)
	if err := http.ListenAndServe(":"+port, nil); err != nil {
		log.Fatal(err)
	}
}

func handleCandidates(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodGet {
		http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
		return
	}

	zipCode := r.URL.Query().Get("zipCode")
	if zipCode == "" {
		http.Error(w, "a Zip code is required", http.StatusBadRequest)
		return
	}

	candidates, err := fetchCandidates(zipCode)
	if err != nil {
		log.Printf("Error fetching candidates: %v", err)
		http.Error(w, "Failed to fetch candidate data", http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(map[string]interface{}{
		"candidates": candidates,
	})
}

func fetchCandidates(zipCode string) ([]interface{}, error) {
	// TODO: Implement actual API call to OpenFEC
	// For now, returning mock data
	mockCandidates := []interface{}{
		map[string]interface{}{
			"name": "John Doe",
			"party": "Independent",
		},
	}
	return mockCandidates, nil
} 