import Link from "next/link";
import Image from "next/image";
import v41 from '@/app/404error.svg';
export default function Notfound(){
    return(
        <>
        {/* <div className="mt-40 ml-40 p-8 ">
            
                <div className="inline-block p-4 align-middle ">
                    <div className="">
                        <div className="mt-2">
                            <p className=" text-primaryColor text-5xl font-bold">404</p>
                        </div>
                        <div className="mt-2">
                            <p className="text-primaryColor text-xl mt-4">The page not found</p>
                        </div>
                    </div>
                    <div className="">
                        <div className="w-80 mt-2">
                            <p className="text-primaryColor text-sm mt-4">The page you were looking for was not found. Would you please go back?</p>
                        </div>
                        <div className="mt-10">
                        <a href="/" className="no-underline text-primaryColor text-md hover:underline hover:text-selectedBGPrimaryColor ">GO HOME</a>
                        </div>
                    </div>
                </div>
            
            
            <div className="inline-block   p-4 align-middle">
            <Image src={v41}  className="flex w-120 h-120 float-right" alt="My Image"/>
            </div>
            
        </div> */}
        <div className="flex items-center justify-center h-screen">
        <div className="mx-auto px-4 sm:px-6 lg:px-8  lg:mt-0 max-w-7xl">
    <div className="md:flex md:items-center md:justify-between">
        <div className="md:w-1/2 ml-0 md:ml-20 lg:ml-40">
            <div className="inline-block p-4 align-middle">
                <div>
                    <div>
                        <p className="text-primaryColor text-5xl font-bold">404</p>
                    </div>
                    <div>
                        <p className="text-primaryColor text-xl mt-4">The page not found</p>
                    </div>
                </div>
                <div>
                    <div className="mt-2">
                        <p className="text-primaryColor text-sm mt-4">The page you were looking for was not found. Would you please go back?</p>
                    </div>
                    <div className="mt-10">
                        <a href="/" className="no-underline text-primaryColor text-md hover:underline hover:text-selectedBGPrimaryColor">GO HOME</a>
                    </div>
                </div>
            </div>
        </div>

        <div className="md:w-1/2 mt-10 md:mt-0">
            <div className="inline-block p-4 align-middle">
            <Image src={v41}  className="flex w-120 h-120 float-right" alt="My Image"/>
            </div>
        </div>
    </div>
</div>
</div>
        </>
    )
}