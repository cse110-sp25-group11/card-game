import "../website/js/custom_form.js";

// added to remote error
window.HTMLElement.prototype.scrollIntoView = function () {};

const form = `
<form>
  <div class="form-group">
    <label for="eventName">Event Name <span class="required-asterisk">*</span></label>
    <input id="eventName" name="eventName" required />
  </div>

  <div class="form-group">
    <label for="orgName">Organization Name <span class="required-asterisk">*</span></label>
    <input id="orgName" name="orgName" required />
  </div>

  <div class="form-group">
    <label for="date">Date <span class="required-asterisk">*</span></label>
    <input id="date" name="date" type="date" required />
  </div>
  
  <div class="form-group">
    <label for="startTime">Start Time <span class="required-asterisk">*</span></label>
    <input id="startTime" name="startTime" type="time" required />
  </div>
  
  <div class="form-group">
    <label for="endTime">End Time <span class="required-asterisk">*</span></label>
    <input id="endTime" name="endTime" type="time" required />
  </div>
  
  <div class="form-group">
    <label for="location">Location <span class="required-asterisk">*</span></label>
    <input id="location" name="location" required />
  </div>
  
  <div class="form-group">
    <label for="description">Description <span class="required-asterisk">*</span></label>
    <textarea id="description" name="description" required></textarea>
  </div>

  <div class="form-group food-group">
    <label>Will you provide food? <span class="required-asterisk">*</span></label>
    <input type="radio" name="food" value="yes" /> Yes
    <input type="radio" name="food" value="no" /> No
    <div id="foodDetails" style="display:none;">Number of servings:</div>
  </div>

  <div class="form-group">
    <label for="photo">Photo</label>
    <input id="photo" name="photo" type="file" />
    <span id="fileNameDisplay">No file chosen</span>
  </div>

  <div class="form-group">
    <label for="altText">Alt Text</label>
    <input id="altText" name="altText" />
  </div>

  <button id="submitButton" type="submit">Submit</button>
</form>
`;

beforeEach(() => {
    document.body.innerHTML = form;

    //clearing localStorage
    localStorage.clear();

    // so that the other functions load
    window.dispatchEvent(new Event("DOMContentLoaded"));
});

test("food details is hidden to begin with", () => {
    const yes = document.querySelector("input[name='food'][value='yes']");
    const no = document.querySelector("input[name='food'][value='no']");
    const details = document.getElementById("foodDetails");

    expect(details.style.display).toBe("none");

    // checking the behavior when yes is checked
    yes.checked = true;
    yes.dispatchEvent(new Event("change"));
    expect(details.style.display).toBe("block");

    // checking the behavior when no is checked
    no.checked = true;
    no.dispatchEvent(new Event("change"));
    expect(details.style.display).toBe("none");
});

test("blurring empty required field shows error message", () => {
    const input = document.getElementById("eventName");
    input.value = "";
    input.dispatchEvent(new Event("blur"));

    // checking has container error -- from GitHub
    const container = input.closest(".form-group");
    expect(container.classList.contains("has-error")).toBe(true);

    const error = container.querySelector(".error-message");
    expect(error).not.toBeNull();
    expect(error.textContent).toMatch(/Event Name is required/);
});

test("submitting without selecting food shows radio-group error", () => {
    const form = document.querySelector("form");
    form.dispatchEvent(
        new Event("submit", { bubbles: true, cancelable: true }),
    );

    const group = document.querySelector(".food-group");
    expect(group.classList.contains("has-error")).toBe(true);
    expect(group.querySelector(".radio-group-error")).not.toBeNull();
});

test("successful submit saves everything to local stoage and shows the successful message", () => {
    document.getElementById("eventName").value = "test event";
    document.getElementById("orgName").value = "test org";
    document.getElementById("date").value = "2025-06-10";
    document.getElementById("startTime").value = "10:00";
    document.getElementById("endTime").value = "11:00";
    document.getElementById("location").value = "ballroom";
    document.getElementById("description").value = "test description";

    // selecting yes
    const yes = document.querySelector('input[name="food"][value="yes"]');
    yes.checked = true;
    yes.dispatchEvent(new Event("change"));

    // submitting the form
    document.getElementById("submitButton").click();

    // checking local storage
    const events = JSON.parse(localStorage.getItem("events"));
    expect(events).toHaveLength(1);
    expect(events[0].eventName).toBe("test event");
    expect(events[0].startTime).toBe("10:00");
    expect(events[0].description).toBe("test description");

    // checking for the successful message
    const message = document.querySelector(".success-message");
    expect(message).not.toBeNull();
    expect(message.textContent).toContain("Event Successfully Posted!");
});
