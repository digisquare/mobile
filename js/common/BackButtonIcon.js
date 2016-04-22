'use strict';

var Platform = require('Platform');

if (Platform.OS === 'ios') {
  module.exports = require('./img/x-white.png');
} else {
  module.exports = require('./img/back_white.png');
}
