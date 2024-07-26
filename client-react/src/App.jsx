import './App.css'
import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'


// Components
import Layout from "./components/Layout/Layout"
import Home from "./pages/Home"
import TasksDashboard from './components/Tasks/TasksDashboard.jsx'
import FormTask from './components/FormTask'

// Authentication Components
import AuthProvider from './components/Authorisation/AuthProvider.jsx'
import AuthRequired from './components/Authorisation/AuthRequired.jsx'
import SignUpForm from './components/Authorisation/SignUpForm.jsx'
import LoginForm from './components/Authorisation/LoginForm.jsx'

function App() {

  return (
    <BrowserRouter>
      <AuthProvider> {/* Allows us to pass JWT and Authorized state to each component */} 
        <Routes>
            <Route path="/" element={<Layout/>}>
              <Route path="signup" element={<SignUpForm/>}></Route>
              <Route path="login" element={<LoginForm/>}></Route>
              <Route index element={<Home/>}/>
              <Route element={<AuthRequired/>}>
                <Route path="tasks" element={<TasksDashboard/>}>
                  <Route index element={<FormTask/>}/>
                  <Route path="new" element={<FormTask request='post'/>}/>
                  <Route path=":id" element={<FormTask request="patch"/>}/>
                </Route>
              </Route>
            </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
