import { getCurrencyWithPayment } from "@/utils/basicHelper";
import Image from "next/image";

export default function OrderSummary({plan, lang}:any) {  
    
    return (
        <>
            <div className="my-4" >
                <div className="my-5 px-2">
                    <Image src={plan.picture} width={100} height={100}  alt="logo" />
						<p className="text-xl font-bold text-slate-100">{ plan.planname}</p>
						<p className="text-sm text-dotsLoaderBgColor py-2"> { plan.planinterval}</p>
                </div>

                <div className="my-8 px-2 md:mr-8 lg:mr-8">
                    <div className="container m-auto py-1">
                        <div className="grid grid-cols-8 md:grid-cols-8 lg:grid-cols-12 text-dotsLoaderBgColor">
                            <div className="col-span-4 lg:col-span-6">{lang?.price}</div>
								<div className="col-span-4 lg:col-span-6 justify-self-end">{getCurrencyWithPayment(plan.amount, plan.currency)}</div>
                        </div>
                    </div>                        
        
                    <div className="container m-auto py-1">
                        <div className="grid grid-cols-8 gap-6 md:grid-cols-8 lg:grid-cols-12 text-slate-100">
                            <div className="col-span-4 lg:col-span-6 font-semibold">{lang?.total_price }</div>
								<div className="col-span-4 lg:col-span-6 text-sm justify-self-end">{getCurrencyWithPayment(plan.amount, plan.currency)}</div>
                        </div>
                    </div>
                </div>
                {/* <div className="flex w-full">
                    <div className="w-9/12">
                    <input
                        type="text"
                        name="Coupon code"
                        id="Coupon code"
                        placeholder="Coupon Code"
                        autoComplete="given-name"
                        // className="block w-full rounded-sm border-0 px-3.5 py-2 text-gray-200 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-dotsLoaderBgColor focus:ring-1 focus:ring-inset focus:ring-orange-600 sm:text-sm sm:leading-6 bg-transparent"
                        className="block w-full rounded-sm border-0 px-3.5 py-2 text-gray-200 ring-1 ring-inset ring-gray-600 placeholder:text-gray-400 focus:ring-0 focus:ring-inset focus:ring-orange-600 sm:text-sm sm:leading-6 bg-transparent"
                    />
                    </div>
                    <button className="h-10 text-xs text-primaryColor bg-transparent px-2">
                        <span className="font-bold">APPLY</span>
                    </button>
                </div> */}
            </div>
        </>
        

    );
}