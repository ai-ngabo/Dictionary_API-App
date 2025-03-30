// Loading  .env file
require('dotenv').config();
const ApiKey = process.env.API_KEY; // Retrieve the value of Api Key 
//Setting variable to hold an api url
const url = `https://dictionaryapi.com/api/v3/references/sd4/json/`;

// Elements from html to be used when displaying the results
const result = document.getElementById("result");
const sound = document.getElementById("sound"); // audio element to play sound of searched word
const searchbtn = document.getElementById("searcher");

// Adding event listener to the search button for configuring cliks
searchbtn.addEventListener("click", () => {
    //variable to hold word to be inserted in html file
    let inpWord = document.getElementById("inp-word").value; 
    //Validation: did user entered the word?
    if (!inpWord) {
        result.innerHTML = "<p>Please enter a word!</p>"; //asking to enter a word on html file
        //if not we need to stop executing
        return; 
    }

    // Fetching data from the API - Request
    fetch(`${url}${inpWord}?key=${ApiKey}`)
        .then((response) => {
            // Hnadling Api servers error, 503 for unavailable service and 504 for timeout
            if (response.status === 503 || response.status === 504) {
                throw new Error("The Api is currently unavailable. try again later.");
            }
            // random HTTP Errors during Execution, the status will automatically appeal
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            //After all if no erro found , The response is converted to JSON
            return response.json();
        })
        .then((data) => {
            // checking the returned data
            if (!data || data.length === 0) {
                result.innerHTML = "<p>No data found for the entered word!</p>";
                return; // stop execution if no data found
            }

            // Extracting data from the response given by API
            const wordData = data[0]; // to generate first result
            const word = wordData.meta.id || inpWord; //Get word, or back to input
            const phonetic = wordData.hwi?.prs?.[0]?.mw || "N/A"; // fetching phonetics 
            const audio = wordData.hwi?.prs?.[0]?.sound?.audio || ""; //fetching the word sound
            const definition = wordData.def?.[0]?.sseq?.[0]?.[0]?.[1]?.dt?.[0]?.[1] || "Definition not found";// fetching the definition
            let example = "No example available"; // to be used as result when no definition found

            // Attemp to retrieve an example in a sentence
            try {
              
                example = wordData.def?.[0]?.sseq?.[0]?.[0]?.[1]?.dt?.[1]?.[1]?.[0]?.t || "No example available";
            } catch (err) {
                // It will throw an error if the program fails to get an example
                console.warn("Example not found", err);
            }

            //Updating the HTML fror displaying all found details
            result.innerHTML = `
                <div class="word">
                    <button id="sound-button" onclick="playSound()">
                        <i class="fas fa-volume-up"></i>
                    </button> 
                    <h3>${word}</h3>
                </div>
                <div class="details">
                    <p>word/${phonetic}/</p>
                </div>
                <p class="word-meaning">Definition: ${definition}</p>
                <p class="word-example">Eg: ${example}</p>`;

            // setting the source for word audio prononciation
            sound.setAttribute("src", `https://media.merriam-webster.com/audio/prons/en/us/mp3/${audio.charAt(0)}/${audio}.mp3`);
        })
        
        //Error handling during fetching
        .catch((error) => {
            console.error("Error fetching data:", error);
            result.innerHTML = `<p>Error fetching data for the word "${inpWord}". Please try another word!</p>`;
        });
});

// function to play that audio pronounciation
function playSound() {
    sound.play();
}

