/**
 * updates the Carousel for one of 3 categories by fetching events from local storage.
 * If there arent enough events to turn pages, will console log and return
 * @param {string} category the category of the event carousel we want to update
 * @param {string} direction direction of movement (prev, next)
 * @returns {void}
 */
function changeCarousel(category, direction) {
	//grab container for events
	const currentID = category + "-event-cards";
	const eventCards = document.querySelector(currentID);

	// grab events array from local storage
	const eventsArr = localStorage.getItem(category);

	// grab the current first element
	const currentFirst = localStorage.getItem(category + "Number");
	const endIndex = 0;
	//checks if we can turn pages
	if(direction === "next") {
		if(currentFirst + 3 > eventsArr.length - 1) {
			console.log("Not enough events for next page");
			return;
		}
		currentFirst = currentFirst + 3;
		endIndex = Math.min(currentFirst + 2, eventsArr.length);
	}else if(direction === "prev"){
		if(currentFirst - 3 < 0) {
			console.log("Not enough events for prev page");
			return;
		}
		currentFirst = currentFirst - 3;
		endIndex = currentFirst + 2;
	}else {
		console.log("specify whether direction is next or prev");
		return;
	}
	// clears out all child elements
	eventCards.innerHTML = "";

	// add 3 new elements
	for(let i=currentFirst; i <= endIndex; i++) {

		const currentCardObj = eventsArr[i];
		const eventCard = document.createElement("event-card");
		eventCard.data = {
			name: currentCardObj.name,
			org: currentCardObj.org,
			location: currentCardObj.location,
			description: currentCardObj.description,
			date: currentCardObj.date,
			imgLink: currentCardObj.imgLink,
			imgAlt: currentCardObj.imgAlt,
			food: currentCardObj.food,
			startTime: currentCardObj.startTime,
			endTime: currentCardObj.endTime,
		}
		eventCards.appendChild(eventCard);
	}

	// sets the new first elemnent
	localStorage.setItem(category + "Number", currentFirst);
}