/**
 * Constants and global variables used only for testing.
 * 
 * Including mock data for abbreviations used in Gherkin feature scenarios. See background.txt for details.
 * The accounts table is generated by a\makeTestAccounts() on the server.
 */
import u from '../../utils0.js'
const AbeUid = 26742000017291 // Abe's uid on the server

const w = {
  // global test variables to reset before each scenario
  reset() {
    w.browser = null,
    w.page = null,
    w.tellApp = [{ k:'clear', v:true }] // for passing setv requests and other messages to the app
    w.post = [] // for receiving reports of POST requests from the app
    w.get = [] // for receiving reports of GET requests from the app
    w.store = {} // mirrors app's localStorage
    w.now = u.now0() // keep a stable time reference point during each test
    w.proofRow = null // current row that may contain a proof field (to construct the wanted proof value)
  },

  // test constants
  headlessMode: true,
  slowMo: 0,
  testTimeout: 25, // test timeout in seconds (12 is not enough)
  chromiumPath: '', // can be used to test different versions of chromium
  seeLog: true, // show what the automated browser logs to console
  timeSlop: 10, // seconds between timestamps in tests is treated as negligible
//  chromiumPath: '/usr/bin/chromium-browser', // requires sudo apt-get install chromium-browser

  accounts: { // note: keys must not match names
    'Abe': { name:'Abe One', location:'Aton, MA', isCo:false, accountId:'K6VMDCA', cardCode:'12345a', deviceId:'devA', selling:null },
    'Bea': { name:'Bea Two', location:'Bton, MA', isCo:false, accountId:'K6VMDCB', cardCode:'12345b', deviceId:'devB', selling:null },
    'Cit': { name:'Citre', location:'Cton, MA', isCo:true, accountId:'K6VMDCC', cardCode:'12345c', deviceId:'devC', selling:['groceries', 'gifts', 'sundries'] },
    'Dee': { name:'Dee Four', location:'Dton, MA', isCo:false, accountId:'K6VMDCD', cardCode:'12345d', deviceId:'devD', selling:null },
    'Eli': { name:'Eli Five', location:'Eton, MA', isCo:false, accountId:'K6VMDCE', cardCode:'12345e', deviceId:'devE', selling:null },
    'Flo': { name:'Flo Six', location:'Fton, MA', isCo:false, accountId:'K6VMDCF', cardCode:'12345f', deviceId:'devF', selling:null },
    'Gis': { name:'Gisette', location:'Gton, MA', isCo:true, accountId:'K6VMDCG', cardCode:'12345g', deviceId:'devG', selling:['hardware'] },
    'Hal': { name:'Hal Ate', location:'Hton, MA', isCo:false, accountId:'K6VMDCH', cardCode:'12345h', deviceId:'devH', selling:null },
    'Ida': { name:'Ida Nine', location:'Iton, MA', isCo:false, accountId:'K6VMDCI', cardCode:'12345i', deviceId:'devI', selling:null },
    'Abe/Cit': { name:'Citre', location:'Cton, MA', isCo:true, accountId:'L6VMDCC0', cardCode:'98765a', deviceId:'devC', selling:['groceries', 'gifts', 'sundries'] },
    'Bea/Cit': { name:'Citre', location:'Cton, MA', isCo:true, accountId:'L6VMDCC1', cardCode:'98765b', deviceId:'devC', selling:['groceries', 'gifts', 'sundries'] },
    'Flo/Gis': { name:'Gisette', location:'Gton, MA', isCo:true, accountId:'L6VMDCG0', cardCode:'98765f', deviceId:'devG', selling:['hardware'] },
    'Invalid': { name:'Gisette', location:'Gton, MA', isCo:true, accountId:'L6VMDCG0', cardCode:'98765x', deviceId:'devG', selling:['hardware'] }, // bad card code (lost or stolen)
  },

  uid(nick) { return AbeUid + nick.charCodeAt(0) - 'Abe'.charCodeAt(0) }, // the given account's uid on the server
}

export default w
