// Gets the dummy data from people.js
const people = require("./people");

// Single function to resolve to a promise finding a person in the data set
getById = ((id) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            // Search for the person with the id only if it is within range
            // If the id is not undefined, is an integer and is in between 1 and the length of the persons list, we resolve
            if(id !== undefined && Number.isInteger(id) && id > 0 && id <= people.length) {
                resolve(people[id-1])
            }
            else {
                reject(new Error("Error, user with that ID was not found in data set"))
            }
        }, 5000);
    })
})

module.exports = getById