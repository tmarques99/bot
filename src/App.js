import React, { useState } from 'react'
import { saveAs } from 'file-saver'
import { FaPlay, FaPause, FaStop } from 'react-icons/fa'
import { FaFileImport, FaFileExport, FaDownload, FaUpload } from 'react-icons/fa'


function Controls(props) {
  let { controlState, setControlState, config } = props
  // alert(controlState)
  return <div className="flex flex-wrap -mx-3 mb-2">
    <div className="flex-grow">
      <button onClick={(e) => {
        setControlState("playing")
      }} disabled={controlState === "playing"} className={`  text-white font-bold uppercase text-xs px-3 py-3 rounded-full shadow hover:shadow-md outline-none focus:outline-none mr-1 mb-1 ${controlState === "playing" ? "bg-gray-200" : "bg-blue-500 hover:bg-blue-600"}`}><FaPlay size={16} /></button>

      <button onClick={(e) => {
        setControlState("paused")
      }} disabled={controlState !== "playing"} className={` text-white  font-bold uppercase text-xs px-3 py-3 rounded-full shadow hover:shadow-md outline-none focus:outline-none mr-1 mb-1 ${controlState !== "playing" ? "bg-gray-200" : "bg-blue-500 hover:bg-blue-600"}`}><FaPause size={16} /></button>

      <button onClick={(e) => {
        setControlState("stopped")
      }} disabled={controlState === "stopped"} className={` text-white  font-bold uppercase text-xs px-3 py-3 rounded-full shadow hover:shadow-md outline-none focus:outline-none mr-1 mb-1 ${controlState === "stopped" ? "bg-gray-200" : "bg-blue-500 hover:bg-blue-600"}`}><FaStop size={16} /></button>

      {controlState}

    </div>
    <div className="flex-none">

      <button title="Load Project" className="bg-blue-500 text-white hover:bg-blue-600 font-bold uppercase text-xs px-3 py-3 rounded-full shadow hover:shadow-md outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" type="button" onClick={() => {
        window.loader = "load"
        document.querySelector("#load").click()
      }}>
        <FaUpload size={16} />
      </button>


      <button title="Save Project" className="bg-blue-500 text-white hover:bg-blue-600 font-bold uppercase text-xs px-3 py-3 rounded-full shadow hover:shadow-md outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" type="button" onClick={() => {
        saveAs(new Blob([JSON.stringify(config)], {
          type: 'application/json'
        }), "project.json")
      }}>
        <FaDownload size={16} />
      </button>


      <button title="Import CSV" className="bg-blue-500 text-white hover:bg-blue-600 font-bold uppercase text-xs px-3 py-3 rounded-full shadow hover:shadow-md outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" type="button" onClick={() => {
        window.loader = "import"
        document.querySelector("#load").click()
      }}>
        <FaFileImport size={16} />
      </button>


      <button title="Export CSV" className="bg-blue-500 text-white hover:bg-blue-600 font-bold uppercase text-xs px-3 py-3 rounded-full shadow hover:shadow-md outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" type="button" onClick={() => {

        let body = [{ name: "x", traits: [] }, { name: "y", traits: [] }].map(({ name, traits }) => [name, traits.map(a => a.value).join(', ')].map(x => '"' + x + '"')).join("\n")
        console.log()
        saveAs(new Blob(["Name,Traits\n" + body], {
          type: 'text/csv'
        }), "export.csv")
      }}>
        <FaFileExport size={16} />
      </button>

    </div>
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

function Step(props) {
  let { step, config, setConfig } = props

  switch (step) {
    case 0: return <>
      <div className="w-full md:w-5/12 px-3 mb-6 md:mb-0">
        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-first-name">
          Select Bidding Option
        </label>
        <select defaultValue={config.biddingOption} onChange={(e) => setConfig({ ...config, biddingOption: e.target.value })} className="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="grid-first-name">
          <option value="floorPercent">% of Floor</option>
          <option value="fixed">Fixed Price</option>
          <option value="lowest">Lowest Value</option>
        </select>
        {/* <p className="text-red-500 text-xs italic">Please fill out this field.</p> */}
      </div>

      <div className="w-full md:w-1/6 px-3 mb-6 md:mb-0">
        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-first-name">
          Percent
        </label>
        <input type="number" defaultValue={config.percentOfFloor} onChange={(e) => setConfig({ ...config, percentOfFloor: e.target.value })} className="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="grid-first-name" />
        {/* <p className="text-red-500 text-xs italic">Please fill out this field.</p> */}
      </div>

      <div className="w-full md:w-5/12 px-3 mb-6 md:mb-0">
        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-first-name">
          Collection URL
        </label>
        <input onChange={(e) => setConfig({ ...config, collectionURL: e.target.value })} className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" type="text" placeholder="boredapeyachtclub" />
        {/* <p className="text-red-500 text-xs italic">Please fill out this field.</p> */}
      </div>

      <div className="w-full md:w-1/5 px-3 mb-6 md:mb-0">
        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-first-name">
          Bid Lifetime
        </label>
        <select defaultValue={config.startBid} onChange={(e) => setConfig({ ...config, bidLifetime: e.target.value })} className="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="grid-first-name">
          <option value="1">1 Hour</option>
          <option value="2">2 Hours</option>
          <option value="6">6 Hours</option>
          <option value="12">12 Hours</option>
          <option value="24">1 Day</option>
          <option value="48">2 Days</option>
        </select>
        {/* <p className="text-red-500 text-xs italic">Please fill out this field.</p> */}
      </div>
      <div className="w-full md:w-1/5 px-3 mb-6 md:mb-0">
        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-first-name">
          Currency
        </label>
        <select defaultValue={config.currency} onChange={(e) => setConfig({ ...config, currency: e.target.value })} className="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="grid-first-name">
          <option value="weth">WETH</option>
        </select>
        {/* <p className="text-red-500 text-xs italic">Please fill out this field.</p> */}
      </div>
      <div className="w-full md:w-1/5 px-3 mb-6 md:mb-0">
        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-first-name">
          Start Bid
        </label>
        <input type="number" defaultValue={config.startBid} onChange={(e) => setConfig({ ...config, startBid: e.target.value })} className="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="grid-first-name" />
        {/* <p className="text-red-500 text-xs italic">Please fill out this field.</p> */}
      </div>
      <div className="w-full md:w-1/5 px-3 mb-6 md:mb-0">
        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-first-name">
          Max Bid
        </label>
        <input type="number" defaultValue={config.maxBid} onChange={(e) => setConfig({ ...config, maxBid: e.target.value })} className="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="grid-first-name" />
        {/* <p className="text-red-500 text-xs italic">Please fill out this field.</p> */}
      </div>
      <div className="w-full md:w-1/5 px-3 mb-6 md:mb-0">
        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-first-name">
          increment
        </label>
        <input step="0.0001" type="number" defaultValue={config.increment} onChange={(e) => setConfig({ ...config, increment: e.target.value })} className="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="grid-first-name" />
        {/* <p className="text-red-500 text-xs italic">Please fill out this field.</p> */}
      </div>

      <div class="flex justify-center">
        <div>
          <div class="form-check">
            <input onChange={(e) => setConfig({ ...config, useMetamask: e.target.checked })} class="h-4 w-4 border border-gray-300 rounded-sm mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer" type="checkbox" checked={config.useMetamask} />
            <label class="form-check-label inline-block text-gray-800">
              Use Metamask
            </label>
          </div>
          <div class="form-check">
            <input class="form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer" type="checkbox" value="" id="flexCheckChecked" checked />
            <label class="form-check-label inline-block text-gray-800">
              Another checkbox
            </label>
          </div>
        </div>
      </div>
      {config.useMetamask && <>
        <div className="w-full px-3">
          <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
            Public Key
          </label>
          <input onChange={(e) => setConfig({ ...config, publicKey: e.target.value })} className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" type="text" placeholder="0x....." />
        </div>
        <div className="w-full px-3">
          <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
            Private Key
          </label>
          <input onChange={(e) => setConfig({ ...config, privateKey: e.target.value })} className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" type="password" placeholder="******************" />
        </div>

      </>}


    </>
    case 1: return <>1</>
    case 2: return <>2</>
    default: return <>x</>
  }


}



function App() {
  const [step, setStep] = useState(0)
  const [config, setConfig] = useState({
    startBid: 1,
    maxBid: 2
  })
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

      <input
        id="load"
        onChange={(e) => {
          console.log("change")
          let reader = new FileReader()
          reader.onload = function () {
            console.log("load")
            let data = JSON.parse('' + reader.result)

            console.log(data)
            alert(window.loader)
            setConfig(data)
            document.querySelector("#load").value = null
          }
          reader.readAsText(e.target.files[0])
        }}
        type="file"
        style={{ display: "none" }}
      />

      <div className="w-full max-w-lg m-auto mt-10">
        <Controls controlState={controlState} setControlState={setControlState}  config={config} setConfig={setConfig}/>
        <Steps step={step} setStep={setStep} />

        <div className="flex flex-wrap -mx-3 mb-6">
          <Step step={step} config={config} setConfig={setConfig} />
        </div>
        <div className="flex flex-wrap -mx-3 mb-6">

        </div>

      </div>
      {JSON.stringify(config)}
    </>

  );
}

export default App