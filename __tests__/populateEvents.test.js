import {
    generateSampleEvents,
    populateEvents,
} from "../website/js/populateEvents";

// clearing local storage
beforeEach(() => {
    localStorage.clear();
});

test("generate sample events returns three arrays of length 5", () => {
    const { happeningNow, upcomingEvents, popularEvents } =
        generateSampleEvents();

    expect(happeningNow).toHaveLength(5);
    expect(upcomingEvents).toHaveLength(5);
    expect(popularEvents).toHaveLength(5);
});

test("each generated event has the right properties and category", () => {
    const { happeningNow, upcomingEvents, popularEvents } =
        generateSampleEvents();

    // making a helper function
    const assertEventShape = (event, expectedCategory) => {
        expect(event).toEqual(
            expect.objectContaining({
                name: expect.any(String),
                description: expect.any(String),
                date: expect.any(String),
                org: expect.any(String),
                imgLink: expect.any(String),
                imgAltText: expect.any(String),
                location: expect.any(String),
                food: expect.any(Boolean),
                startTime: expect.any(String),
                category: expectedCategory,
            }),
        );
    };

    happeningNow.forEach((event) => assertEventShape(event, "happening-now"));
    upcomingEvents.forEach((event) => assertEventShape(event, "upcoming"));
    popularEvents.forEach((event) => assertEventShape(event, "popular"));
});

test("popular events writes each category and a combined events array", () => {
    populateEvents();

    // getting all types of events
    const happeningNow = JSON.parse(
        localStorage.getItem("happening-now-events"),
    );
    const upcoming = JSON.parse(localStorage.getItem("upcoming-events"));
    const popular = JSON.parse(localStorage.getItem("popular-events"));
    const allEvents = JSON.parse(localStorage.getItem("events"));

    // checking if each category has a length of at least 5
    expect(happeningNow).toHaveLength(5);
    expect(upcoming).toHaveLength(5);
    expect(popular).toHaveLength(5);

    // combined array should be the three arrays above concatenated
    expect(allEvents).toHaveLength(15);
    expect(allEvents.slice(0, 5)).toEqual(happeningNow);
    expect(allEvents.slice(5, 10)).toEqual(upcoming);
    expect(allEvents.slice(10, 15)).toEqual(popular);
});
