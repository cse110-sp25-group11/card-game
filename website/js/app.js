/**
 * Example function to show an alert when the button is clicked.
 * @returns {void}
 */
function handleClick() {
    alert("Button clicked!");
}

/**
 * updates the specific data in localStorage given the key.
 * If it doesn't exist, it will create it
 * @param {string} key the key of the data
 * @param {Object} newData the new details for an event
 * @returns {void}
 */
function updateLocalStorage(key, newData) {
    // returns of a key or data was not passed in
    if (!key) return;
    if (!newData || typeof newData !== "object") return;

    // check whether all values inside newData are valid
    if (!checkValidEvent(newData)) return;

    // grab the current data for the key
    // the data will be an array of stringified JSON formmatted Object
    let currentData = JSON.parse(localStorage.getItem(key));

    // if it existing data not found, upload the newData right away
    if (!currentData) {
        localStorage.setItem(key, JSON.stringify([newData]));
        console.log("No data found. Uploading current data as first values.");
        return;
    }
    let eventFound = false;
    for (let event of currentData) {
        // if event is found, change details to newData
        if (event.name == newData.name) {
            eventFound = true;
            event = newData;
            console.log("Event details successfully changed");
        }
    }
    // if event not found, add it to our data
    if (!eventFound) {
        currentData.push(newData);
        console.log("Event not found. Successfully added event.");
    }
    // update our localStorage with modified event
    localStorage.setItem(key, JSON.stringify(currentData));
}

/**
 * Checks if all the entries for our event are valid
 * @param {Object} event the event we want to check
 * @returns {boolean} whether it is valid or not
 */
function checkValidEvent(event) {
    if (typeof event !== "object" || event === null) return false;

    const requiredFields = {
        name: "string",
        description: "string",
        date: "string",
        org: "string",
        imgLink: "string",
        imgAltText: "string",
        location: "string",
        food: "boolean",
        startTime: "string",
        endTime: "string",
    };

    for (let key in requiredFields) {
        if (!(key in event) || typeof event[key] !== requiredFields[key]) {
            return false;
        }
    }

    return true;
}

document.addEventListener("DOMContentLoaded", () => {
    const navButtons = document.querySelectorAll("nav button");
    if (navButtons.length >= 5) {
        navButtons[0].onclick = () => {
            window.location.href = "index.html";
        };
        navButtons[1].onclick = () => {
            window.location.href = "post.html";
        };
        navButtons[2].onclick = () => {
            window.location.href = "browse.html";
        };
        navButtons[3].onclick = () => {
            window.location.href = "liked.html";
        };
        navButtons[4].onclick = () => {
            window.location.href = "index.html";
        };
    }
});
export { checkValidEvent };
