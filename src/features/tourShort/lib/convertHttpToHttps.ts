export const convertHttpToHttps = (url: string | undefined | null): string => {
  if (!url || typeof url !== 'string') {
    return '/common/fallback.webp';
  }

  if (url.startsWith('http://')) {
    return url.replace('http://', 'https://');
  }

  return url;
};
