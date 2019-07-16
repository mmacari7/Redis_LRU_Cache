## Purpose

The purpose of this program is to demonstrate simplistic use of the caching functionality of Redis. We will make use of a data set of people, that are assigned an ID as well as other attributes in a JSON file. The getById method found in `data/datamodule.js` is intentionally set on a timer to return a promise with the person object after 5 seconds, as a means to demonstrate the difference between Redis cache and an actual fetch from the data set. The ID passed to the route `/api/people/:id`, if the ID is already cached in Redis we get the JSON object with that ID and return it to the browser, and we append the ID to the Redis cache last accessed list, ordered by most recently accessed. If the ID being passed is not in the Redis Cache, we append it to the Redis cache last accessed list, then we fetch the object from the data set, and we set the object in the Redis cache with key = id. `/api/people/history` sends a JSON array of the last 20 people who accessed the site, from the Redis cache last accessed list. We run through each of the Id's in the last accessed list, and for each ID we get the JSON object from the Redis Cache and set it to the JSON array that will be returned to the browser.

## `data`

The data directory of this project contains two different files.
One of the files is `people.js`, which contains a list of 1000 different people objects. 

The other is `datamodule.js`, which contains a single function to get a person from the peoples data by their ID.

## `server.js`

The purpose of this component is to serve our data using express via two different routes. 
The first route `/api/people/history` is responsible for displaying the current cache of up to 20 different recently accessed people from the data base. 
The second route `/api/people/:id` is responsible for getting the person with ID from the cache, if they are cached. Otherwise we fetch the person from the data base and then add them to the cache. 

All the caching is done using Redis, and all routing using Express. 

## Run

To use the program make sure you are in the root project directory. 

Using Node.js run `npm install` to install all of the dependencies. 

Then run `npm start` which will begin running the server to demonstrate the program. 

Included also in the package.json is a script for flush.js

## `server.js`

Npm start will start the server.js. Server.js contains the code to start our express server, and adds all the routes. 

## `flush.js`

Flush.js is a simple script containing code to flush the Redis client of all data from the ram. To flush the ram run the command: `npm run flush`.