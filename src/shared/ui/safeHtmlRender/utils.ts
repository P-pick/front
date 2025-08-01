import DOMPurify from 'dompurify';

export const sanitizedHtml = (html: string): string => {
  const sanitized = DOMPurify.sanitize(html);
  if (!sanitized || typeof sanitized !== 'string') {
    throw new Error('Invalid sanitized HTML content');
  }
  return sanitized;
};
