const API_KEY =
  "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";

document.getElementById("travelForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const destination = document.getElementById("destination").value;
  const startDate = document.getElementById("startDate").value;
  const endDate = document.getElementById("endDate").value;

  // Show loading spinner
  document.getElementById("loading").classList.remove("hidden");
  document.getElementById("results").classList.add("hidden");

  try {
    const response = await fetch(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${API_KEY}`,
          // "HTTP-Referer": "<YOUR_SITE_URL>", // Optional. Site URL for rankings on openrouter.ai.
          // "X-Title": "<YOUR_SITE_NAME>", // Optional. Site title for rankings on openrouter.ai.
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "deepseek/deepseek-r1:free",
          messages: [
            {
              role: "user",
              content: `Create a brief travel itinerary for ${destination} from ${startDate} to ${endDate}. 
        Requirements:
              - Maximum 3 activities per day
              - Each activity description should be 3-4 words maximum
              - Format as simple text with each line as: Day number | Time | Activity
              - Times should be in format like "9 AM" or "2 PM"
              - Do not include any special characters or formatting
              Example format:
              Day 1 | 9 AM | Visit Central Park
              Day 1 | 2 PM | Shopping at Mall
              
              Day 2 | 10 AM | Beach Swimming`,
            },
          ],
        }),
      }
    );
    

    const data = await response.json();

    // Hide loading spinner
    document.getElementById("loading").classList.add("hidden");

    // Process and display results
    const itineraryBody = document.getElementById("itineraryBody");
    if (
      !data.choices ||
      !data.choices[0] ||
      !data.choices[0].message ||
      !data.choices[0].message.content
    ) {
      throw new Error("Invalid response from AI API");
    }
    const content = data.choices[0].message.content;

    // Clear previous content
    itineraryBody.innerHTML = "";

    // Split content into lines and filter out unwanted lines
    const lines = content
      .split("\n")
      .filter(
        (line) =>
          line.trim() &&
          !line.includes("\\boxed") &&
          !line.includes("undefined") &&
          !line.includes("{") &&
          !line.includes("}")
      );

    // Create table rows
    lines.forEach((line) => {
      if (line.trim()) {
        const [day, time, activity] = line
          .split("|")
          .map((item) => item.trim());
        // Only create row if all values are present and valid
        if (day && time && activity) {
          const row = document.createElement("tr");
          row.innerHTML = `
            <td>${day}</td>
            <td>${time}</td>
            <td>${activity}</td>
          `;
          itineraryBody.appendChild(row);
        }
      }
    });

    document.getElementById("results").classList.remove("hidden");
  } catch (error) {
    console.error("Error:", error);
    document.getElementById("loading").classList.add("hidden");
    alert(
      "An error occurred while generating your itinerary. Please try again."
    );
  }
});
