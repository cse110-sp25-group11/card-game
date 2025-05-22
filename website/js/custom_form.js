window.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("custom-form");
  const food_radios = Array.from(form.elements["food"]); // converts to array 
  const food_details = document.getElementById("food-details");

  food_radios.forEach((radio) => {
    radio.addEventListener("change", () => {
      food_details.style.display =
        radio.value === "Yes" && radio.checked ? "block" : "none";
    });
  });

  form.addEventListener("submit", (e) => {
    e.preventDefault(); // this prevents page reload during submission

    // creating a eventData object to be stored in local storage
    const eventData = {
      event_name: form.elements["event-name"].value,
      org_name: form.elements["org-name"].value,
      date: form.elements["event-date"].value,
      duration: form.elements["duration"].value,
      location: form.elements["location"].value,
      short_description: form.elements["short-description"].value,
      long_description: form.elements["long-description"].value,
      food: form.elements["food"].value,
      foodDetails: form.elements["food-details"].value,
    };

    // Validate form data
    // If food is "Yes", then foodDetails is required
    if (eventData.food === "Yes" && !eventData.foodDetails) {
      alert("Please provide food details.");
      return;
    }

    // Minimum data lengths
    if (eventData.event_name.length < 3) {
      alert("Event name must be at least 3 characters.");
      return;
    }

    if (eventData.org_name.length < 2) {
      alert("Organization name must be at least 2 characters.");
      return;
    }

    const datePattern = /^\d{4}-\d{2}-\d{2}$/;
    if (!datePattern.test(eventData.date)) {
      alert("Please enter a valid date in YYYY-MM-DD format.");
      return;
    }

    // storing all this in local storage
    localStorage.setItem("postedEvent", JSON.stringify(eventData));

    // post submission
    alert("Event Submitted!");
    form.reset(); // resets the form
    food_radios.forEach((r) => (r.checked = false)); // unchecks all radios
    food_details.style.display = "none"; // hides the food-details box
  });
});
