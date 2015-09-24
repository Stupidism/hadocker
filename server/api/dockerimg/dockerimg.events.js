/**
 * Dockerimg model events
 */

'use strict';

var EventEmitter = require('events').EventEmitter;
var Dockerimg = require('./dockerimg.model');
var DockerimgEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
DockerimgEvents.setMaxListeners(0);

// Model events
var events = {
  'save': 'save',
  'remove': 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  Dockerimg.schema.post(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc) {
    DockerimgEvents.emit(event + ':' + doc._id, doc);
    DockerimgEvents.emit(event, doc);
  }
}

module.exports = DockerimgEvents;
