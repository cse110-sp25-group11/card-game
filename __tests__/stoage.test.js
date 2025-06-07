import { fetchData } from "../website/js/storage.js";

test("addToStorage rejects bad data", () => {
    expect(fetchData(null)).toStrictEqual([]);
});