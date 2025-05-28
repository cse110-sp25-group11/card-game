import { checkValidEvent } from "../website/js/app.js";

/**
 * Testing function: {checkValidEvent}
 */
const validEvent = {
    name: "Team 11 Meeting",
    description: "team 11 standup meeting",
    date: "2025-21-2025",
    org: "Team 11",
    imgLink: "https://team11.com/image.jpg",
    imgAltText: "Tech Talk Banner",
    location: "CSE Basement",
    food: false,
    startTime: "14:00",
    endTime: "16:00",
}

test('returns true for a valid event', () => {
    expect(checkValidEvent(validEvent)).toBe(true);
});

test('returns false for missing description', () => {
    validEvent["description"] = [];
    expect(checkValidEvent(validEvent)).toBe(false);
});

test('returns false for missing org', () => {
    validEvent["org"] = [];
    expect(checkValidEvent(validEvent)).toBe(false);
});

test('returns false for imgLink', () => {
    validEvent["imgLink"] = [];
    expect(checkValidEvent(validEvent)).toBe(false);
});

test('returns false for imgAltText', () => {
    validEvent["imgAltText"] = [];
    expect(checkValidEvent(validEvent)).toBe(false);
});

test('returns false for location', () => {
    validEvent["location"] = [];
    expect(checkValidEvent(validEvent)).toBe(false);
});

test('returns false for food', () => {
    validEvent["food"] = [];
    expect(checkValidEvent(validEvent)).toBe(false);
});

test('returns false for food', () => {
    validEvent["food"] = [];
    expect(checkValidEvent(validEvent)).toBe(false);
});

test('returns false for missing date', () => {
    validEvent["date"] = [];
    expect(checkValidEvent(validEvent)).toBe(false);
});


test('returns false for null event', () => {
  expect(checkValidEvent(null)).toBe(false);
});

test('returns false for non-object event', () => {
  expect(checkValidEvent("not an object")).toBe(false);
});