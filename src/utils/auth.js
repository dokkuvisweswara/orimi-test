
  
  export const decodeJWT = (token) => {
  
      function base64UrlDecode(str) {
        str = str.replace(/-/g, '+').replace(/_/g, '/');
        const missingPadding = str.length % 4;
        if (missingPadding) {
          str += '='.repeat(4 - missingPadding);
        }
        return atob(str);
      }
      if(!token || token == 'undefined')  return '';

      const [header, payload, signature] = token && token?.split('.');

      const decodedPayload = JSON.parse(base64UrlDecode(payload));

      return decodedPayload;
   

  }
  
