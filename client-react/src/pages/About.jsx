import React from "react"
import { useDocumentTitle } from "../components/customHook/useDocumentTitle"

import AboutPoint from "../components/AboutInfo/AboutPoint"

import { IMAGESABOUT, IMAGES } from "../assets/images/Image"

import TaskPreviewFake from "../components/Tasks/TaskPreviewFake"
export default function About(){
  useDocumentTitle("About")
  return (
    <div className="about-us-text py-4">
      <h1 className="text-center display-2">About TaskWizard</h1>
      <h2>Waiting for motivation to do things.</h2>
      <h2>Feel motivated by doing things.</h2>
      <h2>It's not magic... But this app is :)</h2>
      <AboutPoint
        title="Easy to Update!"
        text="Sleek UI makes it easy to use!"
      />
      <AboutPoint
        title="Urgent Tasks"
        text="Highlighted and pulsating to convey the daunting dread of urgency. Easily able to prioritise these tasks quicker to get the bad vibes away."
      />
      <ul className="dashboard-list">
        <li className={`task-preview d-flex align-items-center urgent color-todo`}>
          <div
            className={`box text-center gem`}
            title="Click to change status"
            >
            <img src={IMAGES.gemBase} alt="Magic Crystal" style={{transform: "scale(1.1)"}} className="h-100"/>
          </div>
          <div className={`overflow-hidden ms-4 w-100 h-100 d-flex flex-column justify-content-center `}>
            <h2 className="text-truncate">Tasl Name</h2>
            <p className="text-truncate">Task Description</p>
          </div>
        </li>
      </ul>
      <AboutPoint
        title="Feel like a wizard!"
        text="Highlighted and pulsating to convey the daunting dread of urgency. Easily able to prioritise these tasks quicker to get the bad vibes away."
      />
      <AboutPoint
        title="Easy to Update!"
        text="Click on them down below."
      />
      <div className="dashboard-list border-0">
        <div className="row">
          <div className="col-md-6 p-1">
            <TaskPreviewFake 
              name="Regular Task" 
              status="to_be_done"
              />
          </div>
          <div className="col-md-6 p-1">
            <TaskPreviewFake 
              name="Task In Progress" 
              status="in_progress"
              description="Good job it's in progress and here's more info!"
              />
          </div>
          <div className="col-md-6 p-1">
            <TaskPreviewFake 
              name="Completed Task" 
              status="to_be_reviewed"
              description="Wooo! You got the beautiful green and can now remove this from your list."
              />
          </div>
          <div className="col-md-6 p-1">
            <TaskPreviewFake 
              name="OMG YOU NEED TO DO THIS!" 
              priority="urgent"
              description="This is blood magic. PURE EVIL."
              />
          </div>
        </div>
      </div>
    </div>
  )
}


