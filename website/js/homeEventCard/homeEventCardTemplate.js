export const template = (data) => `
    <img src = "${data.imgLink}" alt="${data.imgAlt}">
    <div class="name-and-org">
        <span class="event-name">${data.name}</span>
        <span class="org-name">${data.org}</span>
    </div>
    <div class="info-section>
    <p class="food-status"> Free food provided? ${data.food ? "Yes" : "No"} </p>
    <p class="event-time">
        <time datetime="${data.date}">${data.date}</time>: 
        <time datetime="${data.startTime}">${data.startTime}</time> to
        <time datetime="${data.endTime}">${data.endTime}</time>
    </p>
    <p class="event-location">${data.location}</p>
    <p class="eventDescription">${data.description}</p>
    </div>
`;
