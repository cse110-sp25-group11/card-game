class EventCard extends HTMLElement{
    constructor () {
        super();
        let shadowElem = this.attachShadow({mode: 'open'}); 
        const article = document.createElement("article");
        const style = document.createElement("style");
        // TODO: insert style for event card below
        style.innerHTML = ``;
        shadowElem.append(article);
        shadowElem.append(style);
    }

    set data(data){
        if (!data) return;
        const article = this.shadowRoot.querySelector("article");
        article.innerHTML = ``;
    }
}

customElements.define("event-card", EventCard);