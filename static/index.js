/*
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
}"""
*/
document.getElementById("get-data").addEventListener("click", async () => {
    const outputElement = document.getElementById("output");
    outputElement.innerHTML = "<p>Loading data...</p>"; // Show loading indicator

    try {
        const response = await fetch("https://dummyjson.com/users");
        const data = await response.json();

        if (data.users && data.users.length > 0) {
            let formattedUsers = "<ul>";
            data.users.forEach(user => {
                formattedUsers += `
                    <li>
                        <strong>Name:</strong> ${user.firstName} ${user.lastName}<br>
                        <strong>Age:</strong> ${user.age}<br>
                        <strong>Email:</strong> ${user.email}<br>
                        <strong>Phone:</strong> ${user.phone}
                    </li><br>
                `;
            });
            formattedUsers += "</ul>";
            outputElement.innerHTML = formattedUsers; // Render formatted users
        } else {
            outputElement.innerHTML = "<p>No users found!</p>";
        }
    } catch (error) {
        console.error("Error fetching data:", error);
        outputElement.innerHTML = "<p style='color: red;'>An error occurred. Please try again later.</p>";
    }
});

