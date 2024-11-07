'use client'

import { dataType } from "@/utils/content";
import Badge from "./badge";
import ArtistName from "@/containers/artistName";

export default function CardDetails(props: any) {
    let badge = dataType(props.itemlist)
    return ( 
            <article className="w-full">
                <div className="text-left w-full mx-auto ">       
                    {props.itemlist.title && <p className="w-32 text-sm text-primaryItemColor font-semibold  overflow-hidden overflow-ellipsis whitespace-nowrap opacity-90" title={props.itemlist.title}>{props.itemlist.title}</p>}
                    <p className="text-sm text-primaryItemColor opacity-60 mx-auto mt-1">{props.itemlist.des1}</p>
                    <p className='flex cursor-pointer hover:underline text-[0.68rem] text-primaryColor opacity-60'>
                      {(props?.itemlist?.castncrew || props.itemlist?.bandorartist) 
                      ? 
                      <ArtistName data={props.itemlist}></ArtistName> 
                      : 
                      '' 
                      }
                    </p>
                    <p className="mt-1">                
                    {props.itemlist.category && <Badge cta={badge} whereIamFrom={'vertical'} lang={props?.lang}></Badge>}
                    {props?.itemlist?.genre &&  <span className="text-[0.65rem] font-medium ml-2 opacity-60 max-w-[50%] w-24 truncate inline-block align-middle" title = {props?.lang && (props?.lang[props.itemlist.genre] || props.itemlist.genre)} >{props?.lang && (props?.lang[props.itemlist.genre] || props.itemlist.genre)}</span>}
                    {props.itemlist.year && <span className="ms-2">{props.itemlist.year}</span>}
                    </p>
                </div>
            </article>
    )
}
