import { LICENSE_SERVER_FAIRPLAY, PRODIVER_ID } from "@/constants/v1/constants";

export default function M3U8({ packageid, objectid, manifestUri, drmToken, packagedfilelist }: any) {

    var _certificate: any = "";
    var audioTag: any = "";
    var _contentId: any = "";
    var _keySystem: any = "";


    init();

    audioTag.addEventListener('canplay', (event: any) => {
        audioTag.play().then(() => {
        }).catch((error: any) => {
        });

    })
        
    function waitForEvent(name: any, action: any, target: any) {
        target.addEventListener(name, function () {
            action(arguments[0]);
        }, false);
    }
    function arrayToString(array: any) {
        var uint16array: any = new Uint16Array(array.buffer);
        return String.fromCharCode.apply(null, uint16array);
    }

    function extractContentId(initData: any) {
        _contentId = arrayToString(initData);
        var link = document.createElement('a');
        link.href = _contentId;
        return link.hostname;
    }
    function stringToArray(string: any) {
        var buffer = new ArrayBuffer(string.length * 2); // 2 bytes for each char
        var array = new Uint16Array(buffer);
        for (let i = 0, strLen = string.length; i < strLen; i++) {
            array[i] = string.charCodeAt(i);
        }
        return array;
    }

    function concatInitDataIdAndCertificate(initData: any, id: any, cert: any) {
        if (typeof id == "string")
            id = stringToArray(id);
        // layout is [initData][4 byte: idLength][idLength byte: id][4 byte:certLength][certLength byte: cert]
        var offset = 0;
        var buffer = new ArrayBuffer(initData.byteLength + 4 + id.byteLength + 4 + cert.byteLength);
        var dataView = new DataView(buffer);

        var initDataArray = new Uint8Array(buffer, offset, initData.byteLength);
        initDataArray.set(initData);
        offset += initData.byteLength;

        dataView.setUint32(offset, id.byteLength, true);
        offset += 4;

        var idArray = new Uint16Array(buffer, offset, id.length);
        idArray.set(id);
        offset += idArray.byteLength;

        dataView.setUint32(offset, cert.byteLength, true);
        offset += 4;

        var certArray = new Uint8Array(buffer, offset, cert.byteLength);
        certArray.set(cert);

        return new Uint8Array(buffer, 0, buffer.byteLength);
    }

    function base64EncodeUint8Array(input: any) {
        var keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
        var output = "";
        var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
        var i = 0;

        while (i < input.length) {
            chr1 = input[i++];
            chr2 = i < input.length ? input[i++] : Number.NaN; // Not sure if the index
            chr3 = i < input.length ? input[i++] : Number.NaN; // checks are needed here

            enc1 = chr1 >> 2;
            enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
            enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
            enc4 = chr3 & 63;

            if (isNaN(chr2)) {
                enc3 = enc4 = 64;
            } else if (isNaN(chr3)) {
                enc4 = 64;
            }
            output += keyStr.charAt(enc1) + keyStr.charAt(enc2) +
                keyStr.charAt(enc3) + keyStr.charAt(enc4);
        }
        return output;
    }

    function base64DecodeUint8Array(input: any) {
        var raw = window.atob(input);
        var rawLength = raw.length;
        var array = new Uint8Array(new ArrayBuffer(rawLength));

        for (let i = 0; i < rawLength; i++)
            array[i] = raw.charCodeAt(i);

        return array;
    }
    function loadCertificate() {
        return new Promise((resolve, reject) => {

            let requestHeaders = new Headers();
            requestHeaders.append('Pragma', 'no-cache');
            requestHeaders.append('Cache-Control', 'max-age=0');

            let requestOptions: any = {
                method: 'GET',
                headers: requestHeaders,
                redirect: 'follow',
            };

            fetch('/cer/fairplay.cer', requestOptions)
                .then((response: any) => {
                    if (response.ok == true) {
                        return response.arrayBuffer();
                    } else {
                        reject(response.status);
                    }
                }).then((data): any => {
                    _certificate = new Uint8Array(data);
                    resolve(true);
                }).catch((error) => {
                    reject(false);
                });
        });
    }
    function selectKeySystem() {
        if ((<any>window).WebKitMediaKeys.isTypeSupported("com.apple.fps.1_0", "video/mp4")) {
            _keySystem = "com.apple.fps.1_0";
        }
        else {
            throw "Key System not supported";
        }
    }
    function audioPlayerWebkitKeyNeededCb(event: any) {
        audioTag.removeEventListener('webkitneedkey', audioPlayerWebkitKeyNeededCb);

        //onneedkey code block.
        var video = event.target;
        var initData = event.initData;
        _contentId = extractContentId(initData);

        initData = concatInitDataIdAndCertificate(initData, _contentId, _certificate);

        if (!video.webkitKeys) {
            selectKeySystem();
            video.webkitSetMediaKeys(new (<any>window).WebKitMediaKeys(_keySystem));
        }

        if (!video.webkitKeys)
            throw "Could not create MediaKeys";

        var keySession = video.webkitKeys.createSession("audio/mp4", initData);

        if (!keySession)
            throw "Could not create key session";

        keySession.contentId = _contentId;

        waitForEvent('webkitkeymessage', (event: any) => {
            var session = event.target;
            var message = event.message;
            var sessionId = event.sessionId;

            let requestHeaders = new Headers();
            requestHeaders.append('Content-type', 'application/json');
            let wrappedLicenseRequest: any = {};

            wrappedLicenseRequest['payload'] = base64EncodeUint8Array(message);
            wrappedLicenseRequest['drmscheme'] = 'FAIRPLAY';
            wrappedLicenseRequest['contentid'] = objectid;
            wrappedLicenseRequest['providerid'] = PRODIVER_ID;
            wrappedLicenseRequest['timestamp'] = Math.floor((new Date()).getTime() / 1000);
            var customData: any = {};
            customData.packageid = packageid;
            customData.drmtoken = drmToken;
            wrappedLicenseRequest['customdata'] = customData;

            let licenseRequestJsonString = JSON.stringify(wrappedLicenseRequest);

            let requestOptions = {
                method: 'POST',
                headers: requestHeaders,
                body: licenseRequestJsonString,
            };

            fetch(LICENSE_SERVER_FAIRPLAY, requestOptions)
                .then((response) => {
                    if (response.ok == true) {
                        return response.json();
                    }
                }).then(data => {
                    let key = base64DecodeUint8Array(data.body);
                    session.update(key);
                }).catch((error) => {
                    // this._abortController = null;
                    // console.log('Start video catch : ', error);
                    // this._videoRejectCb(false);
                });

        }, keySession);

        waitForEvent('webkitkeyadded', () => {
            audioTag.webkitKeyMessage = null;

        }, keySession);

        waitForEvent('webkitkeyerror', (error: any) => {
            //onkeyerror code block.
            keySession.close();

        }, keySession);

    }

    function init() {
        if (audioTag) {
            audioTag.webkitKeys = null;
            audioTag.webkitKeyMessage = null;
            audioTag.removeEventListener('webkitneedkey', audioPlayerWebkitKeyNeededCb);

        }


        audioTag = document.getElementById('playback-unit');
     
        audioTag.addEventListener('webkitneedkey', audioPlayerWebkitKeyNeededCb);

        loadCertificate().then(() => {
            audioTag.src = manifestUri;
            audioTag.addEventListener('ended', () => {
                audioTag.webkitKeyMessage = null;
                audioTag.webkitKeys = null;

                audioTag.src = ""; // Clearing src might stop playback
            });

            audioTag.addEventListener('webkitkeyerror', (error: any) => {
                // Get the key session associated with the error
                const keySession = error.target;
                // Close the key session
                if (keySession && typeof keySession.close === 'function') {
                    keySession.close();
                }
                console.error('A decryption key error was encountered:', error);
            });
        })

    }

}