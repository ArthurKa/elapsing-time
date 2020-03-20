'use strict';

const pkg = require('./package.json');

const { performance } = typeof window !== 'undefined' ? window : require('perf_hooks');

const round = (n, d) => +n.toFixed(d);

function ElapsingTime() {
  if(!new.target) {
    throw new Error(`${pkg.name} cannot be invoked without "new" operator`);
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
    startedTime = performance.now();
    count++;
  };
  this.stop = (withReset = false) => {
    if(startedTime) {
      time += performance.now() - startedTime;
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
  function get(key, avg = false) {
    const st = startedTime && performance.now() - startedTime;
    const t = (time + st) / (avg && count || 1);
    return round(keys[key](t), 3);
  }

  for(const key of Object.keys(keys)) {
    Object.defineProperty(this, key, { get: () => get(key), enumerable: true });
  }

  this.avg = {};
  for(const key of Object.keys(keys)) {
    Object.defineProperty(this.avg, key, { get: () => get(key, true), enumerable: true });
  }

  function printWrapper(obj, key) {
    return label => console.info(`${label || 'Time'}: ${obj[key]} ${key}`)
  }
  for(const key of Object.keys(keys)) {
    this[`${key}Print`] = printWrapper(this, key);
    this.avg[`${key}Print`] = printWrapper(this.avg, key);
  }
}

module.exports = ElapsingTime;
