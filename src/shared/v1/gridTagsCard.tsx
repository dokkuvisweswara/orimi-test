'use client'
import { useRouter } from "next/navigation";

export default function Gridslidercolortag({itemlist, color, lang, selectedLanguage}: any) {
    const router = useRouter();

    const handleClick = () => {
        const { genereid } = itemlist;
        router.push(`/genre/${genereid}`);
    };

    return (
        <section>
            <div
                onClick={handleClick}
                className={`flex flex-wrap w-full h-12 gap-2 p-2 bg-gridTagsBgColor border-gridTagsBorderColor rounded-md border-l-4 hover:bg-gridTagsonhoverColor ${
                    color
                }`}
            >
               {lang && itemlist && itemlist.genereid && (<div className="text-base gap-1 m-auto font-bold flex justify-center" >
                    {/* <p>{props?.lang[props?.itemlist?.genereid] || props?.itemlist?.genereid}</p> */}
                    <p>{itemlist.title && itemlist.title[selectedLanguage]}</p>
                </div>)
                }
            </div>
        </section>
    );
}
