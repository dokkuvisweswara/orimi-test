import { LICENSE_SERVER, PRODIVER_ID } from "@/constants/v1/constants";


export default function DASHPLAYER({ packageid, objectid, manifestUri, drmToken, packagedfilelist }: any) {
    // Create a Player instance.
    var playbackUnit = document.getElementById('playback-unit');
    (window as any).shaka.polyfill.installAll();

    (window as any).player = new (window as any).shaka.Player(playbackUnit);

    let licenseServerUrl = LICENSE_SERVER;

    // Listen for error events.
    (window as any).player.addEventListener('error', onErrorEvent);

    (window as any).player.configure({
        drm: {
            servers: {
                'com.widevine.alpha': licenseServerUrl
            }
        },
        abr: { enabled: true }

    });


    (window as any).player.getNetworkingEngine().registerRequestFilter(function(type: any, request: any) {

        if (type == (window as any).shaka.net.NetworkingEngine.RequestType.LICENSE) {
          var rawLicenseRequest: any = new Uint8Array(request.body);
          request.headers['Content-Type'] = "application/json";
          // Create the wrapped request structure.
          var wrapped: any = {};
          wrapped.payload = btoa(String.fromCharCode.apply(null, rawLicenseRequest));
          wrapped.drmscheme = "WIDEVINE";
          let customData: any = {}
          customData.packageid = packageid;
          customData.drmtoken = drmToken;
          wrapped.customdata = customData;
          wrapped.contentid = objectid;
          wrapped.providerid = PRODIVER_ID;

          var wrappedJson = JSON.stringify(wrapped);

          request.body = new Uint8Array(wrappedJson.length);
          for (var i = 0; i < wrappedJson.length; ++i) {
            request.body[i] = wrappedJson.charCodeAt(i);
          }
        }
    });

    (window as any).player.getNetworkingEngine().registerResponseFilter(function(type: any, response: any) {
        var StringUtils = (window as any).shaka.util.StringUtils;
        var Uint8ArrayUtils = (window as any).shaka.util.Uint8ArrayUtils;
        if (type == (window as any).shaka.net.NetworkingEngine.RequestType.LICENSE) {

          let contentType = response.headers['content-type'];
          var wrappedArray: any = new Uint8Array(response.data);
          var wrappedString = String.fromCharCode.apply(null, wrappedArray);
          var wrapped = JSON.parse(wrappedString);

          var rawLicenseBase64 = wrapped.body;
          var rawLicenseString = atob(rawLicenseBase64);
          response.data = new Uint8Array(rawLicenseString.length);
          for (var i = 0; i < rawLicenseString.length; ++i) {
            response.data[i] = rawLicenseString.charCodeAt(i);
          }

        }
    });

    (window as any).player.load(manifestUri).then(function() {

        (window as any).player.play();
    }).catch(onError);  // onError is executed if the asynchronous load fails.
}

function onErrorEvent(event: any) {
  // Extract the shaka.util.Error object from the event.
  onError(event.detail);
}

function onError(error: any) {
  // Log the error.
}