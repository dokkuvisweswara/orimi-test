import { forceCache } from "@/constants/v1/constants"


const setAPIConfig = (headers={}, body={}, method='GET', url=''): object => {
    let config: any = {
        method: method    
      }
      if (headers) {
        config.headers = headers
      }
    if (body && method != 'GET') {
        config.body = body
    }
    if (url.startsWith('https://vcms.mobiotics.com')) {
      config = { ...config, ...forceCache}
    }
    
    return config;
}
export const httpGet = async (url: string, headers={}, tokenType='') => {
  
    try {
        const httpCallref = fetch(url, setAPIConfig(headers, {}, 'GET', url))
        let response = await httpCallref;
        const result = await response.json();
        return { result, isSuccessful: response.ok , statusCode: response.status};
      } catch (error) {
        return { result: error, isSuccessful: false , statusCode: 404};
      }
}
export const httpGetStatic = async (url: string) => {
  try {
     
      const httpCallref =  fetch(url);
      const response = await httpCallref;

      const result = await response.json();
      return { result, isSuccessful: response.ok , statusCode: response.status};

    } catch (error) {
      return { result: error, isSuccessful: false , statusCode: 404};

    }
}

export const httpPost = async (url: string, headers:any = null, payload={}) => {
    try {
        const response = await fetch(url, setAPIConfig(headers, payload, 'POST'));
        const result = await response.json();
        return { result, isSuccessful: response.ok, statusCode: response.status};

      } catch (error) {
        return { result: error, isSuccessful: false , statusCode: 404};

      }
}

export const httpDelete = async (url: string, headers:any = null, payload={}) => {
  try {
    const response = await fetch(url, setAPIConfig(headers, payload, 'DELETE'));
    const result = await response.json();
    return { result, isSuccessful: response.ok, statusCode: response.status};
  } catch (error) {
    return { result: error, isSuccessful: false , statusCode: 404};
  }
}

export const httPut = async (url: string, headers:any = null, payload={}) => {
  try {
      const response = await fetch(url, setAPIConfig(headers, payload, 'PUT'));
      const result = await response.json();
      return { result, isSuccessful: response.ok, statusCode: response.status};
    } catch (error) {
      return { result: error, isSuccessful: false , statusCode: 404};
    }
}



export const httpGetRefreshToken = async (url: string, headers={}, tokenType='') => {
  
  try {
      const response = await fetch(url, setAPIConfig(headers, {}, 'GET', tokenType));    
      const result = await response.json();
      return { result, isSuccessful: response.ok , statusCode: response.status};

    } catch (error) {
      return { result: error, isSuccessful: false , statusCode: 404};

    }
}