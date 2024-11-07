import { getEndPoint } from '@/services/helpers/init.helper';

export const contentlistUtil = (config: any) => {
    const objectIds: any = config.sectionData.map((data: any) => {
        return data.id;
    });
    let strObj = JSON.stringify(objectIds);

    let Obj: any = {
        endpoint: getEndPoint(config),
        params: {
            contentlist: strObj,
            orderby: {"objectid": objectIds} 
        }

    }

   return Obj; 
}

export const itemListUtil = (config: any) => {
    const objectIds: any = config.sectionData.map((data: any) => {
        return data.id;
    });
    let strObj = JSON.stringify(objectIds);

    let Obj: any = {
        endpoint: getEndPoint(config),
        params: {
            itemlist: strObj,
            orderby: {"objectid": objectIds} 
        }

    }

   return Obj; 
}