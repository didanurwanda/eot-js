(function (factory) {
    "use strict";
    if (typeof define === 'function' && define.amd) {
        define(factory);
    } else {
        if (typeof module === 'object' && module.exports) {
            module.exports = factory();
        } else {
            window.eot = factory();
        }
    }
}(function() {
    "use strict";

    var _config = {
        templateEngine: 'parser', // parser, mustache, ejs, handlebars and underscore
        engine: null, // context
        engineOptions: {},
        format: 'text', // text or js
        trim: false
    };

    return function(callback, config, data) {
        if (config && typeof config === 'object') {
            for(var i in _config) {
                if (!config[i]) {
                    config[i] = _config[i];
                }
            }
        } else {
            config = _config;
        }

        callback = callback.toString();

        try {
            callback = callback.split('/*EOT');
            callback = callback[1].split('EOT*/');
            callback = callback[0];
        } catch (e) {
            return '';
        }

        if (config.trim) {
            callback = callback.trim();
        }

        if (config.format.toLowerCase().trim() === 'js' || config.format.toLowerCase().trim() === 'javascript') {
            // escape
            callback = callback.replace(/[\\']/g, '\\$&').replace(/\u0000/g, '\\0');

            // split
            var callbackArray = callback.split(/\n/);
            callback = "";

            // length
            var callbackLength = callbackArray.length;

            for(var i in callbackArray) {
                callback += "'"+ callbackArray[i] +"'";

                if (i < (callbackLength - 1)) {
                    callback += "+\n";
                }
            }
        }

        if (data !== undefined && typeof data === 'object') {
            if (config.templateEngine === 'parser') {
                for(var i in data) {
                    callback = callback.split('{'+ i +'}').join(data[i]);
                }
            } else if (config.templateEngine === 'mustache' && config.engine) {
                callback = config.engine.render(callback, data);
            } else if (config.templateEngine === 'ejs' && config.engine) {
                var template = config.engine.compile(callback, config.engineOptions);
                callback = template(data);
            } else if (config.templateEngine === 'handlebars' && config.engine) {
                var template = config.engine.compile(callback);
                callback = template(data);
            } else if (config.templateEngine === 'underscore' && config.engine) {
                if (config.engineOptions) {
                    config.engine.templateSettings = config.engineOptions;
                }
                var template = config.engine.template(callback);
                callback = template(data);
            }
        }

        return callback;
    }
}));