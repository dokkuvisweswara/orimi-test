import { cookies } from 'next/headers'
import { DEVICE_TOKEN } from '@/constants/appConfig';


export function getAccessTokenObjFromServer(tokenType: any = {}) {

  const cookieStore = cookies();
  const header: any = {};
  if (tokenType == 'REFRESH') {
    let refreshTokenObj = cookieStore.get('refreshToken');
    let refreshToken = refreshTokenObj && refreshTokenObj.value ? refreshTokenObj.value : null
    header["Authorization"] = `Bearer ${refreshToken}`;
    return;
  }
  let deviceTokenObj = cookieStore.get('deviceToken');
  let deviceToken = deviceTokenObj && deviceTokenObj.value ? deviceTokenObj.value : null

  let sessionTokenObj = cookieStore.get('sessionToken');
  let sessionToken = sessionTokenObj && sessionTokenObj.value ? sessionTokenObj.value : null

  if (DEVICE_TOKEN) {
    deviceToken = DEVICE_TOKEN
  }

  if (sessionToken && tokenType != "deviceToken") {
    header["X-SESSION"] = `${sessionToken}`;
  } else {
    header["Authorization"] = `Bearer ${deviceToken}`;
  }

  return header;

}