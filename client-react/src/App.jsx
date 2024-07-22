import './App.css'
import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'


// Components
import Layout from "./components/Layout/Layout"
import Home from "./pages/Home"
import TasksDashboard from './components/Tasks/TasksDashboard.jsx'
import FormTask from './components/FormTask'


function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout/>}>
          <Route index element={<Home/>}/>
          <Route path="tasks" element={<TasksDashboard/>}>
            <Route index element={<FormTask/>}/>
            <Route path="new" element={<FormTask request='post'/>}/>
            <Route path=":id" element={<FormTask request="patch"/>}/>
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
