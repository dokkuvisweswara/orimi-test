export default function Tooltip ({ariaLable, text}:any){
    return(
        <>
            <span role="tooltip" id={ariaLable} className="invisible absolute bottom-full left-1/2 z-10 mb-2 p-1 -translate-x-1/2 rounded bg-slate-700 w-28 items-center text-sm text-primaryColor opacity-0 transition-all before:invisible before:absolute before:left-1/2 before:top-full before:z-10 before:mb-2 before:-ml-2 before:border-x-8 before:border-t-8 before:border-x-transparent before:border-t-slate-700 before:opacity-0 before:transition-all before:content-[''] group-hover:visible group-hover:block group-hover:opacity-100 group-hover:before:visible group-hover:before:opacity-100">{text}</span>

        </>
    )
        
    
}