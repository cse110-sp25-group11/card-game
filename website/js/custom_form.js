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

    // validate form data
    

    // storing all this in local storage
    localStorage.setItem("postedEvent", JSON.stringify(eventData));

    // post submission
    alert("Event Submitted!");
    form.reset(); // resets the form
    food_radios.forEach((r) => (r.checked = false)); // unchecks all radios
    food_details.style.display = "none"; // hides the food-details box
  });
});
