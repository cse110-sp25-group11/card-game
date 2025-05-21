window.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("form");
  const foodRadios = Array.from(form.elements["food"]);
  const food_details = document.getElementById("food-details");

  foodRadios.forEach((radio) => {
    radio.addEventListener("change", () => {
      food_details.style.display =
        radio.value === "Yes" && radio.checked ? "block" : "none";
    });
  });

  form.addEventListener("submit", (e) => {
    e.preventDefault(); 

    const photoInput = document.getElementById("photo");
    const photoFile = photoInput.files[0];

    const eventData = {
      eventName: form.elements["eventName"].value,
      orgName: form.elements["orgName"].value,
      date: form.elements["date"].value,
      duration: form.elements["duration"].value,
      location: form.elements["location"].value,
      description: form.elements["description"].value,
      food: form.querySelector('input[name="food"]:checked').value,
      photoFileName: photoFile ? photoFile.name : null,
      timestamp: new Date().toISOString()
    };

    let events = JSON.parse(localStorage.getItem("events") || "[]");
    
    events.push(eventData);
    
    localStorage.setItem("events", JSON.stringify(events));

    alert("Event Successfully Posted!");
    form.reset(); 
    foodRadios.forEach((r) => (r.checked = false)); 
    food_details.style.display = "none"; 
  });
});
