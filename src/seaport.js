// const { accountAddress, privateKey, mnemonic, minFloor, expiryTime, rpcUrl, apiKeys, network } = require("./config.js")
const { OpenSeaPort, Network } = require("opensea-js")
const { MnemonicWalletSubprovider, PrivateKeyWalletSubprovider } = require("@0x/subproviders")
const RPCSubprovider = require("web3-provider-engine/subproviders/rpc")
const Web3ProviderEngine = require("web3-provider-engine")

// const readline = require('readline')

// let config = {}

async function getSeaport(config) {
	let { privateKey, mnemonic, rpcUrl, apiKeys, network } = config
	if(!privateKey) return
	console.log({sc: config})
	const infuraRpcSubprovider = await new RPCSubprovider({ rpcUrl })
	const providerEngine = await new Web3ProviderEngine()

	if (mnemonic) {
		const mnemonicWalletSubprovider = await new MnemonicWalletSubprovider({ mnemonic })
		await providerEngine.addProvider(mnemonicWalletSubprovider)
	} else {
		const privateKeyProvider = await new PrivateKeyWalletSubprovider(privateKey)
		await providerEngine.addProvider(privateKeyProvider)
	}

	await providerEngine.addProvider(infuraRpcSubprovider)
	await providerEngine.start()

	let options = {
		networkName: Network[network],
		gas: 99
	}

  if(network === "Main"){
    options.apiKey = apiKeys[0]
  }


	return new OpenSeaPort(providerEngine, options, (arg, err) => console.log(arg, err))

	// if (baseGasPrice) {
	// 	seaport.utils().setBaseGasPrice(baseGasPrice)
	// }
}


// const referrerAddress = "0xF6e600d91Cb685d39F55d9a10C52BF5e6381450e"
// const delay = require('./delay')

// const e18 = 1000000000000000000

let seaportPromise = getSeaport()

// async function setSeaportConfig(c) {
// 	config = c
// 	seaportPromise = getSeaport()
// }

// async function bidOn(opts) {
// 	let {expiryTime, accountAddress, increment} = config

// 	let seaport = await seaportPromise
// 	let {asset, startAmount, topBid, maxAmount} = opts
// 	let {tokenAddress, tokenId} = asset

// 	if(!tokenAddress || !tokenId){
// 		return {status: "failed", error: "missing info"}
// 	}

// 	console.log({tokenId, tokenAddress})

// 	// debugger
// 	// schemaName = assets[0].asset_contract.schema_name

// 	let expirationTime = Math.round(Date.now() / 1000 + 60 * 60 * expiryTime)
// 	// debugger

// 	let order = {
// 		asset: {
// 			tokenId,
// 			tokenAddress,
// 		},
// 		accountAddress,
// 		startAmount,
// 		// schemaName,
// 		expirationTime,
// 		referrerAddress
// 	}

// 	if(topBid && topBid > startAmount){
// 		if (topBid + increment <= maxAmount) {
// 			order.startAmount = topBid + increment
// 			console.log(`Increasing bid for #${order.asset.tokenId} to @ ${order.startAmount}`)
// 		} else {
// 			// we shouldn't get here
// 			console.log(`Top bid for #${order.asset.tokenId} too high @ ${topBid}`)
// 			return
// 		}
// 	}

// 	console.log({tokenId, tokenAddress})

// 	order.startAmount = Math.round(order.startAmount * 10000) / 10000

// 	let offer
// 	try {
// 		console.log("try")
// 		offer = await seaport.createBuyOrder(order)
// 		console.log("success")
// 		return {
// 			token: order.asset.tokenId,
// 			status: "success",
// 			hash: offer.hash,
// 			message: ""
// 		}

// 	} catch(e) {
// 		console.log(e)
// 		return {status: "failed", error: e.message}
// 	}
// }

// async function getTopBid(asset){
// 	let seaport = await seaportPromise

// 	if(!asset.asset_contract?.address || !asset.token_id){
// 		debugger
// 	}

// 	console.log({
// 		asset_contract_address: asset.asset_contract.address,
// 		token_id: asset.token_id,
// 		side: 0
// 	})
// 	await delay()

// 	let bids
// 	while(!bids){
// 		bids = await seaport.api.getOrders({
// 			asset_contract_address: asset.asset_contract.address,
// 			token_id: asset.token_id,
// 			side: 0
// 		}).catch(e => {
// 			debugger

// 		})
// 		if(!bids){
// 			await delay()
// 		}
// 	}

// 	let orders = bids.orders.map(o => [o.maker, parseInt(o.currentPrice.toString()) / e18])
// 	  .sort((a, b) => a[1] - b[1])

// 	let topBid = orders.pop()
// 	// if(orders.length > 1){
// 	// 	debugger
// 	// }

// 	return topBid || []
// }

module.exports = { seaportPromise, getSeaport }
// module.exports = {getSeaport}

