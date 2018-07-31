let baseEndpoint = ''
// const apiVersion = 'v1'

const hostname = window && window.location && window.location.hostname

if (hostname === 'eosocial.app') {
  baseEndpoint = 'https://eos.owdin.network'
} else if (hostname === 'dev.eosocial.app') {
  baseEndpoint = 'https://dev.eos.owdin.network'
} else {
  baseEndpoint = process.env.REACT_APP_CHAIN_ENDPOINT || 'http://localhost:8888'
}

export const ENDPOINT = baseEndpoint

export default ENDPOINT
