var assert = require('assert');
var Pluggo = require('../lib/pluggo');
var HelloPlugin = require('./plugins/hello');
var ShyguyPlugin = require('./plugins/shyguy');
var UhohPlugin = require('./plugins/uhoh');

suite('Pluggo!', function () {
	test('Pluggo()', function () {
		var plugins = new Pluggo();
		assert.ok(plugins);
	});

	suite('#use()', function () {
		var plugins;

		setup(function () {
			plugins = new Pluggo();
		});

		teardown(function () {
			delete plugins;
		})

		test('can catch errors', function () {
			assert.throws(function () {
				plugins.use(new HelloPlugin());
			});
		});

		test('works', function () {
			plugins.use(new HelloPlugin(), {name: 'world'});
			assert.ok(plugins.hello);
			assert.equal(plugins.hello(), 'Hello world!');
		});

		test('allows for overrides', function () {
			plugins.use(new HelloPlugin(), {name: 'world'});
			plugins.use(new HelloPlugin(), {name: 'Spiderman'});
			assert.equal(plugins.hello(), 'Hello Spiderman!');
		})
		
	});

	suite('#init()', function (done) {
		setup(function () {
			plugins = new Pluggo();
		});

		teardown(function () {
			delete plugins;
		});

		test('works with no plugins', function () {
			plugins.init(done);	
		});

		test('works with plugins without init functions', function (done) {
			plugins.use(new HelloPlugin(), {name: 'squid'});
			plugins.init(function (error) {
				if (error) {
					throw error;
				}
				assert.equal(plugins.hello(), 'Hello squid!');
				done();
			});
		});

		test('works with plugins with init functions', function (done) {
			plugins.use(new ShyguyPlugin());
			assert.throws(function () {
				plugins.shyguy();
			})
			plugins.init(function (error) {
				if (error) {
					throw error;
				}
				plugins.shyguy();
				done();
			})
		});

		test('handles thrown errors', function (done) {
			plugins.use(new UhohPlugin());
			plugins.init(function (error) {
				assert.ok(error);
				done();
			});
		})
		
	});
})
