var Uhoh = function () {};

Uhoh.prototype.attach = function (plugins, options) {};
Uhoh.prototype.init = function (plugins, done) {
	done(new Error('UH OH'));
};

module.exports = Uhoh;