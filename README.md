# web3-service

## Installation

`npm install`

## Running

`npm start`

## Testing

1. Start Ganache
2. `npm test`

## Staging

https://fanmob-web3-staging.herokuapp.com/

### Parity Testnet (Kovan)

Digital Ocean

https://cloud.digitalocean.com/droplets/83713683

Server: 198.199.66.129

Start Parity via Docker:
```
sudo docker run -ti -p 8180:8180 -p 8545:8545 -p 8546:8546 -p 30303:30303 -p 30303:30303/udp -v ~/.local/share/io.parity.ethereum/docker/:/root/.local/share/io.parity.ethereum/ --name=parity parity/parity:v1.9.3 --base-path /root/.local/share/io.parity.ethereum/ --chain kovan --ui-interface all --jsonrpc-interface all --ws-interface all --ui-hosts 198.199.66.129:8180 --jsonrpc-hosts 198.199.66.129:8545 --ws-hosts 198.199.66.129:8546 --ws-origins 198.199.66.129:8180 --unsafe-expose -lsigner=trace
```

Run in background:

`cltr-p cltr-q`

Stop Parity:

`docker stop parity`

`docker rm parity`

New signer token:

`docker exec -it parity bash`

`/parity/parity signer new-token`
