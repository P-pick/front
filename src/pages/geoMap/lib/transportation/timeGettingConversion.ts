export function conversionSecToHour(sec: number) {
  let minutes = Math.floor(sec / 60);
  let hours = Math.floor(minutes / 60);
  minutes = minutes % 60;
  return {
    hours,
    minutes,
  };
}
