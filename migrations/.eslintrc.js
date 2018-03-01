module.exports = {
  "env": {
    "browser": false,
    "node": true,
    "es6": true,
    "mocha": true,
  },
  "rules": {
    "no-undef": "off",
    "no-console":0,
    "no-underscore-dangle": ["error", { "allow": ["_id"] }],
  },
  "extends": "airbnb-base",
  "plugins": [
    "import",
  ]
};
