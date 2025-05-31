export const template = (data) => `
    <img src = "${data.imgLink}" alt="${data.imgAlt}">
    <div class="nameAndOrg">
        <span class="eventName">${data.name}</span>
        <span class="org">${data.org}</span>
    </div>
    <p> Free food provided? ${data.food ? "Yes" : "No"} </p>
    <p>
        <time datetime="${data.date}">${data.date}</time>: 
        <time datetime="${data.startTime}">${data.startTime}</time> to
        <time datetime="${data.endTime}">${data.endTime}</time>
    </p>
    <p>${data.location}</p>
    <p class="eventDescription">${data.description}</p>
`;
