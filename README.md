[![All dependencies](https://img.shields.io/librariesio/release/npm/elapsing-time/3.0.2?style=flat-square "All dependencies of elapsing-time@3.0.2")](https://libraries.io/npm/elapsing-time/3.0.2)
[![Reported vulnerabilities](https://img.shields.io/snyk/vulnerabilities/npm/elapsing-time@3.0.2?style=flat-square "Reported vulnerabilities of elapsing-time@3.0.2")](https://snyk.io/test/npm/elapsing-time/3.0.2)
[![NPM-version](https://img.shields.io/badge/npm-v3.0.2-blue.svg?style=flat-square&&logo=npm "Current NPM-version")](https://www.npmjs.com/package/elapsing-time/v/3.0.2)
[![Install size](https://flat.badgen.net/packagephobia/install/elapsing-time@3.0.2?label=size 'Install size of elapsing-time@3.0.2')](https://packagephobia.now.sh/result?p=elapsing-time@3.0.2)
[![Total downloads](https://img.shields.io/npm/dt/elapsing-time?style=flat-square "Total downloads for all the time")](https://npm-stat.com/charts.html?package=elapsing-time)

# elapsing-time@3.0.2

Helps you to measure the runtime of your code. Package is available both for browser and for Node.js. Time counts with help of **performance.now** function.

## Installation
`elapsing-time` is available via npm:
``` bash
$ npm i elapsing-time@3.0.2
```

## Usage
``` js
const ElapsingTime = require('elapsing-time');

const timer = new ElapsingTime();
const wait = ms => new Promise(res => setTimeout(res, ms));

(async () => {
  for(let i = 0; i < 10; i++) {
    timer.start();
    await wait(200);
    timer.stop();
  }

  console.log(timer.ms);      // 2002.329
  console.log(timer.avg.ms);  // 200.233      // Average value
  console.log(timer.s);       // 2.002        // As seconds
  console.log(timer.us);      // 2001809.967  // As microseconds
})();
```

### Timer.reset
``` js
const ElapsingTime = require('elapsing-time');

const timer = new ElapsingTime();
const wait = ms => new Promise(res => setTimeout(res, ms));

(async () => {
  // Total value
  timer.start();
  await wait(100);
  timer.stop();
  console.log(timer.ms);  // 102.937

  timer.start();
  await wait(200);
  timer.stop();
  console.log(timer.ms);  // 303.213

  timer.start();
  await wait(300);
  timer.stop();
  console.log(timer.ms);  // 603.607

  // Now with reset
  timer.reset();
  timer.start();
  await wait(100);
  timer.stop();
  console.log(timer.ms);  // 100.715

  timer.reset();
  timer.start();
  await wait(200);
  timer.stop();
  console.log(timer.ms);  // 200.74

  timer.reset();
  timer.start();
  await wait(300);
  timer.stop();
  console.log(timer.ms);  // 300.782
})();
```

### Timer.start with autoreset
``` js
const ElapsingTime = require('elapsing-time');

const timer = new ElapsingTime();
const wait = ms => new Promise(res => setTimeout(res, ms));

(async () => {
  timer.start();
  await wait(100);
  timer.stop(true);   // The next timer.start will invoke timer.reset under the hood
  console.log(timer.ms);  // 103.025

  timer.start();
  await wait(200);
  timer.stop(true);
  console.log(timer.ms);  // 200.088

  timer.start();
  await wait(300);
  timer.stop();
  console.log(timer.ms);  // 300.327
})();
```

### Built-in print functions
``` js
const ElapsingTime = require('elapsing-time');

const timer = new ElapsingTime();
const wait = ms => new Promise(res => setTimeout(res, ms));

(async () => {
  timer.start();
  await wait(100);

  timer.msPrint();  // Time: 102.07 ms
  await wait(10);
  timer.sPrint();  // Time: 0.115 s
  // There is no timer.stop so it's still counting
  await wait(10);
  timer.usPrint();  // Time: 124822.4 us
  await wait(10);
  timer.msPrint('Custom label');  // Custom label: 134.661 ms
})();
```
The same way "avg" print functions are also present in timer.avg:
``` js
const ElapsingTime = require('elapsing-time');

const timer = new ElapsingTime();
const wait = ms => new Promise(res => setTimeout(res, ms));

(async () => {
  timer.start();
  await wait(100);
  timer.stop();
  timer.avg.sPrint();  // Time: 0.102 s

  timer.start();
  await wait(900);
  timer.stop();
  timer.avg.usPrint();  // Time: 501137.335 us

  timer.start();
  await wait(200);
  timer.avg.msPrint('Custom label');  // Custom label: 400.882 ms
  timer.stop();
})();
```

## Testing
No testing functionality provided.

---

Your improve suggestions and bug reports are welcome any time.
