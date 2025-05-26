/**
 * Clears all key/value pairs from the browser's localStorage.
 *
 * @function deleteLocalStorage
 * @returns {void}
 */
function deleteLocalStorage() {
  localStorage.clear();
}

/**
 * Add item to localStorage if it doesn't already exist.
 * If the item already exists or key already pertains to antoher value, it will not be added.
 *
 * @function addToStorage
 * @param string key - The key to store in localStorage.
 * @param string value - The value to store in localStorage.
 * @returns {boolean} - Returns true if the item was added, false if it already exists.
 */
function addToStorage(key, value) {
  if (localStorage.getItem(key) === null) {
    localStorage.setItem(key, value);
    return true;
  }
  return false;
}
