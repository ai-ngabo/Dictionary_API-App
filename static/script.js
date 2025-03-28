const ApiKey = '9c8a13e3-55ae-46ca-b10d-2f9a00892179'; 
const url = `https://dictionaryapi.com/api/v3/references/sd4/json/`;
const result = document.getElementById("result");
const sound = document.getElementById("sound");
const btn = document.getElementById("searcher");

btn.addEventListener("click", () => {
    let inpWord = document.getElementById("inp-word").value; 
    if (!inpWord) {
        result.innerHTML = "<p>Please enter a word!</p>";
        return;
    }

    fetch(`${url}${inpWord}?key=${ApiKey}`)
        .then((response) => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then((data) => {
            if (!data || data.length === 0) {
                result.innerHTML = "<p>No data found for the entered word!</p>";
                return;
            }

            const wordData = data[0];
            const word = wordData.meta.id || inpWord;
            const phonetic = wordData.hwi?.prs?.[0]?.mw || "N/A"; 
            const audio = wordData.hwi?.prs?.[0]?.sound?.audio || ""; 
            const definition = wordData.def?.[0]?.sseq?.[0]?.[0]?.[1]?.dt?.[0]?.[1] || "Definition not found";
            let example = "No example available";

            try {
              
                example = wordData.def?.[0]?.sseq?.[0]?.[0]?.[1]?.dt?.[1]?.[1]?.[0]?.t || "No example available";
            } catch (err) {
                console.warn("Example not found in response", err);
            }

        
            result.innerHTML = `
                <div class="word">
                    <button id="sound-button" onclick="playSound()">
                        <i class="fas fa-volume-up"></i>
                    </button> 
                    <h3>${word}</h3>
                </div>
                <div class="details">
                    <p>${phonetic}</p>
                </div>
                <p class="word-meaning">Definition: ${definition}</p>
                <p class="word-example">Eg: ${example}</p>`;

        
            sound.setAttribute("src", `https://media.merriam-webster.com/audio/prons/en/us/mp3/${audio.charAt(0)}/${audio}.mp3`);
        })
        .catch((error) => {
            console.error("Error fetching data:", error);
            result.innerHTML = `<p>Error fetching data for the word "${inpWord}". Please try again!</p>`;
        });
});

// Play sound function
function playSound() {
    sound.play();
}

