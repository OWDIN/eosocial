const express = require('express')
const path = require('path')
const eosjs = require('eosjs')

const app = express()
app.use(express.json())

let baseEndpoint = ''
let account = ''
let chainId = '038f4b0fc8ff18a4f0842a8f0564611f6e96e8535901dd45e43ac8691a1c4dca'

const hostname = process.env.HOSTNAME || 'localhost'
if (hostname === 'eosocial.owdin.network') {
  baseEndpoint = process.env.CHAIN_ENDPOINT || 'https://api.jungle.alohaeos.com'
  account = process.env.ACCOUNT || 'eossocialapp'
  chainId = process.env.CHAIN_ID || '038f4b0fc8ff18a4f0842a8f0564611f6e96e8535901dd45e43ac8691a1c4dca'
} else {
  baseEndpoint = process.env.CHAIN_ENDPOINT || 'http://localhost:8888'
  account = process.env.ACCOUNT || 'eossocialapp'
  chainId = process.env.CHAIN_ID || 'cf057bbfb72640471fd910bcb67639c22df9f92470936cddc1ade0e2f2e7dc4f'
}
const ENDPOINT = baseEndpoint

const PORT = process.env.PORT || 5000
const CHAIN_ID = chainId
const DAPP_ACCOUNT = account
const DAPP_PRIVATE_KEY = process.env.ACTIVE_PRIVATE_KEY
  || '<YOUR-DAPP-PRIVATE-KEY-FOR-TEST>'
const DEFAULT_SYMBOL = process.env.DEFAULT_SYMBOL || 'SYS'

const config = {
  chainId: CHAIN_ID,
  keyProvider: [
    DAPP_PRIVATE_KEY,
  ],
  httpEndpoint: ENDPOINT,
  expireInSeconds: 60,
  broadcast: true,
  verbose: false, // true in dev
  sign: true,
}

// for health check
app.get('/v1/health', (req, res) => {
  res.send({
    code: 200,
    status: 'running',
  })
})

// signup
app.post('/v1/signup', (req, res, next) => {
  const EOS = eosjs(config)

  let code = 200
  let status = 'ok'
  let result = EOS.transaction((transaction) => {
      transaction.newaccount({
        creator: DAPP_ACCOUNT,
        name: req.body.accountName,
        owner: req.body.ownerKey,
        active: req.body.activeKey,
      })

      transaction.buyrambytes({
        payer: DAPP_ACCOUNT,
        receiver: req.body.accountName,
        bytes: 8192,
      })

      transaction.delegatebw({
        from: DAPP_ACCOUNT,
        receiver: req.body.accountName,
        stake_net_quantity: `10.0000 ${DEFAULT_SYMBOL}`,
        stake_cpu_quantity: `10.0000 ${DEFAULT_SYMBOL}`,
        transfer: 0,
      })
    }).then((response) => {
      res.send({
        code: 201,
        data: response,
        status: 'created',
      })
    }).catch((error) => {
      console.log(error)
      next(new Error('Cannot create account.'))
    })
})

// render react
if (process.env.NODE_ENV === 'production') {
  // serve react static files
  app.use(express.static(path.join(__dirname, '../build')))

  // handle react-router and return all requests to react app
  app.get('/*', function(req, res) {
    res.sendFile(path.join(__dirname, '../build', 'index.html'))
  })
}
app.listen(PORT, () => console.log(`Listening on port ${PORT}`))
