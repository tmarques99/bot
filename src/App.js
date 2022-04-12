import React, { useState, useEffect } from 'react'
import { saveAs } from 'file-saver'
import { FaPlay, FaPause, FaStop } from 'react-icons/fa'
import { FaFileImport, FaFileExport, FaDownload, FaUpload } from 'react-icons/fa'
// import { OpenSeaPort, Network } from 'opensea-js';
// import Web3 from "web3"

// import { PrivateKeyWalletSubprovider } from "@0x/subproviders"
// import HookedWalletEthTxSubprovider, {Tx} from 'web3-provider-engine/subproviders/hooked-wallet-ethtx.js'
// import hdwallet_provider from '@truffle/hdwallet-provider'

// import Web3ProviderEngine from "web3-provider-engine"
// import RPCSubprovider from "web3-provider-engine/subproviders/rpc"
import './App.css';
import Lists from './Lists';
import { getSeaport } from './seaport';

const mode = "test"
const version = 0.10

const apiKey = "f980ad27b40444e8b1326c4fdba9fc6a"

// const rpcUrl = mode === "test" ? "https://rinkeby.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161" : "https://mainnet.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161"
// const rpcUrl =
// https://speedy-nodes-nyc.moralis.io/23ce9c82759f015c9c501b92/eth/mainnet
const e18 = 1000000000000000000

// const infuraRpcSubprovider = new RPCSubprovider({ rpcUrl })

let providerEngine
// let privateKeyProvider

// let web3 = new Web3(window.web3.currentProvider)

// function initInfura(privateKey) {
//   return
//   // console.log("init infura")
//   // console.log(privateKey)
//   providerEngine?.stop()
//   providerEngine = new Web3ProviderEngine()
//   providerEngine.addProvider(infuraRpcSubprovider)
//   let privateKeyProvider = new PrivateKeyWalletSubprovider(privateKey)
//   providerEngine.addProvider(privateKeyProvider)

//   if (mode === "test") {
//     infura = new OpenSeaPort(providerEngine, {
//       networkName: Network.Rinkeby,
//       useReadOnlyProvider: false,
//     })

//   } else {
//     infura = new OpenSeaPort(providerEngine, {
//       networkName: Network.Main,
//       useReadOnlyProvider: false,
//       apiKey,
//     })

//   }

//   infura.name = "infura"
// }

// async function initMetamask() {
//   return
//   let accounts = await window.ethereum.enable()

//   // if (config.publicKey !== ) {
//   //   console.log([config.publicKey, accounts[0]])
//   //   setConfig({ ...config, publicKey: accounts[0], privateKey: "" })
//   // }

//   metamask = new OpenSeaPort(window.web3.currentProvider, {
//     networkName: Network.Main,
//     apiKey,
//   })
//   metamask.name = "metamask"

//   return accounts[0]
// }

// let infura // = initInfura()
// let metamask

