'use strict';

function elapsingTime() {
  let time = 0;
  let count = 0;
  let startedTime = 0;

  const round = (num, n) => Math.round(num * 10**n) / 10**n;

  this.start = () => {
    startedTime = Date.now();
    count++;
  };
  this.stop = () => {
    if(startedTime) {
      time += Date.now() - startedTime;
      startedTime = 0;
    }
  };
  this.reset = () => {
    time = count = startedTime = 0;
  };

  function get(i) {
    const st = startedTime && Date.now() - startedTime;
    const arr = [
      () => (time + st) / 1000 / (count || 1),
      () => (time + st) / (count || 1),
      () => (time + st) * 1000 / (count || 1),
    ];
    return round(arr[i](), 3);
  }

  Object.defineProperties(this, {
    s: { get: () => get(0) },
    ms: { get: () => get(1) },
    us: { get: () => get(2) },
  });
}

module.exports = elapsingTime;
