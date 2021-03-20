<header>

Helps you to measure the runtime of your code. Package is available both for **browser** and **Node.js**. Time counts with help of **performance.now** function.

<installation>

## Usage
```ts
import ElapsingTime from './elapsing-time';

const timer = new ElapsingTime();
const wait = (ms: number) => new Promise(res => setTimeout(res, ms));

(async () => {
  for(let i = 0; i < 10; i++) {
    timer.start();
    await wait(200);
    timer.stop();
  }

  console.log(timer.ms);      // 2002.329
  console.log(timer.s);       // 2.002        // As seconds
  console.log(timer.us);      // 2001809.967  // As microseconds
  console.log(timer.avg.ms);  // 200.233      // Average value
})();
```

### Timer.reset
```ts
import ElapsingTime from './elapsing-time';

const timer = new ElapsingTime();
const wait = (ms: number) => new Promise(res => setTimeout(res, ms));

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
```ts
import ElapsingTime from './elapsing-time';

const timer = new ElapsingTime();
const wait = (ms: number) => new Promise(res => setTimeout(res, ms));

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
```ts
import ElapsingTime from './elapsing-time';

const timer = new ElapsingTime();
const wait = (ms: number) => new Promise(res => setTimeout(res, ms));

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
```ts
import ElapsingTime from './elapsing-time';

const timer = new ElapsingTime();
const wait = (ms: number) => new Promise(res => setTimeout(res, ms));

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

<noTesting>

<suggestions>
