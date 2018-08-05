let baseEndpoint = ''
let account = ''

export const apiVersion = 'v1'

const hostname = window && window.location && window.location.hostname
if (hostname === 'eosocial.owdin.network') {
  // baseEndpoint = 'https://eos.owdin.network:9999'
  baseEndpoint = ''
  account = process.env.ACCOUNT
// } else if (hostname === 'dev.eosocial.app') {
//   baseEndpoint = 'https://dev.eos.owdin.network:9999'
} else {
  baseEndpoint = process.env.REACT_APP_CHAIN_ENDPOINT || 'http://localhost:8888'
  account = process.env.DAPP_ACCOUNT || 'eossocialapp'
}
export const ENDPOINT = baseEndpoint

export const CHAIN_ID = process.env.CHAIN_ID || ''
export const DAPP_ACCOUNT = account
export const DAPP_PRIVATE_KEY = process.env.ACTIVE_PRIVATE_KEY

export default ENDPOINT
