export const template = (data) => `
    <img src = "${data.imgLink}" alt="${data.imgAltText}">
    <div class="name-and-org">
        <span class="event-name">${data.name}</span>
        <span class="org-name">${data.org}</span>
    </div>
    <div class="info-section">
    <p class="event-time">
    <span class="date-time-line">
        <time class="event-date" datetime="${data.date}"><i class="fa-solid fa-calendar-days"></i> ${data.date}</time>
        <span class="event-time-range">
        <time datetime="${data.startTime}"> <i class="fa-solid fa-clock"></i> ${data.startTime}</time> to
        <time datetime="${data.endTime}">${data.endTime}</time>
        </span>
    </span>
    </p>
    <p class="event-location"> <i class="fa-solid fa-location-dot"></i> Location: ${data.location}</p>
    <p class="food-status"> <i class="fa-solid fa-utensils"></i> Food: ${data.food ? "Yes" : "No"} </p>
    <p class="event-description">${data.description}</p>
    </div>
`;
