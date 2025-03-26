# This is a flask server to host my web app
from flask import Flask, render_template

app = Flask(__name__) #Initializing the flask app

@app.route('/') # specifying the route(/) to access my Dictionary App
def index():
    return render_template('index.html') # Connecting Flask to my Html file

if __name__ == '__main__':
    app.run(debug=True) # Starting the server
