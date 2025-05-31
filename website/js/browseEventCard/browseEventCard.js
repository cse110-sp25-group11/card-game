import { template } from "./browseEventCardTemplate.js";
import { styles } from "./browseEventCardStyles.js";

class BrowseEventCard extends HTMLElement {
    constructor() {
        super();
        let shadowElem = this.attachShadow({ mode: "open" });
        const article = document.createElement("article");
        article.className = "browse-event-card";
        const style = document.createElement("style");
        style.innerHTML = `${styles}`;
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
        article.innerHTML = `${template(data)}`;
    }
}

customElements.define("browse-event-card", BrowseEventCard);
