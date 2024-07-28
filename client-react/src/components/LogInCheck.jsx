import axios from 'axios'
import { useContext } from 'react'
import { AuthContext } from './Authorisation/AuthProvider'
import { useNavigate } from 'react-router-dom'

const api = axios.create({baseURL: 'http://localhost:3000'})