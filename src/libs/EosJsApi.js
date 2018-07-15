import eosjs from 'eosjs'

export function createAccount(account, publicKey) {
  const config = {
    chainId: process.env.REACT_APP_EOSIO_CHAIN_ID,
    keyProvider: [
      process.env.REACT_APP_EOSIO_PRIVATE_KEY,
    ],
    httpEndpoint: 'http://localhost:8888',
    expireInSeconds: 60,
    broadcast: true,
    verbose: true, // in dev
    sign: true,
  }

  const EOS = eosjs(config)

  EOS.transaction((transaction) => {
    transaction.newaccount({
      creator: 'socialeosapp',
      name: account,
      owner: publicKey,
      active: publicKey,
    })

    transaction.buyrambytes({
      payer: 'socialeosapp',
      receiver: account,
      bytes: 8192,
    })

    transaction.delegatebw({
      from: 'socialeosapp',
      receiver: account,
      stake_net_quantity: '10.0000 SYS',
      stake_cpu_quantity: '10.0000 SYS',
      transfer: 0,
    })
  })
}

export default createAccount
