'use strict';

var mongoose = require('bluebird').promisifyAll(require('mongoose'));
var Schema = mongoose.Schema;

var DockerimgSchema = new Schema({
  user: String,
  name: String,
  tag: String,
  dockerId: String
});

module.exports = mongoose.model('Dockerimg', DockerimgSchema);
