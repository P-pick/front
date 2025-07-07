export function conversionSecToHour(sec: number) {
  let minutes = Math.floor(sec / 60);
  const hours = Math.floor(minutes / 60);
  minutes = minutes % 60;
  return {
    hours,
    minutes,
  };
}

export function conversionPathDistance(distance: number) {
  if (distance < 1000) {
    return `${distance}m`;
  } else {
    const km = (distance / 1000).toFixed(1);
    return `${km}km`;
  }
}
