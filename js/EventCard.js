class EventCard extends HTMLElement {
  constructor() {
    super();
    let shadowElem = this.attachShadow({ mode: "open" });
    const article = document.createElement("article");
    const style = document.createElement("style");
    style.innerHTML = ``;
    shadowElem.append(article);
    shadowElem.append(style);
  }

  /**
   * Called when the .data property is set on this element.
   *
   * For example:
   * let eventCard = document.createElement('event-card'); // Calls constructor()
   * eventCard.data = { foo: 'bar' } // Calls set data({ foo: 'bar' })
   *
   * @param {Object} data - The data to pass into the <recipe-card> must be of the
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
        <img src = ${data.imgLink} alt=${data.imgAlt}>
        <div class="nameAndOrg">
            <span class="eventName">${data.name}</span>
            <span class="org">${data.org} </span>
        </div>
        <p> Free food provided? ${data.food ? "Yes" : "No"} </p>
        <p>
            <time datetime=${data.date}>${data.date}</time>: 
            <time datetime=${data.startTime}>${data.startTime}</time> to
            <time datetime=${data.endTime}>${data.endTime}</time>
        </p>
        <p>${data.location}</p>
        <p class="eventDescription"> ${data.description}</p>
    `;
  }
}

customElements.define("event-card", EventCard);
