const express = require('express')
const path = require('path')
const app = express()

let baseEndpoint = ''
let account = ''

const hostname = process.env.HOSTNAME || 'localhost'
if (hostname === 'eosocial.owdin.network') {
  baseEndpoint = process.env.CHAIN_ENDPOINT || 'https://api.jungle.alohaeos.com'
  account = process.env.ACCOUNT || 'eossocialapp'
} else {
  baseEndpoint = process.env.CHAIN_ENDPOINT || 'http://localhost:8888'
  account = process.env.ACCOUNT || 'eossocialapp'
}
const ENDPOINT = baseEndpoint

const PORT = process.env.MIDDLEWARE_PORT || 5000
const CHAIN_ID = process.env.CHAIN_ID || ''
const DAPP_ACCOUNT = account
const DAPP_PRIVATE_KEY = process.env.ACTIVE_PRIVATE_KEY || '<YOUR-DAPP-PRIVATE-KEY-FOR-TEST>'
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

app.get('/v1/health', (req, res) => {
  res.send({
    code: 200,
    status: 'running',
  })
})

// render react
if (process.env.NODE_ENV === 'production') {
  // serve react static files
  app.use(express.static(path.join(__dirname, '../build')))

  // handle react-router and return all requests to react app
  app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname, '../build', 'index.html'))
  })
}
app.listen(PORT, () => console.log(`Listening on port ${PORT}`))
