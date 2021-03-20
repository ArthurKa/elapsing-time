const { performance } = typeof window !== 'undefined' ? window : require('perf_hooks');

const round = (n: number, d: number) => +n.toFixed(d);
const wrapMultiplier = (m: number) => (n: number) => n * m;

type TimeMeasurementKeys = 's' | 'ms' | 'us';
type PrintTimeMeasurementKeys = `${TimeMeasurementKeys}Print`;

type TimeMeasurements = {
  readonly [k in TimeMeasurementKeys]: number;
} & {
  [k in PrintTimeMeasurementKeys]: (label?: string) => void;
};

interface IElapsingTime extends TimeMeasurements {
  start(): void;
  stop(withReset?: boolean): void;
  reset(): void;
  avg: TimeMeasurements;
}

const keys: Record<TimeMeasurementKeys, (ms: number) => number> = {
  s: wrapMultiplier(0.001),
  ms: wrapMultiplier(1),
  us: wrapMultiplier(1000),
};

const ElapsingTime = function() {
  let time = 0;
  let count = 0;
  let startedTime = 0;
  let cachedTime = false;

  const res = {} as IElapsingTime;

  res.start = () => {
    if(cachedTime) {
      res.reset();
      cachedTime = false;
    }
    startedTime = performance.now();
    count++;
  };
  res.stop = (withReset = false) => {
    if(startedTime) {
      time += performance.now() - startedTime;
      startedTime = 0;
    }
    if(withReset) {
      cachedTime = true;
    }
  };
  res.reset = () => {
    time = count = startedTime = 0;
  };

  function get(key: TimeMeasurementKeys, avg = false) {
    const st = startedTime && performance.now() - startedTime;
    const t = (time + st) / (avg && count || 1);
    return round(keys[key](t), 3);
  }

  for(const key of Object.keys(keys) as TimeMeasurementKeys[]) {
    Object.defineProperty(res, key, { get: () => get(key), enumerable: true });
  }

  res.avg = {} as TimeMeasurements;
  for(const key of Object.keys(keys) as TimeMeasurementKeys[]) {
    Object.defineProperty(res.avg, key, { get: () => get(key, true), enumerable: true });
  }

  function printWrapper(obj: TimeMeasurements, key: TimeMeasurementKeys) {
    return (label?: string) => console.info(`${label || 'Time'}: ${obj[key]} ${key}`);
  }
  for(const key of Object.keys(keys) as TimeMeasurementKeys[]) {
    res[`${key}Print` as const] = printWrapper(res, key);
    res.avg[`${key}Print` as const] = printWrapper(res.avg, key);
  }

  return res;
} as any as new () => IElapsingTime;

export default ElapsingTime;
