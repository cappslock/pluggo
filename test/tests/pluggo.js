var Pluggo = require('../../');
var expect = require('chai').expect;
var defaults = require('lodash.defaults');

var pluginTemplate = {
    attach: function (options) {

    },
    init: function (done) {
        done();
    }
};

var makePlugin = function (plugin) {
    return defaults(plugin, pluginTemplate);
};

var simplePlugin = makePlugin({
    attach: function (options) {
        this.simple = true;
        this.options = options;
    }
});

var optionVerifier = makePlugin({
    attach: function (options) {
        if (options.checksOut !== true) {
            throw new Error('these are totally the wrong options what the hell man');
        }
    }
});

var contextVerifier = makePlugin({
    attach: function (options) {
        if (!this.simple) {
            throw new Error('missing plugin');
        }
    }
});

var initError = makePlugin({
    init: function (done) {
        done(new Error('init error, ruh roh'));
    }
});

var noInit = {
    attach: function (options) {
        this.noInit = true;
    }
};

var anotherPlugin = makePlugin({
    attach: function () {
        this.somethingElse = 5;
        this.flerb = 'bark';
        this.prognosticator = function () {
            return 'verily';
        };
    }
});

describe('Pluggo', function () {
    var app;

    beforeEach(function () {
        app = new Pluggo();
    });

    describe('when attaching plugins', function () {
        it('should attach without error', function () {
            var attachFn = function () {
                app.use(simplePlugin);
            };
            expect(attachFn).to.not.throw(Error);
        });
        it('should pass options to plugins', function () {
            var goodFn = function () {
                app.use(optionVerifier, {checksOut: true});
            };
            var badFn = function () {
                app.use(optionVerifier, {checksOut: false});
            };

            expect(goodFn).to.not.throw(Error);
            expect(badFn).to.throw('these are totally the wrong options what the hell man');
        });
        it('should bind to plugin context correctly', function () {
            app.use(simplePlugin);

            var useContextVerifier = function () {
                app.use(contextVerifier);
            };

            expect(useContextVerifier).to.not.throw('missing plugin');
        });
    });

    describe('when initializing plugins', function () {
        it('should call the callback when ran without error', function (done) {
            app.use(simplePlugin);
            app.init(function (error) {
                expect(error).to.not.exist();
                done();
            });
        });
        it('should pass errors to caller', function (done) {
            app.use(initError);
            app.init(function (error) {
                expect(error).to.be.an.instanceof(Error);
                done();
            });
        });
        it('should allow plugins with no init step', function (done) {
            app.use(noInit);
            app.init(function (error) {
                expect(error).to.not.exist();
                expect(app.noInit).to.be.true();
                done();
            });
        });
    });

    describe('when using plugins', function () {
        it('should generate an object with the attached plugins', function (done) {
            app.use(simplePlugin);
            app.use(anotherPlugin);
            app.init(function (error) {
                expect(error).to.not.exist();
                expect(app.simple).to.be.true();
                expect(app.somethingElse).to.equal(5);
                expect(app.flerb).to.equal('bark');
                expect(app.prognosticator).to.be.a('function');
                expect(app.prognosticator()).to.equal('verily');
                done();
            });
        });
    });
});
