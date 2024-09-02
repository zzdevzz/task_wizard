import React from 'react'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGithub } from '@fortawesome/free-brands-svg-icons'
import { faLinkedin } from '@fortawesome/free-brands-svg-icons'
import { faHatWizard } from '@fortawesome/free-solid-svg-icons'

export default function Footer() {
    return (
        <footer className='footer layout-stroke-top d-flex'>
            <ul className="icons list-unstyled d-flex justify-content-around align-items-center mx-auto mb-0 flex-grow-1">
                <li className=''>
                    <Link to="/">
                        <FontAwesomeIcon icon={faHatWizard} />
                    </Link>
                </li>
                <li className=''>
                    <Link to="https://github.com/zzdevzz/task_wizard" target='_blank'>
                        <FontAwesomeIcon icon={faGithub} />
                    </Link>
                </li>
                <li className=''>
                    <Link to="https://linkedin.com/in/devhalai" target='_blank'>
                        <FontAwesomeIcon icon={faLinkedin} />
                    </Link>
                </li>
                <li>
                    <p className='mb-0'>Copyright © 2024 TaskWizard</p>
                </li>
            </ul>
            
        </footer>
    )
}
