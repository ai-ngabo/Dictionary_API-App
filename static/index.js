document.getElementById("get-data").addEventListener("click", async () => {
    const outputElement = document.getElementById("output");

    // Clear previous content and show loading message
    outputElement.innerHTML = "<p>Loading data...</p>";

    try {
        const response = await fetch("/get-data");
        const data = await response.json();

        // Check for an error in the returned data
        if (data.error) {
            outputElement.innerHTML = `<p style="color: red;">Error: ${data.error}</p>`;
        } else {
            // Format the output as a list for better readability
            outputElement.innerHTML = formatDataAsHTML(data);
        }
    } catch (error) {
        console.error("Error fetching data:", error);
        outputElement.innerHTML = "<p style='color: red;'>An error occurred. Please try again.</p>";
    }
});

// Helper function to format data as HTML
function formatDataAsHTML(data) {
    let formatted = "<ul>";
    for (const [key, value] of Object.entries(data)) {
        formatted += `<li><strong>${key}:</strong> ${value}</li>`;
    }
    formatted += "</ul>";
    return formatted;
}

