import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { actGetDeviceToken, actGetRefreshToken } from '@/services/actions/init.action'
import { decodeJWT } from '@/utils/auth';


import { match as matchLocale } from '@formatjs/intl-localematcher';
import Negotiator from 'negotiator';
import { i18n } from '@/i18n/i18n.config';
import { SET_DEVICE_TOKEN } from './constants/appConfig';

function getLocale(request: NextRequest) {
  const negotiatorHeaders: Record<string, any> = {};
  request.headers.forEach((value, key) => (negotiatorHeaders[key] = value));
  const locales = i18n.locales;
  let languages = new Negotiator({ headers: negotiatorHeaders }).languages(locales);

  let locale: any = matchLocale(languages, locales, i18n.defaultLocale);

  let localeLangauge: any = request.cookies.get('localeLangauge');
   locale = localeLangauge?.value;

  return locale ||  i18n.defaultLocale;
}

export async function middleware(request: NextRequest) {

  const pathname = request.nextUrl.pathname;
  if (pathname !== '/') {
    const pathnameIsMissingLocale = i18n.locales.every(
      (locale) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
    );
  if (pathnameIsMissingLocale) {
      const locale = getLocale(request);
      return NextResponse.redirect(
        new URL(`/${locale}${pathname.startsWith('/') ? '' : '/'}${pathname}`, request.url)
      );
    }
  }


  let isSessionToken = request.cookies.has('sessionToken');
  let isDeviceToken = request.cookies.has('deviceToken');

  if (!isSessionToken && (request.nextUrl.pathname.includes('/profile') || request.nextUrl.pathname.includes('/switch-profile') || request.nextUrl.pathname.includes('/playlist'))) {

    return NextResponse.redirect(new URL('/login', request.url))
  }
 
  if (isSessionToken && request.nextUrl.pathname.startsWith('/login')) {
    return NextResponse.redirect(new URL('/', request.url))
  }

  if (!isDeviceToken) {

    let deviceToken = '';
     deviceToken = await actGetDeviceToken();
     console.log("deviceToken>>>>>>>>>>", deviceToken)     
      let deviceTokenInfo = decodeJWT(deviceToken);
      let response = NextResponse.next();
      let maxDate: any = new Date(deviceTokenInfo.exp * 1000)

      request.cookies.delete('deviceToken')
      SET_DEVICE_TOKEN(deviceToken)
      response.cookies.set({name: 'deviceToken', value: deviceToken, expires: maxDate, path: '/'});
     return response;
  } else {
    let response = NextResponse.next();
    return response;
  }


}

export const config = {
  matcher: ['/((?!api|_next/static|assests|assetsfile|public|scripts|payment-status|qpay|cer|paymentmode|_next/image|favicon.ico|.png|.svg|robots.txt|manifest.json|manifest.webmanifest).*)'],
};
