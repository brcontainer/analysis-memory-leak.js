# analysis-memory-leak.js

A simple script to analyze (simple debug) memory leak in JavaScript objects or arrays

> Note: This lib is an fork of [JavaScript-memory-leak-checker](https://github.com/Doist/JavaScript-memory-leak-checker) created by [@Doist](https://github.com/Doist)

## How to use:

```javascript
analysisMemoryLeak.check(window);
```

## Improvements in analysis-memory-leak.js

* Added `"use strict";`
* `uniq_id` to string, so can compare with `===` instead of `==`
* Tests for possible errors in (try/catch) `obj.xLeaksChecked`
* An improvement based in [@4facf33](https://github.com/spencercarnage/JavaScript-memory-leak-checker/commit/4facf331f30810c3e2477cf13cba548062051aba) by [@spencercarnage](https://github.com/spencercarnage)
* Fixed "Exceptions" that stopped the script
* Added function `analysisMemoryLeak.showExceptions(bool);` for log exceptions in test
