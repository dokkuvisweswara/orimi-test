import { getDictionary } from "@/i18n/dictionaries";
import { actGetCurrentLanguage } from "@/utils/accessCurrentLang";
import { useEffect, useState } from "react";

export default function Watchlistheart({height, weight, isActive}: any){
    const [lang, setLang] = useState<any>(null);
    useEffect(() => {
      if ((window as any).setStoreLanguageDataset) {
        setLang((window as any).setStoreLanguageDataset)
      } else {
        actGetCurrentLanguage().then((langSelected) => {
          getDictionary(langSelected).then((language: any) => {
            setLang(language);
          })
        })
      }
      }, []);
    return(
        <>
        { isActive ? 
        (
        <div className="relative custom-tooltip" aria-describedby="tooltip-Remove from library">
        <svg width={weight} height={height} viewBox="0 0 20 19" className="fav-ico hover:scale-125" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M10 18.3249C9.76667 18.3249 9.52917 18.2832 9.2875 18.1999C9.04583 18.1166 8.83333 17.9832 8.65 17.7999L6.925 16.2249C5.15833 14.6082 3.5625 13.0041 2.1375 11.4124C0.7125 9.82074 0 8.06657 0 6.1499C0 4.58324 0.525 3.2749 1.575 2.2249C2.625 1.1749 3.93333 0.649902 5.5 0.649902C6.38333 0.649902 7.21667 0.837402 8 1.2124C8.78333 1.5874 9.45 2.0999 10 2.7499C10.55 2.0999 11.2167 1.5874 12 1.2124C12.7833 0.837402 13.6167 0.649902 14.5 0.649902C16.0667 0.649902 17.375 1.1749 18.425 2.2249C19.475 3.2749 20 4.58324 20 6.1499C20 8.06657 19.2917 9.8249 17.875 11.4249C16.4583 13.0249 14.85 14.6332 13.05 16.2499L11.35 17.7999C11.1667 17.9832 10.9542 18.1166 10.7125 18.1999C10.4708 18.2832 10.2333 18.3249 10 18.3249Z" fill="#D10C69"/>
        </svg>
        <span className="tooltip-text w-36 text-xs left-1/2 transform -translate-x-1/2">{lang?.remove_from_library}</span>
        </div>



        ) :

        (
        <div className="relative custom-tooltip" aria-describedby="tooltip-Add to Library">
        <svg width={weight} height={height} viewBox="0 0 30 27" id="whiteborderheart" fill="none" className="fav-ico hover:scale-125" xmlns="http://www.w3.org/2000/svg">
            <path d="M15 26.5125C14.65 26.5125 14.2938 26.45 13.9313 26.325C13.5688 26.2 13.25 26 12.975 25.725L10.3875 23.3625C7.7375 20.9375 5.34375 18.5312 3.20625 16.1438C1.06875 13.7563 0 11.125 0 8.25C0 5.9 0.7875 3.9375 2.3625 2.3625C3.9375 0.7875 5.9 0 8.25 0C9.575 0 10.825 0.28125 12 0.84375C13.175 1.40625 14.175 2.175 15 3.15C15.825 2.175 16.825 1.40625 18 0.84375C19.175 0.28125 20.425 0 21.75 0C24.1 0 26.0625 0.7875 27.6375 2.3625C29.2125 3.9375 30 5.9 30 8.25C30 11.125 28.9375 13.7625 26.8125 16.1625C24.6875 18.5625 22.275 20.975 19.575 23.4L17.025 25.725C16.75 26 16.4313 26.2 16.0688 26.325C15.7063 26.45 15.35 26.5125 15 26.5125ZM13.575 6.15C12.85 5.125 12.075 4.34375 11.25 3.80625C10.425 3.26875 9.425 3 8.25 3C6.75 3 5.5 3.5 4.5 4.5C3.5 5.5 3 6.75 3 8.25C3 9.55 3.4625 10.9313 4.3875 12.3938C5.3125 13.8563 6.41875 15.275 7.70625 16.65C8.99375 18.025 10.3188 19.3125 11.6813 20.5125C13.0438 21.7125 14.15 22.7 15 23.475C15.85 22.7 16.9563 21.7125 18.3188 20.5125C19.6813 19.3125 21.0063 18.025 22.2938 16.65C23.5813 15.275 24.6875 13.8563 25.6125 12.3938C26.5375 10.9313 27 9.55 27 8.25C27 6.75 26.5 5.5 25.5 4.5C24.5 3.5 23.25 3 21.75 3C20.575 3 19.575 3.26875 18.75 3.80625C17.925 4.34375 17.15 5.125 16.425 6.15C16.25 6.4 16.0375 6.5875 15.7875 6.7125C15.5375 6.8375 15.275 6.9 15 6.9C14.725 6.9 14.4625 6.8375 14.2125 6.7125C13.9625 6.5875 13.75 6.4 13.575 6.15Z" fill="white" fill-opacity="0.9"/>
        </svg>
        <span className="tooltip-text text-xs left-1/2 transform -translate-x-1/2 w-28">{lang?.add_to_library}</span>
        </div>
        )
        }
        </>
    )
}