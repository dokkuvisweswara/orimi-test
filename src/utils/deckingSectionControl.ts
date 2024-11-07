
import { getEndPoint } from '@/services/helpers/init.helper';
import { actSectionData } from '@/services/actions/content.action';
import { contentlistUtil } from './deckingSectionUtil';
import { fetchgGenresList } from '@/services/actions/init.action';


const DeckingSectionControl = async (config: any, TokenObj: any, selectedLang: any) => {

    let apiResponse: any = "";
    let configSectionData: any = "";
    configSectionData = config.sectionData;
    try {
        if (config.sectionType === "ITEMLIST" && config.itemType === "CONTENT") {
        
            apiResponse = await actSectionData(contentlistUtil(config), TokenObj);
        }
        else if (config.sectionType === "FILTER") {
             apiResponse = await actSectionData({
                endpoint: getEndPoint(config),
                params: configSectionData,
            }, TokenObj);
        } else if (config.itemType === "CONTENT") {
             apiResponse = await actSectionData({
                endpoint: getEndPoint(config),
                params: configSectionData,
            }, TokenObj);
        } else if (config.itemType === "TRAILERS" || config.itemType === "CASTNCREW") {
            const objectIds: any = configSectionData.map((data: any) => {
                return data.id;
            });
            let strObj = JSON.stringify(objectIds);

             apiResponse = await actSectionData({
                endpoint: getEndPoint(config),
                params: {
                    itemlist: strObj, // Convert the array to a JSON string
                    orderby: {"objectid": objectIds} 
                }
            }, TokenObj);
        } else if (config.itemType === "LANGUAGES") {
            const objectIds: any = config.sectionData.map((data: any) => {
                return data.posterid;
            });

            let strObj = JSON.stringify(objectIds);

             apiResponse = await actSectionData({
                endpoint: getEndPoint(config),
                params: {
                    itemlist: strObj, // Convert the array to a JSON string
                    orderby: {"objectid": objectIds}
                }
            }, TokenObj);
        } else if (config.itemType === "GENRES") {
     
            apiResponse = {data: [{genere: "active"}]};

            let localGenreData: any = [];
            if (typeof window == 'undefined') {
                let genreList: any = await fetchgGenresList();
                localGenreData = genreList.result;
            } else {
                localGenreData = localStorage.getItem('genreList');
                localGenreData = localGenreData ? JSON.parse(localGenreData) : [];
            }        
            let emptyGenere: any = [];
            for (let inner of configSectionData) {
                for (let outer of localGenreData) {
                    if (inner.genereid == outer.genereid) {
                        emptyGenere.push(outer)
                        break;
                    }
                }
            }
            
            configSectionData = emptyGenere;
        } else if (config.itemType === "PLANS") {
             apiResponse = await actSectionData({
                endpoint: getEndPoint(config),
                params: configSectionData,
            }, TokenObj);
        }

        const responseData = apiResponse ? apiResponse.data : [];
        const apiCallData = {
            endpoint: getEndPoint(config),
            params: configSectionData,
        }
        return {
            config: config,
            apiCallData: apiCallData,
            sectionData: responseData,
            headerData: { titleheader: config.title[selectedLang == "en" ? "eng" : "mon"] || "Default Title", listType: config.listType || "TWOROWS", sectionData: configSectionData, link: config.title["eng"]  },
        };
    } catch (error) {
        return {
            sectionData: [],
            headerData: { titleheader: "Orimedia" },
        };
    }
}

export default DeckingSectionControl;