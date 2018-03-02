# web3-service

## Installation

`npm install -g truffle`

`npm install`

Setup environment variables in `.env`:

```
ETHEREUM_HTTP_PROVIDER=http://127.0.0.1:7545
JWT_SECRET=secret
KEYSTORE_PW=password
MONGODB_URI=mongodb://localhost/fanmob-web3-db
NODE_ENV=[development|production]
```

## Running

`npm run mongo`

`npm start`

## Deploying Contracts

`truffle migrate --network [develop|test]`

## Testing

1. Start Ganache
2. `npm test`

## Staging

https://fanmob-web3-staging.herokuapp.com/

### Parity Testnet (Kovan)

http://198.199.66.129:8180

Start Parity via Docker:

`docker run -ti -p 8180:8180 -p 8545:8545 -p 8546:8546 -p 30303:30303 -p 30303:30303/udp -v ~/.local/share/io.parity.ethereum/docker/:/root/.local/share/io.parity.ethereum/ --name=parity parity/parity:v1.9.3 --base-path /root/.local/share/io.parity.ethereum/ --chain kovan --ui-interface all --jsonrpc-interface all --ws-interface all --ui-hosts 198.199.66.129:8180 --jsonrpc-hosts 198.199.66.129:8545 --ws-hosts 198.199.66.129:8546 --ws-origins 198.199.66.129:8180 --unsafe-expose -lsigner=trace`

Run in background:

`cltr-p cltr-q`

Stop Parity:
```
docker stop parity
docker rm parity
```

New signer token:
```
docker exec -it parity bash
/parity/parity signer new-token
```
