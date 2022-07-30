const express = require("express");
const multer = require("multer");
const {ObjectId} = require("mongodb");
const { db } = require("./models");

const upload = multer({ dest: 'images'});
const app = express();
const Event = db.collection('events');


app.use(express.json())

app.get('/api/v3/app/', (req, res) => {
    res.send("Working");
});

// Gets an event by its unique id
app.get('/api/v3/app/events', async(req, res) => {
    var _id = req.query.id;
    const {type, limit, page} = req.query;
    if(_id){
        try{
            _id= ObjectId(_id);
            const event = await Event.find({_id}).toArray();
            if(event.length > 0){
                res.send(event);
                // console.log(event)
            }else{
                throw new Error();
            }
        }catch(err) {
            res.status(404).send(err);
        }
    }else{
        const startPage = (page - 1) * limit;
        const endPage = startPage + limit;
        var events = await Event.find().sort({_id: -1}).toArray();
        events = events.slice(startPage, endPage);
        res.send({events})
    }
    

});

// Creates a new event and returns the id of the newly created event
app.post("/api/v3/app/events", upload.single('image'), (req, res) => {
    const {attendees, ...event_params} = req.body;

    try{
        Event.insertOne(event_params, (err, result) => {
            if(err){
                throw new Error();
            }
            res.send({
                "_id": result.insertedId
            }) 
        });
    }catch(err){
        res.status(400).send(err);
    }
})

// Updates an entire event with new data
app.put('/api/v3/app/events/:id', async(req, res) => {
    const _id = ObjectId(req.params.id);
    const {name, tagline, schedule, description, 
        moderator, category, sub_category, rigor_rank} 
    = req.body;
    try{
        const updated_event = await Event.updateOne({_id}, {$set: {
            name, tagline, schedule, description, 
            moderator, category, sub_category, rigor_rank
        }});
       res.send(updated_event)
    }catch(err){
        res.status(400).send(err);
    }
})

module.exports = app;