import { fetchData, addToStorage } from "../website/js/storage.js";

test("addToStorage rejects bad data", () => {
    expect(fetchData(null)).toStrictEqual([]);
    expect(fetchData()).toStrictEqual([]);
    expect(fetchData("junk")).toStrictEqual([]);
});

test("add data with key twice, should be false second time", () => {
    expect(addToStorage(null, "5")).toStrictEqual(true);
    expect(addToStorage(null, "5")).toStrictEqual(false);
});
