let baseEndpoint = ''
// const apiVersion = 'v1'

const hostname = window && window.location && window.location.hostname

if (hostname === 'eosocial.owdin.network') {
  baseEndpoint = 'https://eos.owdin.network:9999'
// } else if (hostname === 'dev.eosocial.app') {
//   baseEndpoint = 'https://dev.eos.owdin.network:9999'
} else {
  baseEndpoint = process.env.REACT_APP_CHAIN_ENDPOINT || 'http://localhost:8888'
}

export const ENDPOINT = baseEndpoint

export default ENDPOINT
