import { clearFieldError } from "../website/js/custom_form.js";

beforeEach(async () => {
    localStorage.clear();
    document.body.innerHTML = `
    <form>
      <div class="form-group food-group">
        <input id="eventName" name="eventName" value="test event" />
        <input id="orgName" name="orgName" value="test org" />
        <input id="date" name="date" value="04/01/2025" />
        <input id="startTime" name="startTime" value="10:00" />
        <input id="endTime" name="endTime" value="12:00" />
        <input id="location" name="location" value="ballroom" />
        <textarea id="description" name="description">description</textarea>
        <input id="altText" name="altText" value="test event photo" />

        <input type="radio" id="foodYes" name="food" value="yes" checked />
        <input type="radio" id="foodNo" name="food" value="no" />

        <input type="file" id="photo" />
        <!-- Added fileNameDisplay element to satisfy test and code expectations -->
        <div id="fileNameDisplay">No file chosen</div>
        <div id="foodDetails"></div>

        <button type="submit" id="submitButton">Submit</button>
      </div>
    </form>
  `;

    await import("../website/js/custom_form.js");
    document.dispatchEvent(new Event("DOMContentLoaded", { bubbles: true }));
});

test("Event data is stored in the local storage when the submit button is clicked", () => {
    // clicking the submit button
    document.querySelector("#submitButton").click();

    // getting the event from the local storage after submission
    const events = JSON.parse(localStorage.getItem("events"));

    // tests
    expect(events).not.toBeNull();
    expect(events.length).toBe(1);
    expect(events[0].eventName).toBe("test event");
    expect(events[0].orgName).toBe("test org");
    expect(events[0].food).toBe("yes");
});

test("clearFieldError should handle missing fieldContainer gracefully", () => {
    const mockField = document.createElement("input");
    mockField.classList.add("test-field");

    expect(() => clearFieldError(mockField)).not.toThrow();
});