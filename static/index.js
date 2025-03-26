
// I start by adding an event listener to search button
document.getElementById("searchButton").addEventListener("click", () => {
    const word = document.getElementById("wordInput").value; // when button is clicked, the function will execute
    
    // when input field is empty, show Alert!
    if (!word) {
      alert("Enter a word please!!!"); // notifying user to enter the word
      return; //exit to avoid empty search
    }
    
    // Variable to hold the Url for requesting the API
    const URL = `https://lingua-robot.p.rapidapi.com/language/v1/entries/en/${word}`;
    
    // parameters for confirmation from the Api sources including key and host information
    const headers = {
      "x-rapidapi-key": "b6b47bd245msh607ce92c7dc86b4p18cd62jsn8928279fedd2",
      "x-rapidapi-host": "lingua-robot.p.rapidapi.com"
    }; 
  
    //Using fetch function to make a request to the API by url and parameters
    fetch(URL, { headers })
      .then(response => {
        //check if response from Api is successful (200)
        if (!response.ok) {
          throw new Error("Word not found!"); // if not throw error
        }
        return response.json(); // Parse the response if successfull!
      })
      .then(data => {
        // Get results div where definitions will be displayed
        const resultsDiv = document.getElementById("results");
        resultsDiv.innerHTML = "";
        
        // Extract entries from APi response
        const entries = data.entries;

        //Check if no entries found
        if (entries.length === 0) {
          resultsDiv.innerHTML = "<p>No definitions found, search another word!.</p>";
          return; //exit the function
        }
  
        // loop through each entry in Api response
        entries.forEach(entry => {
            //  create h3 element for word and append it to thr results div
          const wordElement = document.createElement("h3");
          wordElement.textContent = `Word: ${entry.entry}`;
          resultsDiv.appendChild(wordElement);
        
          // loop through each lexem(the meaning) for the word
          entry.lexemes.forEach(lexeme => {
            //create paragraph element for definition and append it to the results div
            const definitionElement = document.createElement("p");
            definitionElement.textContent = `Definition: ${lexeme.senses[0]?.definition}`;
            resultsDiv.appendChild(definitionElement);
          });
        });
      })

      //Handling any errors that occur during the request or data processing
      .catch(err => {
        document.getElementById("results").innerHTML = `<p>${err.message}</p>`;
      });
  });
  
