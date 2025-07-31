import DOMPurify from 'dompurify';
import { useMemo } from 'react';

interface SafeHtmlRendererProps {
  html: string;
}

/**
 * DOMPurify를 사용하여 HTML 문자열을 안전하게 렌더링하는 컴포넌트입니다.
 * XSS 공격을 방지하기 위해 `dangerouslySetInnerHTML`을 사용하기 전에
 * 반드시 DOMPurify로 HTML을 sanitize(정화)합니다.
 *
 * @param {string} html - 렌더링할 HTML 문자열
 */
const SafeHtmlRenderer = ({ html }: SafeHtmlRendererProps) => {
  const sanitizedHtml = useMemo(() => {
    const result = DOMPurify.sanitize(html);
    if (!result || typeof result !== 'string') {
      throw new Error('Invalid sanitized HTML content');
    }
    return result;
  }, [html]);

  return (
    <span
      key={sanitizedHtml}
      dangerouslySetInnerHTML={{ __html: sanitizedHtml }}
    />
  );
};

export default SafeHtmlRenderer;
