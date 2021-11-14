// import express and other packages
const express = require('express')
const app = express()
const morgan = require('morgan')
const cors = require('cors')
const mongoose = require('mongoose')


// port
const PORT = process.env.PORT || 7000

// mongoDB atlas
// const MONGODB_URI = xyz

// middleware
app.use(express.json()) // looks for request body
app.use(morgan('dev')) // logs requests to the console

// connect to db using mongoose
mongoose.connect(process.env.MONGODB_URI || `mongodb://localhost:27017/trade-marketplace-db`,
{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
},
() => console.log('Connected to the Marketplace DB')
)

// allows requests from local server (client)
app.use(cors({
    origin: 'http://localhost:3000',
    origin: 'http://localhost:7000'
}))

// routes
app.use('/postings', require('./routes/postings'))

// Error handler -- include global error handler in all applications
app.use((err, req, res, next) => {
    console.log(err)
    return res.send({errMsg: err.message})
})

// server listening
app.listen(PORT, () => {
    console.log(`Server is up and running on port ${PORT}`)
})


