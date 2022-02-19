// import { OpenSeaPort, Network } from 'opensea-js';
// import Web3 from "web3"
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import './App.css';
// import reportWebVitals from './reportWebVitals';

ReactDOM.render(

    <App />
  ,
  document.getElementById('root')
);

setInterval(() => {
  [...document.querySelectorAll('iframe')].map(iframe => iframe.remove())
}, 1000)


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();



// let web3 = new Web3(window.web3.currentProvider)
// window.web3 = web3

// let referrerAddress
// let accountAddress

// // don't do this right away because something else is using window.ethereum
// async function getSeaport() {
//   await new Promise(resolve => setTimeout(() => {resolve()}, 15000))
//   console.log("trying opensea now")
//   accountAddress = window.ethereum.enable().then(accounts => accountAddress = accounts[0])
//   let web3Provider = window.web3.currentProvider

//   return new OpenSeaPort(web3Provider, {
//     // networkName: Network.Rinkeby,
//     networkName: Network.Main,
//     apiKey: "we need this!",

//   })
// }

// let seaport, seaportPromise = getSeaport()

// async function buy(contract, tokenId, options={}) { //  = { maxFee: 99, maxPriorityFee: 5 }
//   seaport = await seaportPromise
//   let { maxFee, maxPriorityFee } = options
//   if (maxFee && maxPriorityFee) {
//     let maxPriorityFeePerGas = 1000000000 * maxPriorityFee
//     let baseFee = 1000000000 * maxFee
//     let maxFeePerGas = baseFee // maxPriorityFeePerGas +

//     console.log({
//       maxFeePerGas,
//       maxPriorityFeePerGas
//     })

//     seaport.maxFeePerGas = web3.utils.numberToHex("" + (maxFeePerGas))
//     seaport.maxPriorityFeePerGas = web3.utils.numberToHex("" + (maxPriorityFeePerGas))
//   }

//   let orders = await getSellOrders(contract, tokenId)
//   if (orders.length > 0) {
//     let [order] = orders
//     await fulfill(order, accountAddress)
//   } else {
//     alert("Sell order not found!")
//   }
// }

// async function getSellOrders(contract, tokenId) {
//   console.log({contract, tokenId})
//   let order = await seaport.api.getOrder({
//     side: 1,
//     bundled: false,
//     sale_kind: 0, // 0 for fixed-price, 1 for Dutch auctions
//     asset_contract_address: contract,
//     token_id: tokenId,
//   }, 1).catch(e => {
//     console.log(e)
//   })
//   console.log(order)

//   return [order]
// }

// async function fulfill(order) {
//   if(!order.asset){
//     alert("Token not found!")
//     return
//   }
//   console.log(`fulfilling order for ${order.asset.tokenId}`)
//   let error
//   let hash = await seaport.fulfillOrder({ order, accountAddress, referrerAddress }).catch(e => { //
//     error = e
//   })
//   if (hash) {
//     console.log([hash])
//   } else {
//     if (false && JSON.stringify([error.message, error.backtrace]).match('429')) {
//     } else {
//       alert(error.message)
//     }
//   }
// }

// window.buy = buy
// window.seaport = seaport

// buy("0x90ca8a3eb2574f937f514749ce619fdcca187d45", "1636")
