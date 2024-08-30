import React from "react"
import { useDocumentTitle } from "../components/customHook/useDocumentTitle"

import AboutPoint from "../components/AboutInfo/AboutPoint"

import { IMAGESABOUT, IMAGES } from "../assets/images/Image"

import TaskPreviewFake from "../components/Tasks/TaskPreviewFake"


export default function About(){
  useDocumentTitle("About")
  return (
    <div className="about-us-text py-4">
      <div className="text-center">
        <h1 className="text-center display-2 my-4">About TaskWizard</h1>
        <p className="mx-auto" style={{maxWidth: 800}}> It's quite simple. We're tired of those same old boring to-do apps that are just as boring as the tasks. That’s why we created TaskWizard, we believe the magic is in the momentum! TaskWizard isn’t just about checking boxes; it’s about making your day feel a little more awesome.</p>
        <div className="motivation-text mb-1 mt-5 flex-wrap justify-content-center ">
          <h2 className="text-decoration-line-through text-secondary mx-2 flex-shrink-0">Needing motivation to do things.</h2>
          <h2 className="mb-4 mx-2 flex-shrink-0"><span style={{color: "#9883ff"}}>Feel motivated</span> by doing things.</h2>
        </div>
        {/* <div className="text-brand-purple">
          <h4>It's not magic. But this app is...</h4>
          <p> Gandolf, 2024</p>
        </div> */}
      </div>
      <div className="d-flex flex-column align-items-center text-center">
        <AboutPoint
          title="Clean & Gorgeous UI."
          text="With a Sleek UI, Taskwizard is both easy and fun to use. Easily identify which tasks are more urgent, prioritise these tasks quicker to get the bad vibes away!"
        />
      </div>
      <h5 className="text-center mt-4">Tap a gem to update progress. Easy.</h5>
      <div className="dashboard-list border-0">
        <div className="row">
          <TaskPreviewFake 
            name="Regular Task" 
            description="Task that's been added and no progress made."
            status="to_be_done"
            />
          <TaskPreviewFake 
            name="Task In Progress" 
            status="in_progress"
            description="Good job you've made progress but not finished the task."
            />
          <TaskPreviewFake 
            name="Completed Task" 
            status="to_be_reviewed"
            description="Wooo! You finished and got the beautiful green, you can now remove this from your list."
            />
          <TaskPreviewFake 
            name="OMG HURRY! GET RID OF IT." 
            priority="urgent"
            description="This is blood magic. PURE EVIL."
            />
        </div>
      </div>

      <div className="d-flex flex-column align-items-center text-center my-4">
        <AboutPoint
          title="Simple Forms."
          text="Less time overthinking. More time doing."
        />
        <img src={IMAGESABOUT.form} className="about-form"/>
      </div>
      
      <div className="text-center mw-85 mx-auto">
        <h2>Upcoming Features:</h2>
        <div className="d-flex flex-wrap justify-content-center">
          <AboutPoint
            title="Sort by Option"
            text="Ability to sort tasks based on urgency, status, date created and more!"
            className="about-border"
          />
          <AboutPoint
            title="Native Mobile App"
            text="An app native to the Apple and Android store. For now you can save this as a webapp icon on your phone!"
            className="about-border"
          />
          <AboutPoint
            title="More Animations"
            text="Animations specific to completing Tasks! Making you feel like a true wizard casting a spell when fighting your demons!"
            className="about-border"
          />
        </div>
      </div>
    </div>
  )
}


