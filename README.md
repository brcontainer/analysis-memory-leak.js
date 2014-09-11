analyses-memory-leak.js
==============================

An simple lib to analyses memory leak in javascript objects or arrays

Note: This lib is an fork of [JavaScript-memory-leak-checker](https://github.com/Doist/JavaScript-memory-leak-checker) create by [@Doist](https://github.com/Doist)

Usage:
-----

Simple example

```
analysesMemoryLeak(window);
```


Improveds in analyses-memory-leak.js
-----

* Added `"use strict";`
* [jshint](https://github.com/jshint/jshint/) and [jslint](https://github.com/douglascrockford/JSLint) is ok (facilitate developers do updates)
* `uniq_id` to string, so can compare with `===` instead of `==`
* Tests for possible errors in (try/catch) `obj.xLeaksChecked`
* An improvement based in [@4facf33](https://github.com/spencercarnage/JavaScript-memory-leak-checker/commit/4facf331f30810c3e2477cf13cba548062051aba) by [@spencercarnage](https://github.com/spencercarnage)
* Fixed "Exceptions" that stopped the script
* Added function `enableLogException`
