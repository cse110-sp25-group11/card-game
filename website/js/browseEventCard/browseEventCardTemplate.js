export const template = (data) => `
    <div class="photo-container">
            <img src="${data.imgLink}" alt="${data.altText}"/>
    </div>
    <div class="event-info">
        <h3>${data.name}</h3>
        <h3>${data.org}</h3>
        <h3>${data.food}</h3>
    </div>
`;
