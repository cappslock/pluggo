var HelloPlugin = function () {};

HelloPlugin.prototype.attach = function (options) {
	if (!(options && options.name)) {
		throw new Error('then who the hell am i talking to?');
	}

	this.hello = function () {
		return 'Hello ' + options.name + '!';
	}
};

module.exports = HelloPlugin;