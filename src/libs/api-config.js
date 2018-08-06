let baseEndpoint = ''
let account = ''

export const apiVersion = 'v1'

const hostname = window && window.location && window.location.hostname
if (hostname === 'eosocial.owdin.network') {
  baseEndpoint = process.env.CHAIN_ENDPOINT || 'https://api.jungle.alohaeos.com'
  account = process.env.ACCOUNT || 'eossocialapp'
} else {
  baseEndpoint = process.env.CHAIN_ENDPOINT || 'http://localhost:8888'
  account = process.env.ACCOUNT || 'eossocialapp'
}
export const ENDPOINT = baseEndpoint

export const CHAIN_ID = process.env.CHAIN_ID || ''
export const DAPP_ACCOUNT = account
export const DAPP_PRIVATE_KEY = process.env.ACTIVE_PRIVATE_KEY || '<YOUR-DAPP-PRIVATE-KEY-FOR-TEST>'
export const DEFAULT_SYMBOL = process.env.DEFAULT_SYMBOL || 'SYS'

console.table(process.env)
export default ENDPOINT
