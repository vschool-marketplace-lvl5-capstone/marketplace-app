import React, { useState, useEffect, useContext } from 'react'
import axios from 'axios'
import './Home.css'
import { Context } from '../context'
import Posting from './Posting'

function Home() {
    // state for listings
    const [stateFilter, setStateFilter] = useState('allStates')
    const [cityStateFilter, setCityStateFilter] = useState({city: '', state: {stateFilter}})

    // using context for list
    const { postingList, setPostingList } = useContext(Context)

    // get all postings
    function getPostings() {
        axios.get('/postings')
        .then(res => {
            setPostingList(res.data)
        })
        .catch(err => console.log(err))
    }

    // get all postings on mount
    useEffect(() => {
        getPostings()
        // eslint-disable-next-line
    }, [])

    // map through posting list
    const postingComponents = postingList.map(info => <Posting key={info._id} posting={info} />)

    // STATE 
    // handle filter change for state
    function handleStateFilter(e) {
        const {value} = e.target
        setStateFilter(value)
        if (value === 'allStates') {
            getPostings()
        } else {
            axios.get(`/postings/search/state?state=${value}`)
                .then(res => setPostingList(res.data))
                .catch(err => console.log(err))
        }
    }

    // state options
    const options = ['AL', 'AK', 'AS', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'DC', 'FM', 'FL', 'GA', 'GU', 'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MH', 'MD', 'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ', 'NM', 'NY', 'NC', 'ND', 'MP', 'OH', 'OK', 'OR', 'PW', 'PA', 'PR', 'RI', 'SC', 'SD', 'TN', 'TX', 'UT', 'VT', 'VI', 'VA', 'WA', 'WV', 'WI', 'WY' ]
    const optionComponents = options.map(option => <option key={option} value={option}>{option}</option>)

    // CITY
    // handle change for input
    function handleChange(e) {
        const { value } = e.target
        setCityStateFilter(value)
    }

    // handle search by city
    function handleCityStateFilter(e) {
        e.preventDefault()
        console.log('yeeet')
    }


 

    return (
        <div id='homeMain'>
            <div id='filterContainer'>
                <form onSubmit={handleCityStateFilter}>
                    <select onChange={handleStateFilter} id='stateFilter'>
                        <option value='allStates'>All States</option>
                        {optionComponents}
                    </select>
                    <input
                        type='text'
                        value={cityStateFilter.city}
                        name='cityFilter'
                        onChange={handleChange}
                        placeholder='Enter City'
                        required
                        className={stateFilter === 'allStates' ? 'cityHidden' : 'citySearch'}
                    />
                    <br />
                    <button className={stateFilter === 'allStates' ? 'cityHidden' : 'citySearch'}>Search By City</button>
                </form>
            </div>
            <div>
                {postingComponents}
            </div>
        </div>
    )

}

export default Home
