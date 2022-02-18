import React, { useState } from 'react'
import { FaPlay, FaPause, FaStop } from 'react-icons/fa';


function Controls(props) {
  let { controlState, setControlState } = props
  // alert(controlState)
  return <div className="flex flex-wrap -mx-3 mb-2">

    <button onClick={(e) => {
      setControlState("playing")
    }} disabled={controlState === "playing"} className={` px-2 py-2 bg-green-600 w-10  rounded-full text-white ${controlState === "playing" ? "bg-gray-200" : "bg-green-600"}`}><FaPlay className="ml-1" /></button>

    <button onClick={(e) => {
      setControlState("paused")
    }} disabled={controlState !== "playing"} className={`ml-2 px-2 py-2 bg-green-600 w-10  rounded-full text-white ${controlState !== "playing" ? "bg-gray-200" : "bg-green-600"}`}><FaPause className="ml-1" /></button>

    <button onClick={(e) => {
      setControlState("stopped")
    }} disabled={controlState === "stopped"} className={`mx-2 px-2 py-2  w-10  rounded-full text-white ${controlState === "stopped" ? "bg-gray-200" : "bg-green-600"}`}><FaStop className="ml-1" /></button>

    {controlState}

  </div>
}
function Steps(props) {
  let { step, setStep } = props
  let sections = [
    { name: "Place Bids" },
    { name: "Outbid Bids" },
    { name: "Create Lists" },
  ]

  return <div className="flex flex-wrap -mx-3 mb-2">
    {sections.map((section, i) =>
      <button onClick={(e) => {
        setStep(i)
      }} key={i} className={` w-full md:w-1/3 px-3 py-2 mb-6 md:mb-0 ${step === i ? "disabled bg-gray-100" : "bg-gray-300"}`}>{section.name}</button>
    )}
  </div>
}

function App() {
  const [step, setStep] = useState(0)
  const [controlState, setControlState] = useState("stopped")
  /*
  Can you create an UI able of placing bid - Main requirement - putting bids for
  given list once only
  select bid lifetime
  Bid value can be entered
  Fix, floor below
  List creation
  Select source
  Input url
  outbid
  Increment


  Start Bid
  Max Bid


  Run
  Pause
  Stop


  Bid Lifetime
  Increment Last Bid (Ex 0.001)
  Max Bid wETH (Ex 0.1)

  Load Items List
  Choose File




  Bid Lifetime
  1h
  Currency
  wETH
  Bid Value

  Select Bidding Option
  Above % Floor
  Collection URL
  Required for % Bidding options


  Load Items List
  Save Items List

  Stats
  Bids Left: 0
  Current Listing




*/
  return (
    <>

      <div className="w-full max-w-lg m-auto mt-10">
        <Controls controlState={controlState} setControlState={setControlState} />
        <Steps step={step} setStep={setStep} />
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-first-name">
              Start Bid
            </label>
            <input type="number" className="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="grid-first-name" placeholder="1" />
            {/* <p className="text-red-500 text-xs italic">Please fill out this field.</p> */}
          </div>
          <div className="w-full md:w-1/2 px-3">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-last-name">
              Max Bid
            </label>
            <input type="number" className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-last-name" placeholder="Doe" />
          </div>
        </div>
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full px-3">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-password">
              Password
            </label>
            <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-password" type="password" placeholder="******************" />
            <p className="text-gray-600 text-xs italic">Make it as long and as crazy as you'd like</p>
          </div>
        </div>

      </div>
    </>

  );
}

export default App