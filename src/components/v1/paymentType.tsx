import { useState } from 'react'; 
import Image from "next/image";
import Banking from "../../../public/paymentmode/qpay.png"
import Card from "../../../public/paymentmode/Adyen.png"
import RadioBox from "@/shared/v1/radioBoxInput";

export default function PaymentMode({ lang, gateways, onSelectPaymentMode }: any) {
    const [selectedMode, setSelectedMode] = useState('Card');

    const handleSelectMode = (mode: string) => {
        setSelectedMode(mode);
        onSelectPaymentMode(mode);
    };

    const allPaymentOptions = [
        { label: 'Credit/Debit Card', image: Card, mode: 'Card' , gateway: "ADYEN" },
         { label: 'Q PAY', image: Banking, mode: 'QPAY', gateway: "CHECKOUT"  }
    ];

    // Filter payment options based on available gateways
    const paymentOptions = allPaymentOptions.filter(option => gateways.includes(option.gateway));

    return (
        <div className="space-y-10">
            {paymentOptions.map((option, index) => (
                <div key={index} className="flex items-center">
                    <Image src={option.image} alt={option.label} width={30} height={25} />
                    <div className="px-4 w-full">
                        <p className="text-white font-bold">{option.label}</p>
                    </div>
                    <div className="">
                        <RadioBox
                            payload={{ mode: option.mode, set: "" }}
                            onClick={() => handleSelectMode(option.mode)}
                            checked={selectedMode === option.mode}
                        />
                    </div>
                </div>
            ))}
        </div>
    );
}
