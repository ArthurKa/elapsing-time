[![All dependencies](https://img.shields.io/librariesio/release/npm/elapsing-time/2.0.7?style=flat-square "All dependencies of elapsing-time@2.0.7")](https://libraries.io/npm/elapsing-time/2.0.7)
[![Reported vulnerabilities](https://img.shields.io/snyk/vulnerabilities/npm/elapsing-time@2.0.7?style=flat-square "Reported vulnerabilities of elapsing-time@2.0.7")](https://snyk.io/test/npm/elapsing-time/2.0.7)
[![NPM-version](https://img.shields.io/badge/npm-v2.0.7-blue.svg?style=flat-square "Current NPM-version")](https://www.npmjs.com/package/elapsing-time/v/2.0.7)
[![Install size](https://flat.badgen.net/packagephobia/install/elapsing-time@2.0.7?label=size 'Install size of elapsing-time@2.0.7')](https://packagephobia.now.sh/result?p=elapsing-time@2.0.7)
[![Total downloads](https://img.shields.io/npm/dt/elapsing-time?style=flat-square "Total downloads for all the time")](https://npm-stat.com/charts.html?package=elapsing-time)

# elapsing-time@2.0.7

Helps you to measure the runtime of your code.

## Installation
`elapsing-time` is available via npm:
``` bash
$ npm i elapsing-time@2.0.7
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

  console.log(timer.ms);      // 2020     // Exactly the same year as now!
  console.log(timer.avg.ms);  // 202      // Average value
  console.log(timer.s);       // 2.02     // As seconds
  console.log(timer.us);      // 2020000  // As microseconds
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
  console.log(timer.ms);  // 100

  timer.start();
  await wait(200);
  timer.stop();
  console.log(timer.ms);  // 300

  timer.start();
  await wait(300);
  timer.stop();
  console.log(timer.ms);  // 600


  // Now with reset
  timer.reset();
  timer.start();
  await wait(100);
  timer.stop();
  console.log(timer.ms);  // 100

  timer.reset();
  timer.start();
  await wait(200);
  timer.stop();
  console.log(timer.ms);  // 200

  timer.reset();
  timer.start();
  await wait(300);
  timer.stop();
  console.log(timer.ms);  // 300
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
  console.log(timer.ms);  // 100

  timer.start();
  await wait(200);
  timer.stop(true);
  console.log(timer.ms);  // 200

  timer.start();
  await wait(300);
  timer.stop();
  console.log(timer.ms);  // 300
})();
```

### Built-in print functions
``` js
const ElapsingTime = require('elapsing-time');

(async () => {
  timer.start();
  await wait(100);

  timer.msPrint();  // Time: 103 ms
  await wait(10);
  timer.sPrint();  // Time: 0.116 s
  // There is no timer.stop so it's still counting
  await wait(10);
  timer.usPrint();  // Time: 127000 us
  await wait(10);
  timer.msPrint('Custom label');  // Custom label: 142 ms
})();
```
The same way "avg" print functions are also present as:
- timer.sAvgPrint
- timer.msAvgPrint
- timer.usAvgPrint

### Time counts as integer milliseconds. Each value such as *s*, *ms* and *us* has 0.001 precision.

## Testing
No testing functionality provided.

---

Your improve suggestions and bug reports are welcome any time.
