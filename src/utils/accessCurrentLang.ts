import { DEFAULT_LANGUAGE_SETUP } from '@/constants/v1/constants';



export async function actGetCurrentLanguage() {
    let cookieName: any = 'localeLangauge';
    let lang: any = DEFAULT_LANGUAGE_SETUP;
    if (typeof window === 'undefined') {
      // Server-side
      const { cookies: serverCookies } = await import('next/headers');
      lang = serverCookies().get(cookieName)?.value;
    } else {
      // Client-side
      const Cookies = require('js-cookie');
      lang = Cookies.get(cookieName);
    }

    return lang || DEFAULT_LANGUAGE_SETUP;
  }