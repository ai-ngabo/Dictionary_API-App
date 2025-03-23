document.getElementById("get-data").addEventListener("click", async () => {
    try {
        const response = await fetch("/get-data");
        const data = await response.json();
        if (data.error) {
            document.getElementById("output").innerText = `Error: ${data.error}`;
        } else {
            document.getElementById("output").innerHTML = JSON.stringify(data, null, 2);
        }
    } catch (error) {
        console.error("Error fetching data:", error);
        document.getElementById("output").innerText = "An error occurred. Please try again.";
    }
});
