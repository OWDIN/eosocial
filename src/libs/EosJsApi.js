import eosjs from 'eosjs'
import ecc from 'eosjs-ecc'
import {
  CHAIN_ID,
  DAPP_ACCOUNT,
  DAPP_PRIVATE_KEY,
  ENDPOINT,
  DEFAULT_SYMBOL,
} from './api-config'

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
const EOS = eosjs(config)

export async function createAccount(accountName, ownerKey, activeKey) {
  // for local testnet
  const hostname = window && window.location && window.location.hostname
  if (hostname !== 'eosocial.owdin.network') {
    let result = await EOS.transaction((transaction) => {
      transaction.newaccount({
        creator: DAPP_ACCOUNT,
        name: accountName,
        owner: ownerKey,
        active: activeKey,
      })

      transaction.buyrambytes({
        payer: DAPP_ACCOUNT,
        receiver: accountName,
        bytes: 8192,
      })

      transaction.delegatebw({
        from: DAPP_ACCOUNT,
        receiver: accountName,
        stake_net_quantity: `10.0000 ${DEFAULT_SYMBOL}`,
        stake_cpu_quantity: `10.0000 ${DEFAULT_SYMBOL}`,
        transfer: 0,
      })
    }).catch(() => {
      result = false
    })

    return result
  }

  // for public testnet
  const rawResponse = await fetch('/v1/signup', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      accountName,
      ownerKey,
      activeKey,
    }),
  })
  const result = await rawResponse.json()

  return result
}

export function validPrivate(key) {
  return ecc.isValidPrivate(key)
}

export function validPublic(key) {
  return ecc.isValidPublic(key)
}

export async function getGlobalFeed(limit=100) {
  const data = await EOS.getTableRows({
    code: DAPP_ACCOUNT,
    scope: DAPP_ACCOUNT,
    table: 'posts',
    limit,
    json: true,
  })

  return data
}

export async function getVoteInfo(postId, limit=100) {
  const data = await EOS.getTableRows({
    code: DAPP_ACCOUNT,
    scope: postId,
    table: 'polls',
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

export async function writePost(accountName, privateKey, content) {
  const contractConfig = {
    chainId: CHAIN_ID,
    keyProvider: [
      privateKey,
    ],
    httpEndpoint: ENDPOINT,
    expireInSeconds: 60,
    broadcast: true,
    verbose: false, // true in dev
    sign: true,
  }

  const contractEOS = eosjs(contractConfig)

  let result = await contractEOS.transaction({
    actions: [{
      account: DAPP_ACCOUNT,
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
  }).catch(() => {
    result = false
  })

  return result
}

export async function updatePost() {
  // Work in Progress...
}

export async function removePost() {
  // Work in Progress...
}

export async function votePost(accountName, privateKey, postId, voteType) {
  const contractConfig = {
    chainId: CHAIN_ID,
    keyProvider: [
      privateKey,
    ],
    httpEndpoint: ENDPOINT,
    expireInSeconds: 60,
    broadcast: true,
    verbose: false, // true in dev
    sign: true,
  }

  const contractEOS = eosjs(contractConfig)

  let result = false
  const voteResponse = await contractEOS.transaction({
    actions: [{
      account: DAPP_ACCOUNT,
      name: 'vote',
      data: {
        post_id: postId,
        voter: accountName,
        type: voteType,
      },
      authorization: [{
        actor: accountName,
        permission: 'active',
      }],
    }],
  }).catch(() => {
    result = false
  })

  result = {
    type: voteType,
    data: voteResponse,
  }

  return result
}
