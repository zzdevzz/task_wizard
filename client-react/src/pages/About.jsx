import React from "react"

export default function About(){

  console.log("About us build done")
  return (
    <div className="py-3">
      <h1 className="text-center">About TaskWizard 🧙‍♂️</h1>
      <div className="pt-2">
        <p> Tired of those same old boring to-do apps that make you feel like productivity is a chore? We get it. </p> 
        <p> That’s why we created TaskWizard – a fun, simple way to tackle your tasks without feeling like you’re slogging through a never-ending list of "stuff to do." </p>
        <p>Let’s face it: waiting around for motivation is like waiting for a unicorn to show up at your door. Instead of hoping for that magical moment of inspiration, TaskWizard helps you create your own motivation by getting things done, one step at a time. The magic is in the momentum! </p>
        <p>TaskWizard isn’t just about checking boxes; it’s about making your day feel a little more awesome. We make it easy to focus on what matters and add a little fun along the way. Plus, who doesn’t want to feel like a productivity wizard? </p>
        <p>
          So, if you’re ready to stop waiting for motivation and start making it happen, TaskWizard is here to help. No boring task lists, just simple, exciting productivity. Give it a try – your to-dos will thank you!
        </p>
        <h3>Upcoming Features!</h3>
        <ul>
          <li>Animation.</li>
          <li>Sort Tasks on urgency or date required by.</li>
          <li>Native Mobile App.</li>
        </ul>
      </div>
    </div>

  )
}
