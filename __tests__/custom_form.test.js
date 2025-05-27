
beforeEach(async () => {
  localStorage.clear();
  document.body.innerHTML = `
    <form>
      <input id="eventName" name="eventName" value="test event" />
      <input id="orgName" name="orgName" value="test org" />
      <input id="date" name="date" value="04/01/2025" />
      <input id="duration" name="duration" value="2 hours" />
      <input id="location" name="location" value="ballroom" />
      <textarea id="description" name="description">description</textarea>

      <input type="radio" id="foodYes" name="food" value="yes" checked />
      <input type="radio" id="foodNo" name="food" value="no" />

      <input type="file" id="photo" />
      <div id="food-details"></div>

      <button type="submit" id="submit-button">Submit</button>
    </form>
  `;

  await import('../website/js/custom_form.js');
  document.dispatchEvent(new Event("DOMContentLoaded", { bubbles: true }));
});

test("Event data is stored in the local storage when the submit button is clicked", ()=>{
    const form = document.querySelector("form");

    // clicking the submit button
    document.querySelector("#submit-button").click();

    // getting the event from the local storage after submission
    const events = JSON.parse(localStorage.getItem("events"));

    // tests
    expect(events).not.toBeNull();
    expect(events.length).toBe(1);
    expect(events[0].eventName).toBe("test event");
    expect(events[0].orgName).toBe("test org");
    expect(events[0].food).toBe("yes");
})
