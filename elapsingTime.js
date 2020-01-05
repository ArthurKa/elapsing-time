'use strict';

const round = (n, d) => +n.toFixed(d);

function elapsingTime() {
  if(!new.target) {
    throw new Error('elapsing-time cannot be invoked without "new"');
  }

  let time = 0;
  let count = 0;
  let startedTime = 0;
  let cachedTime = false;

  this.start = () => {
    if(cachedTime) {
      this.reset();
      cachedTime = false;
    }
    startedTime = Date.now();
    count++;
  };
  this.stop = (withReset = false) => {
    if(startedTime) {
      time += Date.now() - startedTime;
      startedTime = 0;
    }
    if(withReset) {
      cachedTime = true;
    }
  };
  this.reset = () => {
    time = count = startedTime = 0;
  };

  const keys = {
    s: ms => ms / 1000,
    ms: ms => ms,
    us: ms => ms * 1000,
  };
  function get(key) {
    const st = startedTime && Date.now() - startedTime;
    const t = (time + st) / (count || 1);
    return round(keys[key](t), 3);
  }

  for(const key of Object.keys(keys)) {
    Object.defineProperty(this, key, { get: () => get(key) });
  }
}

module.exports = elapsingTime;
