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
# Run Nodeos Container
$ docker run --name nodeos -p 8888:8888 -p 9876:9876 -t eosio/eos nodeosd.sh -e --http-alias=nodeos:8888 --http-alias=127.0.0.1:8888 --http-alias=localhost:8888

# Set Config Files
$ docker cp config.ini nodeos:/opt/eosio/bin/data-dir

# Restart
$ docker restart nodeos
```

Check it is working:

```bash
$ docker logs -f nodeos
$ curl localhost:8888/v1/chain/get_info
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
