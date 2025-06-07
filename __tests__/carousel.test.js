beforeEach(async () =>{
    document.body.innerHTML = `
        <section class="event-carousel">
            <button class="prev">Prev</button>
            <div class="event-cards" style="overflow: auto; width: 500px;">
            <div style="width: 1000px; height: 100px;"></div> <!-- fake content -->
            </div>
            <button class="next">Next</button>
        </section>
    `;

    // importing the corresponding js file
    await import("../website/js/carousel.js");

    // beacuse the initializer is inside the DOM content loaded, I need to dispatch it manually for it to run
    document.dispatchEvent(new Event("DOMContentLoaded", { bubbles: true}));
})

test("arrowRight key triggers the ", ()=>{
    const eventCards = document.querySelector(".event-cards");
    
    // spying on the scroll by function
    const scrollBySpy = jest.spyOn(eventCards, "scrollBy");
    
    //activating the scroll by function
    const carousel = document.querySelector(".event-carousel");
    document.dispatchEvent(new KeyboardEvent("keydown", {
        key: "ArrowRight",
        bubbles: true
    }))

    // the test
    expect(scrollBySpy).toHaveBeenCalled();
})