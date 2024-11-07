import { cookies } from 'next/headers'

export const t = async () => {
    const cookieStore = cookies();
    let newDeviceToken = null;
    let deviceTokenObj = cookieStore.get('deviceToken');
    let deviceToken = deviceTokenObj && deviceTokenObj.value ? deviceTokenObj.value : null
}



