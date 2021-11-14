import React from 'react'

function Posting({posting}) {
    // convert createdAt to readable date
    let date = new Date(posting.createdAt)
    let dateDecoded = date.toLocaleString('en-US', {month: 'numeric', day: 'numeric', year: 'numeric'})

    return (
        <div className='postingContainer'>
            <h2>{posting.title}</h2>
            <p>Description: {posting.description}</p>
            <p>Location: {posting.locationCity}, {posting.locationState}</p>
            <p>Compensation: {posting.compensationType}</p>
            <p>Contact Information: {posting.contactInfo}</p>
            <button>Save Listing</button>
            <p>posted on: {dateDecoded}</p>
        </div>
    )
}

export default Posting