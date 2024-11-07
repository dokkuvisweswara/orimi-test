import { cookies } from 'next/headers'
import { NextRequest, NextResponse } from "next/server";
import { CONFIG_URL } from '@/constants/v1/constants';
import {  BASEURLS, DEVICE_TOKEN_PATHNAME } from '@/constants/appConfig';
import { httpGet, httpPost } from '@/services/actions/http';
import { encryptDeviceInfo } from '@/utils/device';


async function actGetDeviceToken () {
    const deviceInformation = encryptDeviceInfo();
    let url = `${BASEURLS.vSMS}${DEVICE_TOKEN_PATHNAME}${deviceInformation.providerid}?hash=${deviceInformation.hash}`
    let body = deviceInformation.enc
    let response = await httpPost(url, null, body);
    cookies().set('deviceToken', response.result.success)
}
export async function GET(request:NextRequest) {

    cookies().set('deviceToken', 'k')

    try {
        return NextResponse.json({
            message: "User found",
        }, {status: 208})
    } catch (error:any) {
        return NextResponse.json({error: error.message}, {status: 400});
    }

}