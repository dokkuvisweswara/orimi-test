export async function actCookieServerClient(cookieName: any) {
    if (typeof window === 'undefined') {
      // Server-side
      const { cookies: serverCookies } = await import('next/headers');
      return serverCookies().get(cookieName)?.value;
    } else {
      // Client-side
      const Cookies = require('js-cookie');
      return Cookies.get(cookieName);
    }
  }