var async = require('async');
var EventEmitter = require('events').EventEmitter;
var util = require('util');

var Pluggo = function () {
	this._initFns = [];
};
util.inherits(Pluggo, EventEmitter);

Pluggo.prototype.use = function (plugin, options) {
	var self = this;
	
	// is this a broadway-style function? (signature like `attach(options)`)
	if (plugin.attach.length === 1) {
		// broadway compatibility mode - set the plugins object as `this`
		plugin.attach.call(this, options);
	}
	else {
		// standard behavior
		plugin.attach(this, options);
	}

	if (plugin.init) {
		// is this a broadway-style function? (signature like `init(callback)`)
		if (plugin.init.length === 1) {
			// broadway compatibility mode - set plugins object as `this`
			this._initFns.push(plugin.init.bind(this));
		}
		else {
			// standard behavior
			this._initFns.push(function (callback) {
				plugin.init(self, callback);
			});
		}
	}

	this.emit('attach');
};

Pluggo.prototype.init = function (callback) {
	var self = this;
	async.parallel(this._initFns, callback);
};

module.exports = Pluggo;
