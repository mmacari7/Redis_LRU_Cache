// Michael Macari
const express = require("express");
const getById = require("./data/datamodule")
const bluebird = require("bluebird");
const app = express();
const redis = require("redis");

// Promisify all of redis for asynchronousy 
bluebird.promisifyAll(redis);

// Starts our Redis client
const client = redis.createClient();
// Creates a key for the list of people ID's being stored in Redis
const visitedKey = "persons:id:list"

// Route for getting the persons history
app.get("/api/people/history", async (req, res) => {
    
    let last20List;
    try{
        last20List = await client.lrangeAsync(visitedKey, 0, 19);
    }
    catch(e){
        res.send({status: e.message})
        return;
    }

    let resArr = [];
    // Fetch each person in the cache based on the history array Id's
    for(let i=0; i < last20List.length; i++){
        let person = await client.getAsync(last20List[i]);
        resArr.push(JSON.parse(person));
    }
    // Send resulting array of past 20 people to browser
    res.json(resArr);
    return;
})

// Route for search a person in the data set / redis cache
app.get("/api/people/:id", async (req, res) => {
    // Check if the user has a cache entry in redis
    let IdExist = await client.existsAsync(req.params.id);
    // If the person with the ID is in the cache, then we get them from the cache
    // Send to browser
    if(IdExist === 1){
        let result = await client.getAsync(req.params.id);
        let person = JSON.parse(result);

        // Add id to the visited list
        await client.lpushAsync(visitedKey, req.params.id);
        res.json(person);
    }
    // Otherwise if it does not exist. We need to get the person from the data set
    // Put the person into redis and add them to the visited list
    else {
        let person;
        try{
            person = await getById(parseInt(req.params.id));
        }
        catch(e){
            res.send({status: e.message});
            return;
        }

        let personString = JSON.stringify(person);
        await client.setAsync(req.params.id, personString);
        await client.lpushAsync(visitedKey, req.params.id);
        res.json(person);

    }
    return;
})


app.listen(3000, ()=> {
    console.log("Server started on port 3000");
})
