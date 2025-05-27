test("Event card renders the correct data into the shadow dom", async ()=>{
    await import('../website/js/EventCard.js');

    const eventCard = document.createElement("event-card");

    const testCard = {
        name: "test card",
        description: "testing discussion",
        date: "2025-01-01",
        org: "testing club",
        imgLink: "image.jpg",
        imgAlt: "talk poster",
        location: "ballroom",
        food: true,
        startTime: "2:00",
        endTime: "5:00"
    }

    eventCard.data = testCard;

    document.body.appendChild(eventCard);

    const shadow = eventCard.shadowRoot;

    console.log(shadow);
    console.log(shadow.querySelector("img").alt);

    expect(shadow.querySelector(".eventName").textContent).toBe("test card");
    expect(shadow.querySelector(".org").textContent.trim()).toBe("testing club");
    expect(shadow.querySelector(".eventDescription").textContent).toContain("testing discussion");
    expect(shadow.querySelector("img").src).toContain("image.jpg");
    expect(shadow.querySelector("img").alt).toBe("talk poster");
    expect(shadow.querySelector("p").textContent).toContain("Yes");
})