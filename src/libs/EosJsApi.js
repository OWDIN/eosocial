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
  verbose: false, // true in dev
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
  return ecc.isValidPublic(key)
}

export async function getGlobalFeed(limit=100) {
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
  const accountActiveKeys = accountInfo.permissions[0].required_auth.keys
  const accountOwnerKeys = accountInfo.permissions[1].required_auth.keys

  let publicKey = null

  try {
    publicKey = ecc.privateToPublic(privateKey)
  } catch (error) {
    console.log(error)
    return false
  }

  for (let index = 0; index < accountActiveKeys.length; index++) {
    if (accountActiveKeys[index].key === publicKey) {
      return true
    }
  }

  for (let index = 0; index < accountOwnerKeys.length; index++) {
    if (accountOwnerKeys[index].key === publicKey) {
      return true
    }
  }

  return false
}

export async function createPost(accountName, privateKey, content) {
  // const result = await EOS.transaction('eossocialapp', (eossocialapp) => {
  //   eossocialapp.write({
  //     author: accountName,
  //     content,
  //   }, { authorization: `${accountName}` })
  // })

  const contractConfig = {
    chainId: process.env.REACT_APP_EOSIO_CHAIN_ID,
    keyProvider: [
      privateKey,
    ],
    httpEndpoint: 'http://localhost:8888',
    expireInSeconds: 60,
    broadcast: true,
    verbose: false, // true in dev
    sign: true,
  }

  const contractEOS = eosjs(contractConfig)

  const result = await contractEOS.transaction({
    actions: [{
      account: 'eossocialapp',
      name: 'write',
      data: {
        author: accountName,
        content,
      },
      authorization: [{
        actor: accountName,
        permission: 'active',
      }],
    }],
  })

  return result
}
