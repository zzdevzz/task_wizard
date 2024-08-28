import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './stylesheets/application.scss'

// Components
import Layout from "./components/Layout/Layout"
import Home from "./pages/Home"
import TasksDashboard from './components/Tasks/TasksDashboard.jsx'
import FormTask from './components/Tasks/forms/FormTask'
import About from "./pages/About"


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
              <Route path="about" element={<About/>}/>
              <Route path="signup" element={<SignUpForm/>}/>
              <Route path="login" element={<LoginForm/>}/>
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
