// required imports
const express = require('express')
const postingsRouter = express.Router()
const Posting = require('../models/postingModel')

// CRUD routes for postings

// get all
postingsRouter.get('/', (req, res, next) => {
    Posting.find((err, postings) => {
        if(err) {
            res.status(500)
            return next(err)
        }
        return res.status(200).send(postings)
    })
})

// get by id
postingsRouter.get('/getone/:postingId', (req, res, next) => {
    Posting.findOne({_id: req.params.postingId}, (err, postingFound) => {
        if(err) {
            res.status(500)
            return next(err)
        }
        return res.status(200).send(postingFound)
    })
})

// get postings by user id
postingsRouter.get('/mypostings', (req, res, next) => {
    Posting.find({ user: req.user._id }, (err, postings) => {
        if(err) {
            res.status(500)
            return next(err)
        }
        return res.status(200).send(postings)
    })
})

// get by state
postingsRouter.get('/search/state', (req, res, next) => {
    console.log(req.query.state)
    Posting.find({ locationState: req.query.state }, (err, postings) => {
        if(err) {
            res.status(500)
            return next(err)
        }
        return res.status(200).send(postings)
    })
})

// get by city and state
postingsRouter.get(`/search/city/state`, (req, res, next) => {
    console.log(req.query.city)
    Posting.find({locationState: req.query.state, cityState: req.query.city}, (err, postings) => {
        if(err) {
            res.status(500)
            return next(err)
        }
        return res.status(200).send(postings)
    })
})

// make more filters!!

// post request
postingsRouter.post('/', (req, res, next) => {
    req.body.user = req.user._id
    const newPosting = new Posting(req.body)
    newPosting.save((err, savedPosting) => {
        if(err) {
            res.status(500)
            return next(err)
        }
        res.set('Access-Control-Allow-Origin', '*')
        return res.status(201).send(savedPosting)
    })
})

// put request
postingsRouter.put('/:postingId', (req, res, next) => {
    Posting.findOneAndUpdate(
        { _id: req.params.postingId, user: req.user._id }, // finds the posting
        req.body, // updates the posting with new data
        {new: true}, // sends back the updated version
        (err, updatedPosting) => {
            if(err) {
                res.status(500)
                return next(err)
            }
            return res.status(201).send(updatedPosting)
        }
    )
})

// delete request
postingsRouter.delete('/:postingId', (req, res, next) => {
    Posting.findOneAndDelete(
        { _id: req.params.postingId, user: req.user._id }, 
        (err, deletedPosting) => {
            if(err) {
                res.status(500)
                return next(err)
            }
            return res.status(200).send(`Successfully deleted ${deletedPosting.title} from the database.`)
    })
})


module.exports = postingsRouter