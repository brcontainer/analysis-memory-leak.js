/*
 * analysis-memory-leak.js 0.0.1
 * Copyright (c) 2014 Guilherme Nascimento (brcontainer@yahoo.com.br)
 * Released under the MIT license
 *
 * Note: Based in https://github.com/Doist/JavaScript-memory-leak-checker
 */

(function (window) {
    "use strict";

    var le = false, aml, limit = 200;

    aml = {
        "uniqId": String((new Date()).getTime()),
        "checked": 1,
        "isSeen": [],

        "enableLogException": function (a) {
            le = a === true ? true : false;
        },

        "log": function () {
            var a, i, j;
            if (window.console && window.console.log) {
                if (window.console.log.apply) {
                    window.console.log.apply(window.console, arguments);
                } else {
                    a = [];
                    j = arguments.length;
                    for (i = 0; i < j; i += 1) {
                        a[i] = arguments[i];
                    }
                    window.console.log(a);
                }
            }
        },

        "checkLeaks": function (obj) {
            var key, i, j;

            if (!obj || (typeof obj === "function") || aml.checked > 20000) {
                return;
            }

            if (aml.isArray(obj) || aml.isObject(obj)) {
                if (aml.isArray(obj)) {
                    aml.logTooBig(obj, obj.length);
                    j = obj.length;
                    for (i = 0; i < j; i += 1) {
                        aml.checkIfNeeded(obj[i]);
                    }
                } else if (aml.isObject(obj)) {
                    aml.logTooBig(obj, aml.getKeys(obj).length);

                    for (key in obj) {
                        if (obj.hasOwnProperty(key)) {
                            aml.checkIfNeeded(obj[key]);
                        }
                    }
                }
            }
        },

        "checkIfNeeded": function (obj) {
            if (!obj) {
                return;
            }

            aml.checked += 1;

            if (aml.isArray(obj) || aml.isObject(obj)) {
                if ((obj.xLeaksChecked || "") === aml.uniqId) {
                    return;
                }

                try {
                    obj.xLeaksChecked = aml.uniqId;
                } catch (ee) {
                    if (le === true) {
                        aml.log(obj, ee);
                    }
                }

                window.setTimeout(aml.partial(aml.checkLeaks, obj), 5);
            }
        },

        "logTooBig": function (obj, size) {
            if (size > limit) {
                aml.log("Object too big, memory leak? [size: " + size + "]");
                aml.log(obj);
                aml.log("-------");
            }
        },

        "getKeys": function (obj) {
            var rval = [], prop;
            for (prop in obj) {
                if (obj.hasOwnProperty(prop)) {
                    rval.push(prop);
                }
            }
            return rval;
        },

        "isArray": function (obj) {
            try {
                return obj instanceof Array;
            } catch (e) {
                return false;
            }
        },

        "isObject": function (obj) {
            return typeof obj === "object";
        },

        "partial": function (fn) {
            var args = Array.prototype.slice.call(arguments);
            args.shift();
            return function () {
                var newArgs = Array.prototype.slice.call(arguments);
                args = args.concat(newArgs);
                return fn.apply(window, args);
            };
        }
    };

    window.analysisMemoryLeak = aml.checkLeaks;
}(window));