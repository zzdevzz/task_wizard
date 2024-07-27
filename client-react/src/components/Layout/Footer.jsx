import React from 'react'
import { Link } from 'react-router-dom'

export default function Footer() {
    return (
        <footer>
            <ul className="list-group list-group-horizontal d-flex justify-content-around mt-5 bg-light">
                <li className='list-group-item'>
                    <Link to="/">TaskWizard</Link>  
                </li>
                <li className='list-group-item'>
                    <Link to="/">Github</Link>  
                </li>
                <li className='list-group-item'>
                    <Link to="/">Linkedin</Link>  
                </li>
            </ul>
        </footer>
    )
}