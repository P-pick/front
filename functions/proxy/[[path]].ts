/// <reference types="@cloudflare/workers-types" />

export const onRequest: PagesFunction = async ({ request, params }) => {
  const url = new URL(request.url);
  const targetUrl = new URL('https://apis.data.go.kr/B551011/KorService2');

  // path를 배열로 변환
  const path = Array.isArray(params.path) ? params.path.join('/') : params.path;

  // 새로운 URL 생성
  targetUrl.pathname = targetUrl.pathname + '/' + path;
  targetUrl.search = url.search;

  const headers = new Headers(request.headers);
  headers.delete('x-frame-options');

  // 새로운 요청 생성
  const newRequest = new Request(targetUrl.toString(), {
    method: request.method,
    headers: headers,
    body: request.body,
    redirect: 'follow',
  });

  // CORS 헤더 추가
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, HEAD, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  };

  // OPTIONS 요청 처리
  if (request.method === 'OPTIONS') {
    return new Response(null, {
      status: 204,
      headers: corsHeaders,
    });
  }

  try {
    const response = await fetch(newRequest);
    const newHeaders = new Headers(response.headers);

    // 기존 헤더에 CORS 헤더 추가
    Object.entries(corsHeaders).forEach(([key, value]) => {
      newHeaders.set(key, value);
    });

    // 보안 관련 헤더 제거
    newHeaders.delete('x-frame-options');

    return new Response(response.body, {
      status: response.status,
      statusText: response.statusText,
      headers: newHeaders,
    });
  } catch (error) {
    return new Response(`Error fetching from the target API ${error}`, {
      status: 500,
    });
  }
};
