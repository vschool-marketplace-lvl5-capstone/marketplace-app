import React, { useState } from 'react'
import { GiHamburgerMenu } from 'react-icons/gi'
import './Navbar.css'

function Navbar() {
    // state from the background color and responsive drop down
    const [scrolled, setScroll] = useState(false)
    const [isDropped, setDrop] = useState(false)

    // sets state based on scroll
    function changeBackground() {
        if (window.scrollY >= 50) {
            setScroll(true)
        } else {
            setScroll(false)
        }
    }

    // event listener for scroll
    window.addEventListener('scroll', changeBackground)

    // dropDown activated
    function dropDown() {
        setDrop(prevState => !prevState)
    }

    return (
        <div id='navbar' className={scrolled ? 'scroll' : ''}>
            <div id='navbarTitle'>
                <a href='#header'>Odd Jobs</a>
            </div>
            <div className={isDropped === false ? 'navbarLinks' : 'droppedOptions'}>
                <div id='dropper' onClick={dropDown}>
                    <GiHamburgerMenu />
                </div>
                <a href='#header'>All Listings</a>
                <a href='#projects'>My Listings</a>
                <a href='#contact'>Saved Listings</a>
                <a href='#aboutMe'>About us</a>
            </div>
        </div>
    )
}

export default Navbar