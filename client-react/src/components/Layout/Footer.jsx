import React from 'react'
import { Link } from 'react-router-dom'

// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { faGithub } from '@fortawesome/free-solid-svg-icons'



export default function Footer() {
    return (
        <footer>
            <ul className="glass-container footer list-unstyled d-flex justify-content-around align-items-center">
                <li className=''>
                    <Link to="/">TaskWizard</Link>
                </li>
                <li className=''>
                    <Link to="https://github.com/zzdevzz/task_wizard" target='_blank'>Github</Link>
                </li>
                <li className=''>
                    <Link to="https://linkedin.com/in/devhalai" target='_blank'>Linkedin</Link>
                </li>
            </ul>
        </footer>
    )
}
