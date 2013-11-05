var Uhoh = function () {};

Uhoh.prototype.attach = function (options) {};
Uhoh.prototype.init = function (done) {
	done(new Error('UH OH'));
};

module.exports = Uhoh;