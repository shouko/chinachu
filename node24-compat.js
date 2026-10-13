'use strict';
// Node 24 removed util.log. This module restores its timestamped format so
// the existing util.log(...) call sites keep working on old and new Node.
// require('util') returns a singleton, so patching it here fixes every file
// in the process, including the vm-loaded api/*.vm.js scripts which receive
// the same object through their sandbox.
// Entry points: require('./node24-compat') instead of 'util'.
const util = require('util');

if (typeof util.log !== 'function') {
	util.log = (...args) => {
		const d = new Date();
		console.log(`${d.toDateString().slice(4, 10)} ${d.toTimeString().slice(0, 8)} -`, ...args);
	};
}

module.exports = util;
