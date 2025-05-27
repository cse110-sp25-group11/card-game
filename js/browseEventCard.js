class BrowseEventCard extends HTMLElement {
  constructor() {
    super();
    let shadowElem = this.attachShadow({ mode: "open" });
    const article = document.createElement("article");
    article.className = "browse-event-card";
    const style = document.createElement("style");
    style.innerHTML = `
        .browse-event-card 
        {
            flex: 0 0 30%;
            scroll-snap-align: start;
            border: 1px solid #ddd;
            border-radius: 10px;
            background: white;
            padding: 10px;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
            min-width: 250px;
        }
        .photo-container 
        {
            width: 100%;
            height: 150px;
            background-color: #eee;
            border-radius: 6px;
            overflow: hidden;
        }
        .photo-container img 
        {
            width: 100%;
            height: 100%;
            object-fit: cover;
        }
        .event-info 
        {
            margin-top: 10px;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        .event-info h3 
        {
            margin: 0;
            font-size: 1rem;
        }
    `;
    shadowElem.append(article);
    shadowElem.append(style);
  }

  /**
   * Called when the .data property is set on this element.
   *
   * For example:
   * let browseEventCard = document.createElement('browse-event-card'); // Calls constructor()
   * browseEventCard.data = { foo: 'bar' } // Calls set data({ foo: 'bar' })
   *
   * @param {Object} data - The data to pass into the <browse-event-card> must be of the
   *                        following format:
   *                        {
   *                          name: "string",
   *                          description: "string",
   *                          date: "string",
   *                          org: "string",
   *                          imgLink: "string",
   *                          imgAltText: "string",
   *                          location: "string",
   *                          food: "boolean",
   *                          startTime: "string",
   *                          endTime: "string",
   *                        }
   */

  set data(data) {
    if (!data) return;
    const article = this.shadowRoot.querySelector("article");
    article.innerHTML = `
        <div class="photo-container">
            <img src="${data.imgLink}" alt="${data.altText}"/>
        </div>
        <div class="event-info">
            <h3>${data.name}</h3>
            <h3>${data.org}</h3>
            <h3>${data.food}</h3>
        </div>
    `;
  }
}

customElements.define("browse-event-card", BrowseEventCard);
