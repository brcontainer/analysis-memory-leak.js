/*
 * analysis-memory-leak.js 0.1.0
 * Copyright (c) 2017 Guilherme Nascimento (brcontainer@yahoo.com.br)
 * Released under the MIT license
 *
 * Note: Based in https://github.com/Doist/JavaScript-memory-leak-checker
 */

(function (w) {
    "use strict";

    var le = false, limit = 200, checked = 1, issues = 0, id = String((new Date()).getTime());

    function enableLogException(a) {
        le = a === true;
    }

    function log() {
        var a, i, j;
        if (w.console && w.console.log) {
            if (w.console.log.apply) {
                w.console.log.apply(w.console, arguments);
            } else {
                a = [];
                j = arguments.length;

                for (i = 0; i < j; i += 1) a[i] = arguments[i];

                w.console.log(a);
            }
        }
    }

    function checkLeaks(obj) {
        var key, i, j;

        if (!obj || (typeof obj === "function") || checked > 20000) return;
        if (!isArray(obj) && !isObject(obj)) return;

        if (isObject(obj)) {
            logTooBig(obj, getKeys(obj).length);

            for (key in obj) {
                if (obj.hasOwnProperty(key)) checkIfNeeded(obj[key]);
            }
        } else {
            logTooBig(obj, obj.length);
            j = obj.length;

            for (i = 0; i < j; i++) checkIfNeeded(obj[i]);
        }
    }

    function checkIfNeeded(obj) {
        if (!obj) return;

        checked++;

        if (!isArray(obj) && !isObject(obj)) return;
        if ((obj.xLeaksChecked || "") === id) return;

        try {
            obj.xLeaksChecked = id;
        } catch (ee) {
            if (le) log(obj, ee);
        }

        w.setTimeout(partial(checkLeaks, obj), 5);
    }

    function logTooBig(obj, size) {
        if (size > limit) {
            issues++;

            log("Object too big, memory leak? [size: " + size + "]");
            log(obj);
            log("-------");
        }
    }

    function getKeys(obj) {
        var rval = [], prop;

        for (prop in obj) {
            if (obj.hasOwnProperty(prop)) rval.push(prop);
        }

        return rval;
    }

    function isArray(obj) {
        try {
            return obj instanceof Array;
        } catch (e) {
            return false;
        }
    }

    function isObject(obj) {
        return typeof obj === "object";
    }

    function partial(fn) {
        var args = Array.prototype.slice.call(arguments);
        args.shift();

        return function () {
            var newArgs = Array.prototype.slice.call(arguments);
            args = args.concat(newArgs);
            return fn.apply(w, args);
        };
    }

    w.analysisMemoryLeak = {
        "check": function (obj) {
            if (!obj) {
                log("Invalid object:", obj);
                return;
            }

            checkLeaks(obj);

            if (issues === 0) log("Your object is fine:", obj);
        },
        "showExceptions": enableLogException
    };
}(window));
