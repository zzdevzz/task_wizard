import { useState } from 'react'
import './App.css'
import './components/Navbar'
import { BrowserRouter, Routes, Route } from 'react-router-dom'


// Components
import Layout from "./components/Layout"
import Home from "./pages/Home"
import TasksLists from "./components/TasksList"
import TaskInfo from './components/TaskInfo'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout/>}>
          <Route index element={<Home/>}/>
          <Route path="tasks" element={<TasksLists/>} />
          <Route path="tasks/new" />
          <Route path="tasks/:id" element={<TaskInfo/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
