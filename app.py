from flask import Flask, request, jsonify
import requests

app = Flask(__name__)

# API configuration
API_URL = "https://jobs-search-api.p.rapidapi.com/getjobs"
HEADERS = {
    "x-rapidapi-key": "b6b47bd245msh607ce92c7dc86b4p18cd62jsn8928279fedd2",
    "x-rapidapi-host": "jobs-search-api.p.rapidapi.com",
    "Content-Type": "application/json"
}

@app.route("/api/jobs", methods=["POST"])
def get_jobs():
    # Get payload data from the frontend
    payload = request.json

    try:
        # Send POST request to RapidAPI
        response = requests.post(API_URL, json=payload, headers=HEADERS)
        response.raise_for_status()
        return jsonify(response.json())  # Return job data to frontend
    except requests.exceptions.RequestException as e:
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(debug=True)

