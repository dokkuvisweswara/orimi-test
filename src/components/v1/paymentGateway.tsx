'use client'
import OrderSummary from "./orderSummary";
import PaymentMode from "./paymentType";
import { useRouter } from "next/navigation";
import { useState } from 'react';
import { PaymentContainer } from "@/components/v1/Checkout";
import QPay from "@/app/qpay/page"; 



export default function Gateway({ plan, gateways, callBackModalClose, lang }: any) {
    let search = {}
    if (typeof window !== 'undefined') {
      search =  (window as any).location.search
    }
    const params = new URLSearchParams(search);
    const router = useRouter();
    const [showCheckout, setShowCheckout] = useState(false);
    const [selectedPaymentMode, setSelectedPaymentMode] = useState('');
    const [planDataForQPay, setPlanDataForQPay] = useState(null);

    const closeModal = () => {
        callBackModalClose(false);
    };

    const handlePayNowClick = () => {
        if (selectedPaymentMode === 'Card') {
            setShowCheckout(true);
        } else {
            setPlanDataForQPay(plan);
        }
    };

    const handleSelectPaymentMode = (mode: string) => {
        setSelectedPaymentMode(mode);
    };
    return (
        <div className="mt-[5%] overflow-y-auto  max-h-full">
            {planDataForQPay ? (
                <QPay planData={planDataForQPay} planQpay={plan} lang={lang}/>
            ) : (
                <div>
                    {showCheckout ? (
                        <div className="text-lg rounded-lg rounded-b-xl px-4">
                            <PaymentContainer plan={plan} />
                        </div>
                    ) : (
                        <div className="text-lg bg-[#151617] rounded-lg rounded-b-xl px-4">
                            <div className="flex justify-between p-4">
                                <p className="relative text-3xl font-bold text-slate-100">{lang?.Order_Summary}</p>
                                <p className="relative only:-mx-5 cursor-pointer font-extrabold" onClick={closeModal}>
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-6 w-6 text-slate-100 hover:scale-125 transition-all duration-700"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        strokeWidth="1.5"
                                        role="graphics-symbol"
                                        aria-labelledby="title-79 desc-79"
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </p>
                            </div>
                            <section>
                                <div className="container px-4 m-auto">
                                    <div className="grid grid-cols-4 gap-6 md:grid-cols-8 lg:grid-cols-12">
                                        <div className="col-span-4 lg:col-span-6">
                                            <OrderSummary plan={plan} lang={lang} />
                                        </div>
                                        <div className="col-span-4 lg:col-span-6 py-4">
                                            <PaymentMode lang={lang} gateways={gateways} onSelectPaymentMode={handleSelectPaymentMode} />
                                            <button
                                                className="mt-[3rem] inline-flex h-10 w-full items-center justify-center gap-2 whitespace-nowrap rounded bg-selectedBGPrimaryColor px-5 text-sm font-medium tracking-wide text-primaryColor transition duration-300 hover:bg-[#BA0B5D] m-2"
                                                onClick={handlePayNowClick}
                                            >
                                                {lang?.pay_now}
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </section>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
