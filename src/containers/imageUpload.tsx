import { useEffect, useState } from "react";
import User from "../../public/user-icon.svg";
import { uploadPictureFileAction } from "@/services/actions/user.actions";
import { getAccessTokenObj } from "@/services/helpers/init.helper";
import { notify } from "@/(layout)/v1/ToasterComponent";
import Spinner from "@/loaders/spinner/spinner";
import { errors_message } from "@/constants/errors_constants";

export default function ImageUpload({filedata, updatedImageCallBack}: any) {
    const [selectedFile, setSelectedFile] = useState<any>(null);
    const [loader, setLoader] = useState<any>(false);
    useEffect(() => {
        setSelectedFile((prev: any) => {
            return filedata ? filedata : null;
        });
    },[]);
    const handleFileChange = (event: any) => {
        // const file = event.target.files?.[0];
        const uploadedFile = event?.target?.files?.[0];
        setLoader(true);
        let _URL: any = window.URL || window.webkitURL;
        let fileUrl =  _URL?.createObjectURL(uploadedFile);
        let fileObj = {
            filename: uploadedFile
          };
        if(uploadedFile){
            uploadPictureFileAction(fileObj, getAccessTokenObj()).then(async (res: any) => {
                if(res?.isSuccessful){
                    setSelectedFile(fileUrl);
                    updatedImageCallBack(res?.result?.success);
                    setLoader(false);
                }else {
                    notify(res?.result?.reason, 'error');
                    setLoader(false);
                }
            }).catch((error: any) => {
                notify(errors_message.UNKNOWN_ERROR, "error");
                setLoader(false);
            })
        }
      };
    return (
        <div className="relative w-32 h-32 rounded-full border border-gray-500 cursor-pointer flex items-center justify-center group"
             style={{ 
                    backgroundImage: selectedFile ? `url(${selectedFile})` : `url(${User?.src})`,
                    backgroundPosition: 'center',
                    backgroundSize: '100% 100%',
                    backgroundRepeat: 'no-repeat'
                    }}>
            <label htmlFor="fileInput" className="absolute inset-0 flex items-center justify-center z-50">
                <input  
                    id="fileInput"
                    type="file"
                    accept=".jpg, .jpeg, .png"
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    onChange={handleFileChange}
                />
                <span className="text-white text-sm font-medium group-hover:hidden hidden">Click to upload</span>
            </label>
            
            <div className="absolute inset-0 flex items-center justify-center group-hover:flex flex-col z-30 bg-black bg-opacity-40 rounded-full">
            {loader ?
                <Spinner></Spinner> 
                :
                <div className="flex items-center justify-center flex-col">
                    <svg height="35" preserveAspectRatio="xMidYMid meet" version="1.0" viewBox="0 0 256.000000 256.000000" width="35" xmlns="http://www.w3.org/2000/svg">
                        <g fill="#FFFFFF" stroke="none" transform="translate(0.000000,256.000000) scale(0.100000,-0.100000)">
                            <path d="M2016 2465 c-22 -8 -53 -24 -70 -36 -35 -25 -175 -171 -345 -359 -320 -352 -690 -719 -1088 -1078 l-190 -170 -41 -105 c-66 -169 -203 -587 -200 -610 2 -13 11 -23 24 -25 21 -3 316 96 559 188 162 62 138 42 400 335 319 356 648 680 1090 1071 283 252 325 307 325 428 -1 68 -31 115 -156 237 -91 89 -128 119 -159 128 -53 14 -101 13 -149 -4z m117 -159 c46 -19 173 -154 181 -193 4 -17 2 -50 -4 -72 -12 -47 -56 -90 -420 -422 -390 -355 -503 -467 -1021 -1009 l-187 -195 -78 -29 c-44 -16 -84 -31 -91 -33 -6 -3 -14 6 -18 18 -11 32 -81 105 -116 119 -36 15 -35 23 12 135 28 67 38 79 251 280 351 332 706 689 954 960 331 362 392 423 439 440 51 18 59 18 98 1z"/>
                        </g>
                    </svg>
                    <span className="text-white text-sm font-medium hover:underline">Choose photo</span>
                </div>
            }
            </div>
        </div>
    );
}