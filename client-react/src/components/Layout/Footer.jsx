import React from 'react'
import { Link } from 'react-router-dom'

export default function Footer() {
    return (
        <footer>
            <Link to="/">TaskWizard</Link>
            <ul className="list-group list-group-horizontal d-flex justify-content-around mt-5">
                <li className='list-group-item'>Home</li>
                <li className='list-group-item'>Github</li>
                <li className='list-group-item'>LinkedIn</li>
            </ul>
        </footer>
    )
}