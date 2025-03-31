# 📖 Alain's Dictionary API App

This dictionary part will be useful to people who don't know the definition of some words , where it will provide the sound and phonetics of how to pronounce the word, definition and an example.

![image alt](https://github.com/ai-ngabo/Dictionary_API-App/blob/7642d6f069283f3c12fca8357187d3f3b10b1172/app.png)

## 🧬 Features

✒️ **Searching** : The App fetches and Sort through the API data to allow user to get words, definitions and examples.

✒️**Sound** : The App provides the sound of the word searched by the user.

✒️**Phonetics**: The study and classification of speech sounds.

### 💻 App Technologies

 #### 🔐 Secured API 
  API to provides Access to Merriam Webster College Dictionary. [Visit their Web](https://dictionaryapi.com/products/api-collegiate-dictionary)

 #### 🛠️ Programming Languages
      ✔️HTM             ✔️CSS 
      ✔️JAVASCRIPT      ✔️PYTHON 

 #### 🚀 Deployed
   - Python Flask App
   - Web-01 Server
   - Web-02 Server
   - lb-01 Server/Load balancer

## 🪛 Setups and Installations
  
  #### 1. Cloning the Repository
   ```bash
   git clone https://github.com/ai-ngabo/Dictionary_API-App.git
   cd Dictionary_API-App/
   nano README.md
   ```
  #### 2. Creating .env & .gitignore files to hold API credentials
   ```bash
   nano .env
   ```
  #### 3. .gitignore file to hide admin files
   ```
   .env
   node_modules/
   package.json
   package-lock.json
   ```
  #### 4. Remove files visibility from Github
   ```bash
   git rm --cached .
   ```
### Deployment
 - Nginx Configuration on both servers web-01 and web-02

```
  server {
    listen 80;
    listen [::]:80;
    server_name dict.ai-ngabo.tech;

    root /var/www/Dictionary_API-App;
    index index.html;

    location / {
        try_files $uri $uri/ =404;
    }
  }
```
 - Haprox Configurations on the lb-01 Server

```
  frontend http_front
    bind *:80
    mode http
    default_backend http_back

backend http_back
    balance roundrobin
    server 6444-web-01 3.82.215.250:80 check
    server 6444-web-02 3.92.227.37:80 check
```
 - Flask App (Python)
```python
from flask import Flask, render_template

app = Flask(__name__) 

@app.route('/') 
def index():
    return render_template('index.html')

@app.route('/dictionary')
def dictionary():
    return render_template('dictionary.html') 
if __name__ == '__main__':
    app.run(debug=True) # Starting the server
```
### Significant Links
- Alain's Dictionary App [dict.ai-ngabo.tech](https://www.ai-ngabo.tech)
- My Linkedin Account [Visit Account](https://www.linkedin.com/in/ngabo-alain)
- App Tutorial on YouTube 👉[Video](https://youtu.be/fiExjF78uwQ)
