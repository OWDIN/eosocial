![readme-banner](https://user-images.githubusercontent.com/1831308/43113852-1bcf3c50-8f37-11e8-8e8d-d38d064ddbe9.png)

# EOSocial
> Work in Progress...

EOSocial is votable social sample dApp run by EOS Testnet. You can see how dApp works.

**Disclaimer: This is sample dApp running on local Testnet. You have to use carefully if you're use it with your Mainnet keys.**

## Getting Started
These instructions will get you project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live machine.

### Requirements
EOSocial can run on virtually all platforms where Docker can (macOS, Linux, etc.).

- Docker **18.05.0-ce** or higher
- Node **8.0.x** or higher
  - NPM or Yarn

### Installation
Run nodeos container locally.

```bash
# run nodeos container
$ docker run --name nodeos -p 8888:8888 -p 9876:9876 -t eosio/eos nodeosd.sh -e --http-alias=nodeos:8888 --http-alias=127.0.0.1:8888 --http-alias=localhost:8888

# set config files
$ docker cp config.ini nodeos:/opt/eosio/bin/data-dir

# restart
$ docker restart nodeos
```

Check it is working:

```bash
$ docker logs -f nodeos
$ curl localhost:8888/v1/chain/get_info
```

Generate Testnet token and push smart contract:

```bash
# alias for cleos
$ alias cleos_docker='docker exec nodeos /opt/eosio/bin/cleos --wallet-url http://localhost:8888'

# unlock wallet
$ cleos_docker wallet create
$ cleos_docker wallet unlock --password <WALLET_PASSWORD>
$ cleos_docker wallet import 5KQwrPbwdL6PhXujxW37FSSQZ1JiwsST4cqQzDeyXtP79zkvFD3

# create system accounts
$ cleos_docker create account eosio eosio.bios EOS6MRyAjQq8ud7hVNYcfnVPJqcVpscN5So8BhtHuGYqET5GDW5CV
$ cleos_docker create account eosio eosio.bpay EOS6MRyAjQq8ud7hVNYcfnVPJqcVpscN5So8BhtHuGYqET5GDW5CV
$ cleos_docker create account eosio eosio.msig EOS6MRyAjQq8ud7hVNYcfnVPJqcVpscN5So8BhtHuGYqET5GDW5CV
$ cleos_docker create account eosio eosio.names EOS6MRyAjQq8ud7hVNYcfnVPJqcVpscN5So8BhtHuGYqET5GDW5CV
$ cleos_docker create account eosio eosio.ram EOS6MRyAjQq8ud7hVNYcfnVPJqcVpscN5So8BhtHuGYqET5GDW5CV
$ cleos_docker create account eosio eosio.ramfee EOS6MRyAjQq8ud7hVNYcfnVPJqcVpscN5So8BhtHuGYqET5GDW5CV
$ cleos_docker create account eosio eosio.saving EOS6MRyAjQq8ud7hVNYcfnVPJqcVpscN5So8BhtHuGYqET5GDW5CV
$ cleos_docker create account eosio eosio.stake EOS6MRyAjQq8ud7hVNYcfnVPJqcVpscN5So8BhtHuGYqET5GDW5CV
$ cleos_docker create account eosio eosio.token EOS6MRyAjQq8ud7hVNYcfnVPJqcVpscN5So8BhtHuGYqET5GDW5CV
$ cleos_docker create account eosio eosio.vpay EOS6MRyAjQq8ud7hVNYcfnVPJqcVpscN5So8BhtHuGYqET5GDW5CV

# deploy bios contract
$ cleos_docker set contract eosio.bios /opt/eosio/bin/data-dir/contracts/eosio.bios -p eosio.bios

# deploy multi signature contract
$ cleos_docker set contract eosio.msig /opt/eosio/bin/data-dir/contracts/eosio.msig -p eosio.msig

# deploy token contract
$ cleos_docker set contract eosio.token /opt/eosio/bin/data-dir/contracts/eosio.token -p eosio.token

# generate token
$ cleos_docker push action eosio.token create '{"issuer":"eosio", "maximum_supply":"10000000000.0000 SYS", "can_freeze":0, "can_recall":0, "can_whitelist":0}' -p eosio.token

# issue token
$ cleos_docker push action eosio.token issue '["eosio", "10000000.0000 SYS", "first issue"]' -p eosio

# deploy system contract
$ cleos_docker set contract eosio /opt/eosio/bin/data-dir/contracts/eosio.system

# make eosio.msig a privileged account
$ cleos_docker push action eosio setpriv '["eosio.msig", 1]' -p eosio@active

# create staked account for eosocial dApp
$ cleos_docker create key
Private key: <DAPP_PRIVATE_KEY>
Public key: <DAPP_PUBLIC_KEY>

$ cleos_docker system newaccount eosio --transfer eossocialapp <DAPP_PUBLIC_KEY> --stake-net "1000000 SYS" --stake-cpu "1000000 SYS" --buy-ram "100000 SYS"

# transfer initial deposit
$ cleos_docker transfer eosio eossocialapp "1000000 SYS" "initial deposit"
```

Check generated token:

```bash
$ cleos_docker get currency stats eosio.token SYS
{
  "SYS": {
    "supply": "11000000.0000 SYS",
    "max_supply": "10000000000.0000 SYS",
    "issuer": "eosio"
  }
}
```

Check eosocial dApp account:

```bash
$ cleos_docker get account eossocialapp
permissions:
     owner     1:    1 <DAPP_PUBLIC_KEY>
        active     1:    1 <DAPP_PUBLIC_KEY>
memory:
     quota:     63.36 GiB    used:     3.912 KiB

net bandwidth:
     staked:    1000000.0000 SYS           (total stake delegated from account to self)
     delegated:       0.0000 SYS           (total staked delegated to account from others)
     used:               672 bytes
     available:        164.8 TiB
     limit:            164.8 TiB

cpu bandwidth:
     staked:    1000000.0000 SYS           (total stake delegated from account to self)
     delegated:       0.0000 SYS           (total staked delegated to account from others)
     used:             71.44 ms
     available:         9600 hr
     limit:             9600 hr

SYS balances:
     liquid:       999957.5920 SYS
     staked:      2000000.0000 SYS
     unstaking:         0.0000 SYS
     total:       2999957.5920 SYS

producers:     <not voted>
```

Deploy smart contract:

```bash
# import eossocialapp private key
$ cleos_docker wallet import <DAPP_PRIVATE_KEY>

# send eosocial smart contract
$ docker cp contracts/eosocial nodeos:/opt/eosio/bin/data-dir/contracts/

# deploy eosocial smart contract
$ cleos_docker set contract eossocialapp /opt/eosio/bin/data-dir/contracts/eosocial

# test smart contract
## write
$ cleos_docker push action eossocialapp write '{"author": "{ACCOUNT_NAME}", "content": "first post"}' -p {ACCOUNT_NAME}
```

Start React Project like below:

```bash
$ yarn start
```

## Contributing
> WIP

Please read [CONTRIBUTING](#WIP) for details on our code of conduct, and the process for submitting pull requests to us.

## Authors
- CHANN - [@channprj](https://github.com/channprj)

## License
This project is licensed under the MIT License - see the [LICENSE](LICENSE.md) file for details

## Acknowledgments
- EOSIO

## References
- [EOSIO Developer Portal](https://developers.eos.io/)
- [EOSDocs](https://www.eosdocs.io/)
