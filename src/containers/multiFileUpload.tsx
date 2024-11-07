import { notify } from "@/(layout)/v1/ToasterComponent";
import { useState } from "react";
import imageCompression from 'browser-image-compression';

export default function MultiFileUpload({lang}: any){
    const [imagesUploadedArr, setImagesUploadedArr] = useState<any>([]);
    const fileUpload = async (event: any) => {
        let uploadedFile = event.target.files[0];
        let fileExisted = false;
        let formError = false;
        let fileSize = Math.round(uploadedFile.size / 1000);
        imagesUploadedArr.forEach(async (image: any) => {
          if (image.name === uploadedFile.name) {
            notify("Same file is already attached!", 'error');
            fileExisted = true;
          }
        });
        if(!fileExisted){
        if(isImage(uploadedFile)){
          if (fileSize > 1000) {
            const options = {
              maxSizeMB: 1,
              maxWidthOrHeight: 1920,
              useWebWorker: true,
            }
            try {
              uploadedFile = await imageCompression(uploadedFile, options);
            } catch (error) {
              notify(`Compression Error : ${error}`, 'error');
            }

          }
        }else {
          if(fileSize > 1000){
            notify("File size should less than 1 MB", 'error');
            return;
          }
        }
      } else {
        return;
      }
        if (formError) {
          event.target.value = null;
          return;
        } else {
            setImagesUploadedArr((prev: any) => {
                return [...prev, ...[uploadedFile]]
            })
            event.target.value = null;
        } 
    }
    const isImage = (file: any) => {
        if(file.type.match('image.*')){
            return true;  
        }      
        return false;
    }
    return(
        <div>
            <label
              htmlFor="dropzone-file"
              className="flex flex-col items-center justify-center w-full h-6"
            >
              <div className="flex flex-col items-center justify-center w-full">                
                <p className="text-xs text-slate-200 w-full">
                  <span className="font-bold cursor-pointer"> {lang?.attach_doc} </span>
                </p>
              </div>
              <input id="dropzone-file" type="file" className="hidden" onChange={fileUpload}/>
            </label>
        </div>
    )
}
