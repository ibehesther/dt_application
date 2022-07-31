const express = require("express");
const multer = require("multer");
const {ObjectId} = require("mongodb");
const {v4 : uuidv4} = require('uuid');
const { db } = require("./models");

const upload = multer({ dest: 'images'});
const app = express();
const Event = db.collection('events');


app.use(express.json());

// Gets an event by its unique id
app.get('/api/v3/app/events', async(req, res) => {
    var _id = req.query.id;
    const {type, limit, page} = req.query;
    if(_id){
        try{
            _id = ObjectId(_id)
            const event = await Event.find({_id}).toArray();
            if(event.length > 0){
                res.send(event);
            }else{
                throw new Error();
            }
        }catch(err) {
            res.status(404).send(err);
        }
    }
    else{
        const startPage = (page - 1) * limit;
        const endPage = startPage + limit;
        if (type == "latest"){
            var events = await Event.find().sort({_id: -1}).toArray();
        }else{
            var events = await Event.find().sort({_id: 1}).toArray();
        }
        events = events.slice(startPage, endPage);
        console.log(events)
        res.send({events});
    }

});

// Creates a new event and returns the id of the newly created event
app.post("/api/v3/app/events", upload.single('files[image]'), (req, res) => {
    var {attendees, rigor_rank} = req.body;
    req.body.uid = uuidv4();
    req.body.rigor_rank = parseInt(rigor_rank);
    req.body.attendees =  eval('(' + attendees + ')');
    try{
        Event.insertOne(req.body, (err, result) => {
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
});

// Updates an entire event with new data
app.put('/api/v3/app/events/:id', upload.single('files[image]'), async(req, res) => {
    const _id = ObjectId(req.params.id);
    var {rigor_rank, attendees} = req.body;
    req.body.rigor_rank = parseInt(rigor_rank);
    req.body.attendees = eval('(' + attendees + ')');
    console.log(req.body.attendees)
    try{
        const updated_event = await Event.updateOne({_id}, {$set: {
            ...req.body
        }});
       res.send(updated_event);
    }catch(err){
        res.status(400).send(err);
    }
});

// Delete event by unique id
app.delete('/api/v3/app/events/:id', async(req, res) => {
    const _id = ObjectId(req.params.id);
    try{
        const event = await Event.deleteOne({_id});
        if (event.deletedCount !== 0){
            res.send('Event deleted successfully!');
        }else{
            throw new Error;
        }
    }catch(err){
        res.status(404).send(err);
    }
});

module.exports = app;