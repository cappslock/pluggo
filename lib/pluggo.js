var async = require('async');

var Pluggo = function () {
	this._initFns = [];
};

Pluggo.prototype.use = function (plugin, options) {
	plugin.attach.call(this, options);

	if (plugin.init) {
		this._initFns.push(plugin.init.bind(this));
	}
};

Pluggo.prototype.init = function (callback) {
	async.parallel(this._initFns, callback);
};

module.exports = Pluggo;
