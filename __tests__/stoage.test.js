import { fetchData, addToStorage } from "../website/js/storage.js";

// clearing local storage
beforeEach(() => {
    localStorage.clear();
});

test("fetchData rejects bad data", () => {
    expect(fetchData(null)).toStrictEqual([]);
    expect(fetchData()).toStrictEqual([]);
    expect(fetchData("junk")).toStrictEqual([]);
});

// clearing local storage
beforeEach(() => {
    localStorage.clear();
});

test("fetchData accepts good data", () => {
    expect(addToStorage("5","5")).toStrictEqual(true);
    expect(fetchData("5")).toStrictEqual(5);
});

// clearing local storage
beforeEach(() => {
    localStorage.clear();
});

test("add data with key twice, should be false second time", () =>{
    expect(addToStorage(null,"5")).toStrictEqual(true);
    expect(addToStorage(null,"5")).toStrictEqual(false);
});
