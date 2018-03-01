module.exports = {
  networks: {
    local: {
      host: '127.0.0.1',
      port: 7545,
      network_id: '*',
    },
    test: {
      host: '198.199.66.129',
      port: 8545,
      network_id: '*',
      gas: 6431652,
    },
  },
};
