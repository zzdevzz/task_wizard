import React from 'react'
import { Link } from 'react-router-dom'

export default function Footer() {
    return (
        <footer>
            <Link to="/">TaskWizard</Link>
            <ul>
                <li>L1</li>
                <li>L2</li>
                <li>L3</li>
            </ul>
        </footer>
    )
}