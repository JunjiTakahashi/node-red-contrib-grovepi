'use strict';
let GrovePi = require('node-grovepi').GrovePi;
let Infrared = new GrovePi.sensors.DigitalInput(4);
let board;

function start() {
  console.log('starting')

  board = new GrovePi.board({
    debug: true,
    onError: function(err) {
      console.log('TEST ERROR')
    },
      
    onInit: function(res) {
      while(true) {
        console.log(Infrared.read());
      }
    }
  })

  board.init();
} // end start()
 

// called on Ctrl-C. 
// close the board and clean up 
function onExit(err) {
  console.log('ending')
  board.close()
  process.removeAllListeners()
  process.exit()
  if (typeof err != 'undefined')
    console.log(err)
}

// starts the test
start()
// catches ctrl+c event
process.on('SIGINT', onExit)

