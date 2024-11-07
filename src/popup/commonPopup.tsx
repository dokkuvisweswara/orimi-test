import { ReactNode } from "react";

type Props = {
    children: ReactNode;
};

const PopupHeader = ({children}: Props) => {
    return <div className="text-lg font-bold">{children}</div>;
  };
  
const PopupBody = ({children}: Props) => {
return <div className="text-base">{children}</div>;
};

const PopupFooter = ({children}: Props) => {
return <div className="text-sm">{children}</div>;
};

const Popup = ({children}: Props) => {
return (
    <div className="fixed top-0 left-0 transform bg-commonPopupBackgroundColor overflow-hidden z-50 w-screen h-screen">
    <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-[#161213] shadow-md overflow-hidden rounded-lg z-50">
    {children}
    </div>
    </div>
);
};
export {Popup, PopupHeader, PopupBody, PopupFooter}