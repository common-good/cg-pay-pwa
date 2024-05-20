const constants = {
  version: 40201, // 4.2.1 rel C(1)
  storeKey: 'cgpay',
  qrUrlRegex: '^HTTP://[0-9A-Za-z]{1,4}\.RC[24]\.ME/[0-9A-Z]{2,5}[0-9A-Za-z]{0,25}$', // like HTTP://6VM.RC4.ME/KDJJ34kjdfKJ4
  testQrStart: 'HTTP://6VM.RC4.ME/', // is a test QR if it starts with this string
  port: 3000,
  onlineLimit: 10000, // the most any account can be charged on the app
  offlineLimit: 250, // how much an account can be charged without knowing its credit limit
  corruptionDelay: 60*60*24, // how long to wait before retrying upload of corrupted transactions, in seconds
  fetchTimeoutMs: 3200,
  networkTimeoutMs: 100,
  recentTxMax: 20, // maximum number of recent transactions to store
  recentTxMin: 4, // number of recent txs to show on dashboard
  enableSockets: true, // websockets

  showDevStuff: true, // if true, enable dev-only features

  // how long user has, on the current screen (in seconds), before we return automatically to Home
  txTimeout: 10, // Tx page (normally 10 seconds)
  testTimeout: 1.5, // how long user has when testing (compress time to make the tests run faster)

  domains: { // domains used in QR Codes
    real: 'RC2.ME',
    test: 'RC4.ME',
  },
  urls: { // list at least the ones that use real data
    staging:    'https://cgpay-staging.commongood.earth',
    production: 'https://cgpay.commongood.earth',
  },
  apis: {
//    test:  'http://localhost/cgmembers-frame/cgmembers/api/',
    test: 'https://demo.commongood.earth/api/', // should be test.cg.e when that db exists
    demo: 'https://demo.commongood.earth/api/',
    real: 'https://new.commongood.earth/api/',
  },
  sockets: {
    test: 'wss://demo.commongood.earth:8081',
    real: 'wss://new.commongood.earth:8081',
  },

  PROJECT: "Common Good",
  R_STATEMENT_COST: 10,

// Common Good Finance email and other data
  CGF_LEGALNAME: 'Society to Benefit Everyone, Inc.',
  CGF_POSTALADDR: 'c/o Common Good Finance, PO Box 21, Ashfield, MA 01330',

  CREDITLIMIT: 10,
}

export default constants
