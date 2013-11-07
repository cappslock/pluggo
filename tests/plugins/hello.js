var Hello = function () {};

Hello.prototype.attach = function (plugins, options) {
	if (!(options && options.name)) {
		throw new Error('then who the hell am i talking to?');
	}

	plugins.hello = function () {
		return 'Hello ' + options.name + '!';
	}
};

module.exports = Hello;