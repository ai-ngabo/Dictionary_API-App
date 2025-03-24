#We start by importing the python libraries
from flask import Flask, render_template, request, jsonify
import requests
import os

app  = Flask(__name__)

#API information and Querries from rapidapi.com
URL = "https://hiring-manager-api.p.rapidapi.com/recruitment-manager-24h"
PARAMETERS = {
    "x-rapidapi-host": "hiring-manager-api.p.rapidapi.com",
    "x-rapidapi-key": "7cac25eb74msh7c408a9164ad5dap1f8899jsnb26f612d490c"
}

#Running my Application
@app.route("/")
def home():
    return render_template("index.html") # my web frontend file!

@app.route("/get-data", methods=["GET"])
def get_data():
        try:
            response = requests.get(URL, headers=PARAMETERS)
            response.raise_for_status() #Error when bad responses found
            data = response.json()
            return data # Sending data to frontend
        
        except requests.exceptions.RequestException as e:
            return jsonify({"error: str(e)"}), 500
        
        except requests.exceptions.HTTPError as e:
            return jsonify({"error": "HTTP error occurred", "details": str(e)}), 500
        
        except requests.exceptions.Timeout as e:
            return jsonify({"error": "Request timed out", "details": str(e)}), 500

        except requests.exceptions.RequestException as e:
            return jsonify({"error": "An error occurred", "details": str(e)}), 500


if __name__ == "__main__":
     app.run(debug=True)
