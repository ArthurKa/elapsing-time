Helps you to measure the runtime of your code.

## Installation
`elapsing-time` is available via npm:
``` bash
$ npm i elapsing-time
```

## Usage
``` js
const elapsingTime = require('elapsing-time');

const wait = ms => new Promise(res => setTimeout(res, ms));
const timer1 = new elapsingTime();
const timer2 = new elapsingTime();

(async () => {
  timer1.start();
  for(let i = 0; i < 10; i++) {
    timer2.start();
    await wait(200);
    timer2.stop();
  }
  timer1.stop();

  console.log(timer1.ms);    // 2020     // Exactly the same year as now!
  console.log(timer2.ms);    // 202      // Average value
  console.log(timer1.s);     // 2.02     // As seconds
  console.log(timer1.us);    // 2020000  // As microseconds
})();
```

### Timer.reset
``` js
const elapsingTime = require('elapsing-time');

const wait = ms => new Promise(res => setTimeout(res, ms));
const timer = new elapsingTime();

(async () => {
  // Average value
  timer.start();
  await wait(100);
  timer.stop();
  console.log(timer.ms);  // 100

  timer.start();
  await wait(300);
  timer.stop();
  console.log(timer.ms);  // 200

  timer.start();
  await wait(500);
  timer.stop();
  console.log(timer.ms);  // 300


  // Now with reset
  timer.reset();
  timer.start();
  await wait(100);
  timer.stop();
  console.log(timer.ms);  // 100

  timer.reset();
  timer.start();
  await wait(300);
  timer.stop();
  console.log(timer.ms);  // 300

  timer.reset();
  timer.start();
  await wait(500);
  timer.stop();
  console.log(timer.ms);  // 500
})();
```

### Timer.start with autoreset
``` js
const elapsingTime = require('elapsing-time');

const wait = ms => new Promise(res => setTimeout(res, ms));
const timer = new elapsingTime();

(async () => {
  timer.start();
  await wait(100);
  timer.stop(true);   // The next timer.start will invoke timer.reset
  console.log(timer.ms);  // 100

  timer.start();
  await wait(300);
  timer.stop(true);
  console.log(timer.ms);  // 300

  timer.start();
  await wait(500);
  timer.stop();
  console.log(timer.ms);  // 500
})();
```

### Provided print functions
``` js
const elapsingTime = require('elapsing-time');

const wait = ms => new Promise(res => setTimeout(res, ms));
const timer = new elapsingTime();
(async () => {
  timer.start();
  await wait(100);

  timer.msPrint();  // "Time: 103 ms"
  await wait(10);
  // There is no timer.stop so it's still counts
  timer.sPrint();  // "Time: 0.116 s"
  await wait(10);
  timer.usPrint();  // "Time: 127000 us"
  await wait(10);
  timer.msPrint('Custom label');  // "Custom label: 142 ms"
})();
```

### Time counts as integer milliseconds. Each value such as *s*, *ms* and *us* has 0.001 precision.

## Testing
No testing functionality provided.

---
Your improve suggestions and bug reports are welcome any time.
