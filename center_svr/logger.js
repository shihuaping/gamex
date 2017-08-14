
const config = require('./config/log4js.json');

const log4js = require('log4js');
log4js.configure(config);

module.exports = log4js.getLogger();