module.exports = {
  accountAddress: "0xd55edD335aAA1606A4EF5E3b908F9a23Ed26C04a",
  privateKey: "0xd47e6c11d6e1eedfc195f6eb49744b45e029746d988469725eb4ae406a47854a",
  "rpcUrl": {
    Main: "https://mainnet.infura.io/v3/b9e08ed9a06b4447928ef1b8a5a258ae",
    Rinkeby: "https://rinkeby.infura.io/v3/b9e08ed9a06b4447928ef1b8a5a258ae",
  },
  "apiKeys": ["ad77a7bd9b2c4d309aad53a4e093584d"],
  "expiryTime": 2, // time in hours
  "assetsPerWallet": 1000, // the max tokens to look at per wallet
  "bidsPerWallet": 100, // don't bid on more than this many per wallet
  "collectionsPerWallet": 40,
  "minFloor": 0.12, // don't bid on collections w/ floor lower than this
  "minSales": 50, // don't bid on collections w/ 23 hour sales lower than this
  "minOwners": 1000, // don't bid on collections fewer owners than this
  "minPercent": 60, // the minumum percent of floor to bid
  "maxPercent": 80, // the maxumum percent of floor to bid
  "maxAmount": 2, // the maxumum amount of WETH to bid
  "increment": .001, // the amount to outbid top bidders by
  "retries": 1, // the number of times to retry to get top bid
  "retryAfter": 20, // number of minutes to retry after
  "threads": 2, // num threads
  "network": "Rinkeby",
}