function Controls(props) {
  let { controlState, setControlState, config, queue, setSeaport } = props
  // alert(controlState)
  return <div className="flex flex-wrap -mx-3 mb-2">
    <div className="flex-grow flex">
      <button onClick={(e) => {
        setControlState("playing")
        if (config.useMetamask) {
          // initMetamask().then(account => {
          //   if (config.publicKey !== account) {
          //     console.log([config.publicKey, account])
          //     setConfig({ ...config, publicKey: account, privateKey: "" })
          //   }
          // })
        } else {
          let { publicKey, privateKey, mnemonic, rpcUrl, apiKeys, network, increment, bidLifetime } = config //
          console.log({ privateKey, mnemonic, rpcUrl, apiKeys, network, accountAddress: publicKey, increment, expiryTime: Number(bidLifetime) })
          // setSeaportConfig()
          setSeaport(null)
          getSeaport({ privateKey, mnemonic, rpcUrl, apiKeys, network, accountAddress: publicKey, increment, expiryTime: Number(bidLifetime) }).then(sp => setSeaport(sp))

          // initInfura(config.privateKey)
          // providerEngine.start()
        }
      }} disabled={controlState === "playing"} className={`  text-white font-bold uppercase text-xs px-3 py-3 rounded-full shadow hover:shadow-md outline-none focus:outline-none mr-1 mb-1 ${controlState === "playing" ? "bg-gray-200" : "bg-blue-500 hover:bg-blue-600"}`}><FaPlay size={16} /></button>

      <button onClick={(e) => {
        setControlState("paused")
        providerEngine.stop()
      }} disabled={controlState !== "playing"} className={` text-white  font-bold uppercase text-xs px-3 py-3 rounded-full shadow hover:shadow-md outline-none focus:outline-none mr-1 mb-1 ${controlState !== "playing" ? "bg-gray-200" : "bg-blue-500 hover:bg-blue-600"}`}><FaPause size={16} /></button>

      <button onClick={(e) => {
        setControlState("stopped")
        providerEngine.stop()
      }} disabled={controlState === "stopped"} className={` text-white  font-bold uppercase text-xs px-3 py-3 rounded-full shadow hover:shadow-md outline-none focus:outline-none mr-1 mb-1 ${controlState === "stopped" ? "bg-gray-200" : "bg-blue-500 hover:bg-blue-600"}`}><FaStop size={16} /></button>

      <div className="ml-5 mt-1 text-lg font-bold ">{controlState} (v {version})</div>

    </div>
    <div className="flex-none">

      <button title="Load Project" className="bg-blue-500 text-white hover:bg-blue-600 font-bold uppercase text-xs px-3 py-3 rounded-full shadow hover:shadow-md outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" type="button" onClick={() => {
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
        document.querySelector("#import").click()
      }}>
        <FaFileImport size={16} />
      </button>

      <button title="Export CSV" className="bg-blue-500 text-white hover:bg-blue-600 font-bold uppercase text-xs px-3 py-3 rounded-full shadow hover:shadow-md outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" type="button" onClick={() => {

        let body = queue.join("\n")
        console.log()
        saveAs(new Blob([body], {
          type: 'text/plain'
        }), "export.txt")
      }}>
        <FaFileExport size={16} />
      </button>
    </div>
  </div>
}

