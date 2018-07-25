import eosjs from 'eosjs'

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

export function createAccount(account, publicKey) {
  return EOS.transaction((transaction) => {
    transaction.newaccount({
      creator: 'eossocialapp',
      name: account,
      owner: publicKey,
      active: publicKey,
    })

    transaction.buyrambytes({
      payer: 'eossocialapp',
      receiver: account,
      bytes: 8192,
    })

    transaction.delegatebw({
      from: 'eossocialapp',
      receiver: account,
      stake_net_quantity: '10.0000 SYS',
      stake_cpu_quantity: '10.0000 SYS',
      transfer: 0,
    })
  })
}

export async function getGlobalFeed(limit=5) {
  const data = await EOS.getTableRows({
    code: 'eossocialapp',
    scope: 'eossocialapp',
    table: 'posts',
    limit,
    json: true,
  })

  return data
}

export default createAccount
