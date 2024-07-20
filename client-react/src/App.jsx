import './App.css'
import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'


// Components
import Layout from "./components/Layout/Layout"
import Home from "./pages/Home"
import TasksDashboardHost from './components/Tasks/TasksDashboard.jsx'
import TasksDashboard from "./components/Tasks/TaskList.jsx"
import TaskInfo from './components/TaskInfo'
import FormTest from './components/FormTest'
import FormTask from './components/FormTask'


function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout/>}>
          <Route index element={<Home/>}/>
          <Route path="tasks" element={<TasksDashboardHost/>}>
            <Route path="new" element={<FormTask/>}/>
            <Route path=":id" element={<FormTask request="patch"/>}/>
          </Route>
          {/* <Route path="tasks/:id" element={<TaskInfo/>}/> */}
          <Route path="formtest" element={<FormTest/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
