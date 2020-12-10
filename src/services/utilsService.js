export const utilsService = {
    parseTimestamp,
    sortStringInObjects
}

function parseTimestamp(timestamp) {
    const parsedTime = new Date(timestamp)
    return parsedTime.toLocaleString()
}

function sortStringInObjects(a,b) {
        var nameA = a.name.toUpperCase(); // ignore upper and lowercase
        var nameB = b.name.toUpperCase(); // ignore upper and lowercase
        if (nameA < nameB) {
          return -1;
        }
        if (nameA > nameB) {
          return 1;
        }
      
        // names must be equal
        return 0;
      
}