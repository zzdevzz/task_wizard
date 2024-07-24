import './App.css'
import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'


// Components
import Layout from "./components/Layout/Layout"
import Home from "./pages/Home"
import TasksDashboard from './components/Tasks/TasksDashboard.jsx'
import FormTask from './components/FormTask'

// Authentication Components
import AuthRequired from './components/Authorisation/AuthRequired.jsx'
import SignUpForm from './components/Authorisation/SignUpForm.jsx'
import LoginForm from './components/Authorisation/LoginForm.jsx'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout/>}>
          <Route path="signup" element={<SignUpForm/>}></Route>
          <Route path="login" element={<SignUpForm/>}></Route>
          <Route index element={<Home/>}/>
          <Route path="tasks" element={<AuthRequired/>}>
            <Route index element={<TasksDashboard/>}>
              <Route index element={<FormTask/>}/>
              <Route path="new" element={<FormTask request='post'/>}/>
              <Route path=":id" element={<FormTask request="patch"/>}/>
            </Route>
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
