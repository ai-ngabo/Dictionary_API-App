document.getElementById("job-search-form").addEventListener("submit", async (event) => {
    event.preventDefault();

    const searchTerm = document.getElementById("search-term").value;
    const location = document.getElementById("location").value;
    const resultsElement = document.getElementById("job-results");

    // Show loading message
    resultsElement.innerHTML = "<p>Loading jobs...</p>";

    // Prepare payload
    const payload = {
        search_term: searchTerm,
        location: location,
        results_wanted: 5,
        site_name: ["indeed", "linkedin", "zip_recruiter", "glassdoor"],
        distance: 50,
        job_type: "fulltime",
        is_remote: false,
        linkedin_fetch_description: false,
        hours_old: 72
    };

    try {
        // Send request to backend
        const response = await fetch("/api/jobs", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
        });

        const data = await response.json();

        if (data.error) {
            resultsElement.innerHTML = `<p style="color: red;">Error: ${data.error}</p>`;
        } else if (data.jobs && data.jobs.length > 0) {
            resultsElement.innerHTML = data.jobs.map(job => `
                <div class="job-card">
                    <h2>${job.job_title}</h2>
                    <p><strong>Company:</strong> ${job.company_name}</p>
                    <p><strong>Location:</strong> ${job.job_location}</p>
                    <p><a href="${job.job_link}" target="_blank">Apply Now</a></p>
                </div>
            `).join("");
        } else {
            resultsElement.innerHTML = "<p>No jobs found. Try a different search.</p>";
        }
    } catch (error) {
        console.error("Error fetching jobs:", error);
        resultsElement.innerHTML = "<p style='color: red;'>An error occurred. Please try again later.</p>";
    }
});

