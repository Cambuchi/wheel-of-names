// module for setting/retrieving data from local storage

// import the default data if no data exists to use as a placeholder
import defaultData from '../assets/data/users.json';

// set the local storage data to passed in data
const setLocalStorage = (itemName, data) => {
  localStorage.setItem(itemName, JSON.stringify(data));
};

// retrieve the local storage data
const retrieveLocalStorage = (itemName) =>
  JSON.parse(localStorage.getItem(itemName));

// higher level function used to determine if local storage is available
// https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API/Using_the_Web_Storage_API#feature-detecting_localstorage
function storageAvailable(type) {
  let storage;
  try {
    storage = window[type];
    const x = '__storage_test__';
    storage.setItem(x, x);
    storage.removeItem(x);
    return true;
  } catch (e) {
    return (
      e instanceof DOMException &&
      // everything except Firefox
      (e.code === 22 ||
        // Firefox
        e.code === 1014 ||
        // test name field too, because code might not be present
        // everything except Firefox
        e.name === 'QuotaExceededError' ||
        // Firefox
        e.name === 'NS_ERROR_DOM_QUOTA_REACHED') &&
      // acknowledge QuotaExceededError only if there's something already stored
      storage &&
      storage.length !== 0
    );
  }
}

// return the data based on local storage functioning or having pre-existing data
const retrieveData = (itemName) => {
  // check if there is a data in local storage, either list or null
  const cachedData = localStorage.getItem(itemName);
  // first check if local storage is available
  if (storageAvailable('localStorage')) {
    // if local storage is available, but empty, set default as data
    if (!cachedData) {
      setLocalStorage(itemName, defaultData);
      return defaultData;
      // if local storage exists, return that as the data
    }
    const stored = retrieveLocalStorage(itemName);
    return stored;

    // if no local storage available, just set data to be the default
  }
  return defaultData;
};

export { retrieveData, setLocalStorage };
