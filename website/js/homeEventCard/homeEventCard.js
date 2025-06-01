import { template } from "./homeEventCardTemplate.js";
import { styles } from "./homeEventCardStyles.js";

class EventCard extends HTMLElement {
    constructor() {
        super();
        let shadowElem = this.attachShadow({ mode: "open" });
        const article = document.createElement("article");
        article.className = "home-event-card";
        const style = document.createElement("style");
        style.innerHTML = `${styles}`;
        shadowElem.append(article);
        shadowElem.append(style);
    }

    /**
     * Called when the .data property is set on this element.
     *
     * For example:
     * let homeEventCard = document.createElement('home-event-card'); // Calls constructor()
     * homeEventCard.data = { foo: 'bar' } // Calls set data({ foo: 'bar' })
     *
     * @param {Object} data - The data to pass into the <home-event-card> must be of the
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
        article.innerHTML = `${template(data)}`;
    }
}

customElements.define("home-event-card", EventCard);
