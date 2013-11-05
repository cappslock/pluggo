var ShyguyPlugin = function () {};

ShyguyPlugin.prototype.attach = function (options) {
	this.shyguy = function () {
		throw new Error("i'm not ready yet!");
	}
};

ShyguyPlugin.prototype.init = function (callback) {
	this.shyguy = function () {
		return "okay let's do this";
	}

	callback();
};

module.exports = ShyguyPlugin;