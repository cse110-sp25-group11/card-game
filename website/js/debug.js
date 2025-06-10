/**
 * Clears all events from localStorage
 */
function clearEvents() {
    try {
        localStorage.removeItem("happening-now-events");
        localStorage.removeItem("upcoming-events");
        localStorage.removeItem("popular-events");
        localStorage.removeItem("events");
        localStorage.removeItem("liked-events");
        localStorage.removeItem("disliked-events");

        showStatusMessage("All events cleared from localStorage!", "success");
        showEventCounts();

        console.log("Debug: All events cleared from localStorage");
    } catch (error) {
        showStatusMessage(`Error clearing events: ${error.message}`, "error");
        console.error("Error clearing events:", error);
    }
}
// Example addition
/**
 * Shows current event counts in localStorage
 */
function showEventCounts() {
    try {
        const happeningNow = JSON.parse(
            localStorage.getItem("happening-now-events") || "[]",
        );
        const upcoming = JSON.parse(
            localStorage.getItem("upcoming-events") || "[]",
        );
        const popular = JSON.parse(
            localStorage.getItem("popular-events") || "[]",
        );
        const all = JSON.parse(localStorage.getItem("events") || "[]");
        const liked = JSON.parse(localStorage.getItem("liked-events") || "[]");
        const disliked = JSON.parse(
            localStorage.getItem("disliked-events") || "[]",
        );

        const countsHtml = `
      <h3>Current Event Counts:</h3>
      <ul style="text-align: left; display: inline-block;">
        <li>Happening Now: ${happeningNow.length} events</li>
        <li>Upcoming Events: ${upcoming.length} events</li>
        <li>Popular Events: ${popular.length} events</li>
        <li>All Events: ${all.length} events</li>
        <li>Liked Events: ${liked.length} events</li>
        <li>Disliked Events: ${disliked.length} events</li>
      </ul>
    `;

        document.getElementById("eventCounts").innerHTML = countsHtml;
    } catch (error) {
        document.getElementById("eventCounts").innerHTML =
            `<p style="color: #f44336;">Error reading event counts: ${error.message}</p>`;
        console.error("Error showing event counts:", error);
    }
}

/**
 * Shows status message to user
 * @param {string} message - The message to display
 * @param {string} type - The type of message ('success' or 'error')
 */
function showStatusMessage(message, type) {
    const statusDiv = document.getElementById("statusMessage");
    statusDiv.innerHTML = `<div class="status-message ${type}">${message}</div>`;

    setTimeout(() => {
        statusDiv.innerHTML = "";
    }, 5000);
}

document.addEventListener("DOMContentLoaded", function () {
    showEventCounts();
    console.log("Debug utilities loaded. Access via /debug");
});