function Steps(props) {
  let { step, setStep } = props
  let sections = [
    { name: "Settings" },
    { name: "Queue" },
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
  let { step, config, setConfig, setQueue, queue, fetchTraits, createList, traits, setFloor } = props

  switch (step) {
    case 0: return <>
      <div className="w-full md:w-5/12 px-3 mb-6 md:mb-0">
        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
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
        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
          Percent
        </label>
        <input type="number" defaultValue={config.percentOfFloor} onChange={(e) => setConfig({ ...config, percentOfFloor: e.target.value })} className="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="grid-first-name" />
        {/* <p className="text-red-500 text-xs italic">Please fill out this field.</p> */}
      </div>

      <div className="w-full md:w-5/12 px-3 mb-6 md:mb-0">
        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
          Collection URL
        </label>

        <input onChange={(e) => {
          setConfig({ ...config, collectionURL: e.target.value })
          let match = e.target.value.match(/(assets|collection)\/([^/]+)/)
          if (match) {
            let slug = match[2]
            fetch(`https://api.opensea.io/api/v1/collection/${slug}/stats`).then(r => r.json().then(response => {
              let { floor_price, one_day_sales, num_owners } = response.stats
              console.log({ floor_price, one_day_sales, num_owners })
              setFloor(floor_price)
            }))

            console.log(slug)
          }
        }} className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" type="text" placeholder="boredapeyachtclub" />

        {/* <p className="text-red-500 text-xs italic">Please fill out this field.</p> */}
      </div>

      <div className="w-full md:w-1/5 px-3 mb-6 md:mb-0">
        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
          Bid Lifetime
        </label>
        <select defaultValue={config.bidLifetime} onChange={(e) => setConfig({ ...config, bidLifetime: e.target.value })} className="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="grid-first-name">
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
        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
          Currency
        </label>
        <select defaultValue={config.currency} onChange={(e) => setConfig({ ...config, currency: e.target.value })} className="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="grid-first-name">
          <option value="weth">WETH</option>
          <option value="usdc">USDC</option>
        </select>
        {/* <p className="text-red-500 text-xs italic">Please fill out this field.</p> */}
      </div>
      <div className="w-full md:w-1/5 px-3 mb-6 md:mb-0">
        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
          Start Bid
        </label>
        <input type="number" defaultValue={config.startBid} onChange={(e) => setConfig({ ...config, startBid: e.target.value })} className="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="grid-first-name" />
        {/* <p className="text-red-500 text-xs italic">Please fill out this field.</p> */}
      </div>
      <div className="w-full md:w-1/5 px-3 mb-6 md:mb-0">
        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
          Max Bid
        </label>
        <input type="number" defaultValue={config.maxBid} onChange={(e) => setConfig({ ...config, maxBid: e.target.value })} className="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="grid-first-name" />
        {/* <p className="text-red-500 text-xs italic">Please fill out this field.</p> */}
      </div>
      <div className="w-full md:w-1/5 px-3 mb-6 md:mb-0">
        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
          increment
        </label>
        <input step="0.0001" type="number" defaultValue={config.increment} onChange={(e) => setConfig({ ...config, increment: e.target.value })} className="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="grid-first-name" />
        {/* <p className="text-red-500 text-xs italic">Please fill out this field.</p> */}
      </div>

      {/* <div className="flex justify-center">
        <div>
          <div className="form-check">
            <input onChange={(e) => setConfig({ ...config, useMetamask: e.target.checked })}
              className="h-4 w-4 border border-gray-300 rounded-sm mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
              type="checkbox"
              checked={config.useMetamask} />
            <label className="form-check-label inline-block text-gray-800">Use Metamask</label>
          </div>
        </div>
      </div> */}
      {!config.useMetamask && <>
        <div className="w-full px-3">
          <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
            Public Key
          </label>
          <input onChange={(e) => {
            // initInfura(e.target.value)
            localStorage.setItem("publicKey", e.target.value)
            setConfig({ ...config, publicKey: e.target.value })

          }} className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" type="text" value={config.publicKey} />
        </div>
        <div className="w-full px-3">
          <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
            Private Key
          </label>
          <input onChange={(e) => {
            // initInfura(e.target.value)
            localStorage.setItem("privateKey", e.target.value)
            setConfig({ ...config, privateKey: e.target.value })

          }} className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" type="password" value={config.privateKey} />
        </div>

      </>}


    </>
    case 1: return <div>
      <p><b>{queue.length} items in list</b> <button onClick={() => setQueue([])} className="px-2 bg-gray-300 border-2 border-gray-500">clear</button></p>
      {queue.slice(0, 10).map((row, i) => <div key={i}>{row}</div>)}
    </div>
    case 2:
      // https://api.opensea.io/api/v1/collection/doodles-official
      return <Lists fetchTraits={fetchTraits} createList={createList} traits={traits} />

    default: return <>x</>
  }
}

const fetchWithKey = (url) => {
  return fetch(url, { headers: { "X-API-KEY": apiKey } })
}











function App() {
  // const [web3, setWeb3] = useState()
  const [metadata, setMetadata] = useState({})
  const [tokens, setTokens] = useState({})
  // const [seaport, setSeaport] = useState()
  const [step, setStep] = useState(0)
  const [log, setLog] = useState([])
  const [queue, setQueue] = useState(mode === "test" ? [
    "0x16baf0de678e52367adc69fd067e5edd1d33e3bf/1486",
    "0x16baf0de678e52367adc69fd067e5edd1d33e3bf/1492",
  ] : [])
  const [nextCursor, setNextCursor] = useState()
  const [floor, setFloor] = useState()
  const [seaport, setSeaport] = useState()

  const [config, setConfig] = useState({
    startBid: 0.01,
    maxBid: 2,
    bidLifetime: "2",
    increment: 0.01,
    biddingOption: "fixed",
    percentOfFloor: 75,
    publicKey: "0xd55edD335aAA1606A4EF5E3b908F9a23Ed26C04a",
    privateKey: "0xd47e6c11d6e1eedfc195f6eb49744b45e029746d988469725eb4ae406a47854a",
    // publicKey: localStorage.getItem("publicKey") || "",
    // privateKey: localStorage.getItem("privateKey") || "",
    network: mode === "live" ? "Main" : "Rinkeby",
    apiKeys: [apiKey],
    rpcUrl: mode === "live" ? "https://mainnet.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161" : "https://rinkeby.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161",
  })

  // expiryTime: Number(bidLifetime)

  const [controlState, setControlState2] = useState("stopped")
  async function setControlState(cs) {
    setControlState2(cs)
  }

  useEffect(() => {
    console.log({ controlState, nextCursor })
    if (controlState === "fetching traits" && nextCursor) {
      console.log('fetching................')
      let timeout = setTimeout(() => {
        let { collection, traits, next } = nextCursor
        fetchWithKey(`https://api.opensea.io/api/v1/assets?collection_slug=${collection}&cursor=${next}&limit=50`).then(r => r.json().then(data => {
          console.log(data.assets.length)
          let newMetadata = { ...metadata }
          let newTokens = { ...tokens }
          for (let asset of data.assets) {
            newTokens[asset.token_id] = asset.traits
            for (let trait of asset.traits) {
              if (!newMetadata[trait.trait_type]) {
                newMetadata[trait.trait_type] = [trait.value]
              } else if (!newMetadata[trait.trait_type].includes(trait.value)) {
                newMetadata[trait.trait_type] = [...newMetadata[trait.trait_type], trait.value]
              }
            }
          }
          next = data.next
          setNextCursor(next ? { collection, traits, next } : null)
          setMetadata(newMetadata)
          setTokens(newTokens)

          // let newItems = newAssets.map(asset => `${asset.asset_contract?.address}/${asset.token_id}`)
          // if (newAssets.find(l => queue.includes(l))) {
          //   setControlState("stopped")
          //   setNextCursor(null)
          // } else {
          //   setQueue([...queue, ...newItems])
          // }

          if (!next) {
            setControlState("stopped")
          }
        }))
      }, 1000)
      return () => clearTimeout(timeout)
    }
    // eslint-disable-next-line
  }, [controlState, queue, metadata, config])

















  useEffect(() => {
    if(!seaport) return
    if (controlState === "playing" && queue.length > 0) {


        let { publicKey, startBid, bidLifetime, maxBid, increment, biddingOption, percentOfFloor, currency, useMetamask } = config
        // const publicKey = config.publicKey || "xxx"
        console.log({ config, invalid: { publicKey, startBid, bidLifetime, maxBid, increment, biddingOption, percentOfFloor, currency, useMetamask } })

        let timeout = setTimeout(async () => {
          if (!publicKey || !startBid || !bidLifetime || !maxBid || !increment) {
            alert("Invalid settings")
            // console.log({config, invalid: { publicKey, startBid, bidLifetime, maxBid, increment, biddingOption, percentOfFloor, currency, useMetamask }})
            setControlState("stopped")
            return
          }

          if (!percentOfFloor && (["floorPercent", "lowest"].includes(biddingOption))) {
            alert("Invalid floor percentage")
            setControlState("stopped")
          }

          if (currency !== "weth" && (["floorPercent", "lowest"].includes(biddingOption))) {
            alert(`No percentage bidding allowed for ${currency}`)
            setControlState("stopped")
          }

          startBid = Number(startBid)
          bidLifetime = Number(bidLifetime)
          maxBid = Number(maxBid)
          increment = Number(increment)
          percentOfFloor = Number(percentOfFloor)
          console.log({ publicKey, startBid, bidLifetime, maxBid, increment, percentOfFloor })

          let floorBid = floor * (percentOfFloor / 100)

          switch (biddingOption) {
            case "floorPercent":
              startBid = floorBid
              break;
            case "fixed": break;
            case "lowest":
              startBid = Math.min(startBid, floorBid)
              break;
            default: alert("no bidding option!!!")
          }

          let row = queue[0]
          console.log(row)
          let newQueue = queue.slice(1)

          // let seaport = useMetamask ? metamask : infura
          // setLog([...log, `using ${seaport.name}`])

          console.log({ seaport })
          let [tokenAddress, tokenId] = row.split("/")
          let expirationTime = Math.round(Date.now() / 1000 + 60 * 60 * parseInt(bidLifetime))
          let order = {
            asset: {
              tokenId,
              tokenAddress,
            },
            accountAddress: publicKey,
            startAmount: startBid,
            expirationTime
          }

          switch (currency) {
            case "usdc":
              order.paymentTokenAddress = "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48"
              break
            default: break
          }

          let tooHigh = false

          if (maxBid) {
            const bids = await seaport.api.getOrders({
              asset_contract_address: order.asset.tokenAddress,
              token_id: order.asset.tokenId,
              side: 0
            })
            let prices = bids.orders.map(o => parseInt(o.currentPrice.toString()) / e18)
            let topBid = prices.pop()
            if (topBid && topBid > startBid) {
              if (topBid + increment <= maxBid) {
                order.startAmount = topBid + increment
                console.log(`Increasing bid for #${order.asset.tokenId} to @ ${order.startAmount}`)
                setLog([...log, `Increasing bid for #${order.asset.tokenId} to @ ${order.startAmount}`])
              } else {
                // don't go over max amount!!!
                tooHigh = true
                console.log(`Top bid for #${order.asset.tokenId} too high @ ${topBid}`)
                setLog([...log, `Top bid for #${order.asset.tokenId} too high @ ${topBid}`])
              }
            }
          }

          console.log({ order })

          if (!tooHigh) {
            let error
            const offer = await seaport.createBuyOrder(order).catch(e => {
              error = e
            })
            if (error) {
              console.log(error.message)
              setLog([...log, `Error for #${order.asset.tokenId} - ${error.message}`])
            } else {
              console.log(`sucess! ${offer.hash}`)
              setLog([...log, `sucess for #${order.asset.tokenId}! ${offer.hash}`])
            }
          }

          setQueue(newQueue)
          if (newQueue.length === 0) {
            setControlState("stopped")
          }
        }, 1000)
        return () => clearTimeout(timeout)

    }
    // eslint-disable-next-line
  }, [controlState, queue, metadata, config, seaport]) //




















  const createList = (contract, traits = []) => {
    //  {group: 'Mouth', name: 'Moustache', id: 25}
    let keys = Object.keys(tokens)
    let matched = keys.filter(key => {
      let attributes = tokens[key]
      let found = traits.length === 0 || attributes.find(att => {
        return traits.find(trait => {
          return trait.group === att.trait_type && trait.name === att.value
        })
      })
      return found
    })

    console.log({ traits })
    console.log({ tokens })
    console.log({ matched })
    setQueue(matched.map(token_id => `${contract}/${token_id}`))
    setStep(1)
    setControlState("stopped")
  }

  const fetchTraits = (collection, traits = []) => {
    setMetadata({})
    setTokens({})
    console.log(collection, traits)
    // setStep(1)
    setControlState("fetching traits")
    fetchWithKey(`https://api.opensea.io/api/v1/assets?collection_slug=${collection}&limit=50`).then(r => r.json().then(data => {
      console.log(data.assets.length)
      let newMetadata = { ...metadata }
      let newTokens = { ...tokens }
      for (let asset of data.assets) {
        newTokens[asset.token_id] = asset.traits
        for (let trait of asset.traits) {
          if (!newMetadata[trait.trait_type]) {
            newMetadata[trait.trait_type] = [trait.value]
          } else if (!newMetadata[trait.trait_type].includes(trait.value)) {
            newMetadata[trait.trait_type] = [...newMetadata[trait.trait_type], trait.value]
          }
        }
      }

      let next = data.next
      console.log((next ? { collection, traits, next } : null))
      setNextCursor(next ? { collection, traits, next } : null)
      setMetadata(newMetadata)
      setTokens(newTokens)

      // let newItems = newAssets.map(asset => `${asset.asset_contract?.address}/${asset.token_id}`)
      // console.log(newItems)
      // setQueue([...queue, ...newItems])
      // console.log({ newAssets, next: data.next })
    }))
  }

  let attributes = {
    // "Eyes": [
    //   "Blue", "Green"
    // ],
    "Mouth": [
      "Pizza", "Smile"
    ]
  }

  return (
    <>
      <div className="bg-gray-900 min-w-screen min-h-screen z-50 hidden">
        <div className="relative top-32 m-auto text-gray-200 p-2 font-bold flex flex-inline bg-gray-700" style={{ width: "48rem" }}>
          <div className="w-96">
            <div className="flex py-1">
              <div className="w-24 px-1">
                <label className="block mb-2 text-xs font-bold">
                  Max Price
                </label>
                <input type="number" className="bg-gray-500 rounded w-16" />
              </div>
              <div className="w-24 px-1">
                <label className="block mb-2 text-xs font-bold">
                  Min Price
                </label>
                <input type="number" className="bg-gray-500 rounded w-16" />
              </div>
              <div className="flex mt-6 ">
                <input type="checkbox" className="rounded mr-1 mt-1" />
                <label className="text-xs font-bold">
                  Include Auctions
                </label>
              </div>
            </div>
            <div className="flex py-2 ml-2">
              <div>Max Rarity</div>
              <div><input type="number" className="bg-gray-500 ml-2 rounded" /></div>
            </div>
            <div className="py-2 ml-2">
              <label className="block mb-2 text-xs font-bold">
                Traits
              </label>
              <select className="bg-gray-500 w-48">
                {Object.keys(attributes).map(trait => <optgroup label={trait}>
                  {attributes[trait].map(value => <option className="p-1">{value}</option>)}
                </optgroup>
                )}
              </select>
            </div>
            <div className="flex py-2 ml-2">
              <div className="flex flex-grow">
                <input type="checkbox" className="mt-4" />
                <label className="text-xs mt-3 ml-1">Trigger Buy</label>
              </div>
              <button className="bg-blue-500 rounded px-2 py-2">Add Notifier</button>
            </div>
          </div>
          <div className="w-96">
            {/* {tokens.map(t => <div className="flex p-2">
              <div className="">[left side]</div>
              <div className="ml-2 flex-grow">#{t.token_id}</div>
              <div className="">⧫ {t.price}</div>

            </div>)} */}
          </div>
        </div>
      </div>

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
        accept=".json"
        style={{ display: "none" }}
      />
      <input
        id="import"
        accept=".txt"
        onChange={(e) => {
          console.log("change")
          let reader = new FileReader()
          reader.onload = function () {
            console.log("import")
            let data = ('' + reader.result).split(/\s*\n\s*/)
            console.log({ data })
            setQueue(data)
            setStep(1)
            document.querySelector("#import").value = null
          }
          reader.readAsText(e.target.files[0])
        }}
        type="file"
        style={{ display: "none" }}
      />


      <div className="w-full max-w-lg m-auto mt-10">
        <Controls controlState={controlState} setSeaport={setSeaport} setControlState={setControlState} config={config} setConfig={setConfig} queue={queue} />
        <Steps step={step} setStep={setStep} />

        <div className="flex flex-wrap -mx-3 mb-6">
          <Step setQueue={setQueue} step={step} setFloor={setFloor} config={config} setConfig={setConfig} queue={queue} fetchTraits={fetchTraits} createList={createList} traits={metadata} />
        </div>
        <div className="pl-2 h-48 mb-6 bg-black text-green-500 overflow-y-scroll">
          {log.map((line, i) => <p key={i}>{line}</p>)}
        </div>
        <div className="">
          <button onClick={(e) => {
            setLog([])
          }} className={`m-auto block bg-blue-500 text-white font-bold text-xs px-3 py-3 rounded `}>Clear Logs</button>
        </div>


      </div>
      {JSON.stringify({ floor })}
      {/* {JSON.stringify(config)} */}
    </>

  );
}

export default App