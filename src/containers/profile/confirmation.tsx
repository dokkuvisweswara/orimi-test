export default function Confirmation({lang, callBackRes}: any) {

    return(
        <>
        <div className="px-6 py-2">
            <div>
                <div className="flex justify-center items-start gap-2 px-1 pt-4">
                    <button className="h-10 gap-2 w-24 rounded-full text-sm font-medium tracking-wide transition duration-300 focus-visible:outline-none justify-self-center whitespace-nowrap bg-selectedBGPrimaryColor text-primaryColor hover:bg-[#BA0B5D]"
                        onClick={() => {callBackRes(true)}}>
                        <span className="order-2">{lang?.ok}</span>
                    </button>
                    <button className="h-10 gap-2 w-24 text-sm font-medium tracking-wide text-primaryColor transition duration-300 rounded-full focus-visible:outline-none whitespace-nowrap bg-selectedBGPrimaryColor hover:bg-[#BA0B5D]"
                        onClick={() => { callBackRes(false)}}>
                        <span className="order-2">{lang?.cancel }</span>
                    </button>
                </div>
            </div>
        </div>
        </>
    )
}