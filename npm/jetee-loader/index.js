let parse = require('./parser')

module.exports = function loader (source) {
    return parse(source);
};