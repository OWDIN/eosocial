const express = require('express')
const path = require('path')
const app = express()
const port = process.env.MIDDLEWARE_PORT || 5000

const DAPP_ACCOUNT = process.env.ACCOUNT || 'eossocialapp'
const DAPP_PRIVATE_KEY = process.env.ACTIVE_PRIVATE_KEY || '<YOUR-DAPP-PRIVATE-KEY-FOR-TEST>'
const DEFAULT_SYMBOL = process.env.DEFAULT_SYMBOL || 'SYS'

app.get('/api/hello', (req, res) => {
  res.send({ express: 'Hello From Express' })
})

if (process.env.NODE_ENV === 'production') {
  // serve react static files
  app.use(express.static(path.join(__dirname, 'build')))

  // handle react-router and return all requests to react app
  app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'))
  })
}
app.listen(port, () => console.log(`Listening on port ${port}`))
