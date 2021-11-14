// import packages
const mongoose = require('mongoose')
const Schema = mongoose.Schema

// Posting blueprint
const postingSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    locationState: {
        type: String,
        enum: [ 'AL', 'AK', 'AS', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'DC', 'FM', 'FL', 'GA', 'GU', 'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MH', 'MD', 'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ', 'NM', 'NY', 'NC', 'ND', 'MP', 'OH', 'OK', 'OR', 'PW', 'PA', 'PR', 'RI', 'SC', 'SD', 'TN', 'TX', 'UT', 'VT', 'VI', 'VA', 'WA', 'WV', 'WI', 'WY' ],
        required: true
    },
    locationCity: {
        type: String,
        required: true
    },
    compensationType: {
        type: String,
        required: true
    },
    contactInfo: {
        type: String,
        required: true
    }
}, {timestamps : true})

module.exports = mongoose.model('Posting', postingSchema, 'Posting')