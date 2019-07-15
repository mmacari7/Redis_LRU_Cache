const express = require("express");
const bluebird = require("bluebird");
const app = express();
const redis = require("redis");
const client = redis.createClient();

bluebird.promisifyAll(redis.RedisClient.prototype);
bluebird.promisifyAll(redis.Multi.prototype);


app.get("/api/people/history", (req, res) => {
    res.json({"test": "for now"})
})

app.get("/api/people/:id", (req, res) => {
    res.json({"test": "again"})
})


app.listen(3000, ()=> {
    console.log("Server started on port 3000");
})
