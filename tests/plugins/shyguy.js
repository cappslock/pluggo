var ShyguyPlugin = function () {};

ShyguyPlugin.prototype.attach = function (plugins, options) {
	plugins.shyguy = function () {
		throw new Error("i'm not ready yet!");
	}
};

ShyguyPlugin.prototype.init = function (plugins, callback) {
	plugins.shyguy = function () {
		return "okay let's do this";
	}

	callback();
};

module.exports = ShyguyPlugin;