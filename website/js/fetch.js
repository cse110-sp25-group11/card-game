/*  @param {data} 
 *  @returns {int}
 */
function fetechData(data) {
	const rawdata = localStorage.getItem(data);
	if (!rawdata){
        console.warn(`[!] Failed to parse "${data}"`);
        return [];
    } 
    return JSON.parse(raw);
}