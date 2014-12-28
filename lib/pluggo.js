var Pluggo = function () {
    this._initFns = [];
};

Pluggo.prototype.use = function (plugin, options) {
    var self = this;
    
    plugin.attach.call(this, options);

    if (plugin.init) {
        this._initFns.push(plugin.init.bind(this));
    }
};

Pluggo.prototype.init = function (callback) {
    var self = this;
    var initError;
    
    try {
        this._initFns.forEach(function (initFn) {
            initFn(function (error) {
                if (error) {
                    throw error;
                }
            });
        });        
    }
    catch (error) {
        initError = error;
    }

    callback(initError);
};

module.exports = Pluggo;
