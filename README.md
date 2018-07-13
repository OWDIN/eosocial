# EOSocial
> Work in Progress...

EOSocial is clone of Reddit-like sample dApp run by EOS Testnet. You can see how dApp works.

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
$ alias cleos='docker exec nodeos /opt/eosio/bin/cleos --wallet-url http://localhost:8888'

# unlock wallet
$ cleos_docker wallet create
$ cleos_docker wallet unlock --password <WALLET_PASSWORD>
$ cleos_docker wallet import 5KQwrPbwdL6PhXujxW37FSSQZ1JiwsST4cqQzDeyXtP79zkvFD3
# $ cleos_docker wallet unlock --password PW5JE7c5NmoU86mWafiVxriNoegixBCdp5RZy5sayzfYZ5ZKszqhm

# load bios contract
$ cleos_docker set contract eosio /opt/eosio/bin/data-dir/contracts/eosio.bios -x 1000 -p eosio

# create account for token contract
$ cleos_docker create account eosio eosio.token EOS6MRyAjQq8ud7hVNYcfnVPJqcVpscN5So8BhtHuGYqET5GDW5CV EOS6MRyAjQq8ud7hVNYcfnVPJqcVpscN5So8BhtHuGYqET5GDW5CV

# deploy token contract
$ cleos_docker set contract eosio.token /opt/eosio/bin/data-dir/contracts/eosio.token -p eosio.token

# generate token
$ cleos_docker push action eosio.token create '{"issuer":"eosio", "maximum_supply":"1000000000.0000 EOS", "can_freeze":1, "can_recall":1, "can_whitelist":1}' -p eosio.token
```

Check generated token:

```bash
$ cleos_docker get currency stats eosio.token EOS
{
  "EOS": {
    "supply": "0.0000 EOS",
    "max_supply": "1000000000.0000 EOS",
    "issuer": "eosio"
  }
}
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
