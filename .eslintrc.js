module.exports = {
  "env": {
    "browser": false,
    "node": true,
    "es6": true,
    "mocha": true,
  },
  "rules": {
    "no-param-reassign": [2, { "props": false }],
    "no-console":0,
    "no-underscore-dangle": ["error", { "allow": ["_id"] }],
  },
  "extends": "airbnb-base",
  "plugins": [
    "import",
  ]
};
