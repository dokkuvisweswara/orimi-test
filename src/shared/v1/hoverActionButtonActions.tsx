import MoreOption from "./moreOption";
import Favourite from "./favourite";
import PlayContent from "./playContent";

export default function HoverCardActionContainer({contentId, contentData, whereIamFrom, lang}: any) {
    return (
        <>
            <div className="w-auto h-auto">
                <Favourite id={contentData.objectid} contentData={contentData} whereIamFrom={whereIamFrom} lang={lang}></Favourite>
            </div>
            <div className="w-auto h-auto">
                <PlayContent className='ml-8' id={contentData.objectid} contentData={contentData} whereIamFrom={whereIamFrom} lang={lang}></PlayContent>
            </div>
            <div className="w-auto h-auto">
                <MoreOption id={contentData.objectid} contentData={contentData} type={'hoverCard'} invisible={true} position={'left'} lang={lang}></MoreOption>
            </div>
        </>
    )
}