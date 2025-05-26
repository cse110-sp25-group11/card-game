/*  Fetches data from local storageg and verifies that it is a valid JSON
 *  @param {data}
 *  @returns {int}
 */
function fetchData(data) {
  if (!data) {
    console.warn(`[!] Failed to parse "${data}"`);
    return [];
  }

  const rawdata = localStorage.getItem(data);
  if (!rawdata) {
    console.warn(`[!] Failed to parse "${data}"`);
    return [];
  }
  return JSON.parse(rawdata); // Return the parsed rawdata
}
