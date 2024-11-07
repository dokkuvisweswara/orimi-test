'use client'
import Image from 'next/image';
import { getPoster, redirectUrl }  from '@/utils/content'
import { useStoreContent } from '@/store/init';
import { useRouter } from 'next/navigation';
import Placeholder from '../../../public/placeHolder.svg';
import Link from 'next/link';
export default function VerticalRoundedGridCard({itemlist, displayType, lang}: any){
    const setContentData = useStoreContent((state : any) => state.setContentData);
    const router = useRouter();
    const cardClickHandle = async(Event: any) => {
        Event.preventDefault();
        setContentData({...itemlist});
      }
    return (
    <main>
        <section>
            <div className="w-full h-auto gap-0.2 flex-col items-start hover:cursor-pointer" onClick={(Event: any) => cardClickHandle(Event)}>
                <div className='max-w-50 w-41'>      
                <Link shallow href={redirectUrl(itemlist)} className='min-w-[150px] min-h-[150px]'>               
                    <Image loading="lazy" width={150} height={150} className="w-full hover:brightness-50 aspect-square rounded-full object-cover border-2 border-primaryBgColor p-1 sborder-0 bg-gradient-to-r from-pink-600 via-indigo-600   to-yellow-300" src={itemlist?.profilepic?itemlist?.profilepic:Placeholder} alt={itemlist?.castncrewname} /> 
                </Link>                   
                </div>
                <div className="text-left p-3 font-semibold w-full  text-primaryItemColor opacity-90">
                    <p className='text-sm text-center overflow-hidden overflow-ellipsis whitespace-nowrap' title={itemlist?.castncrewname}>{itemlist?.castncrewname}</p>
                   {itemlist?.role && lang && <p className="text-primaryColor text-center text-sm font-thin opacity-60 overflow-hidden overflow-ellipsis whitespace-nowrap" >
                        {itemlist.role.map((roleName: any, index: number) => {
                            return (
                                <span key={index}>
                                    {lang[roleName.toUpperCase()] ? lang[roleName.toUpperCase()] : roleName}
                                    {index !== itemlist.role.length - 1 && ', '}

                                </span>
                            );
                        })}
                    </p> }
            
                </div>
            </div>
        </section>
    </main>
    )}