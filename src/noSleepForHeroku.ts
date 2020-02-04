// import fetch from 'node-fetch'

export function noSleepForHeroku() {
  const interval = 25;
  const milliseconds = interval * 60000;
  setTimeout(() => {
    console.log('keep me awake')
  }, milliseconds);
};