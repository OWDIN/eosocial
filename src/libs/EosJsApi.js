import eosjs from 'eosjs'
import ecc from 'eosjs-ecc'

const config = {
  chainId: process.env.REACT_APP_EOSIO_CHAIN_ID,
  keyProvider: [
    process.env.REACT_APP_EOSIO_EOSOCIAL_PRIVATE_KEY,
  ],
  httpEndpoint: 'http://localhost:8888',
  expireInSeconds: 60,
  broadcast: true,
  // verbose: true, // in dev
  sign: true,
}

const EOS = eosjs(config)

export function createAccount(accountName, publicKey) {
  return EOS.transaction((transaction) => {
    transaction.newaccount({
      creator: 'eossocialapp',
      name: accountName,
      owner: publicKey,
      active: publicKey,
    })

    transaction.buyrambytes({
      payer: 'eossocialapp',
      receiver: accountName,
      bytes: 8192,
    })

    transaction.delegatebw({
      from: 'eossocialapp',
      receiver: accountName,
      stake_net_quantity: '10.0000 SYS',
      stake_cpu_quantity: '10.0000 SYS',
      transfer: 0,
    })
  })
}

export function validPrivate(key) {
  return ecc.isValidPrivate(key)
}

export function validPublic(key) {
  console.log('validPublic: ', ecc.isValidPublic(key))
  return ecc.isValidPublic(key)
}

export async function getGlobalFeed(limit=20) {
  const data = await EOS.getTableRows({
    code: 'eossocialapp',
    scope: 'eossocialapp',
    table: 'posts',
    limit,
    json: true,
  })

  return data
}

export async function login(accountName, privateKey) {
  const accountInfo = await EOS.getAccount(accountName)
  const publicKey = ecc.privateToPublic(privateKey) // ERR: need try catch

  console.log(accountInfo)

  if (accountInfo.permissions[0].required_auth.keys[0].key === publicKey) { // ERR: need multiple keys
    return true
  }

  return false
}

export default createAccount
