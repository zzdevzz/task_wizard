import React from 'react'
import { Link } from 'react-router-dom'

export default function Footer() {
    return (
        <footer className='footer'>
            <ul className="list-group list-group-horizontal d-flex justify-content-around">
                <li className='list-group-item'>
                    <Link to="/">TaskWizard</Link>  
                </li>
                <li className='list-group-item'>
                    <Link to="https://github.com/zzdevzz/task_wizard" target='_blank'>Github</Link>  
                </li>
                <li className='list-group-item'>
                    <Link to="https://linkedin.com/in/devhalai" target='_blank'>Linkedin</Link>  
                </li>
            </ul>
        </footer>
    )
}