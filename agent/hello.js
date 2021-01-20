/*!
 * Dependencies
 */

var agent = require('./_header')
  , device = require('../device');
/*!
 * Send message
 */
//console.log(device);
agent.createMessage()

  .device(device)
  .alert('Hello Universe This is demo Push notification!')
  .send();
  
  console.log("Push Sent");
  