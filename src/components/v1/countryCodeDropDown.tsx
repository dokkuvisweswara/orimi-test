import Image from "next/image";
import { useEffect, useState } from "react";
import DownArrow from '../../../public/downArrow.svg'

export default function CountryDropDown({countryCode}:any) {
    // const options = [
    //     { value: "+91", title: "+91", name:"India" },        
    //     { value: "+34", title: "+91", name:"India" },        
    // ];    


    const [isOpen, setIsOpen] = useState(false);
    const [country, setCountry] = useState('+976');
    const [countryCodeList, setCountryCodeList] = useState<any>();
    const [countryCodeCopy, setCountryCodeCopy] = useState<any>();    
     
    const handleSelectChange = (value:any) => {         
        // Perform any other actions based on the selected option
        countryCode(value)
        setCountry(value)
        setIsOpen(false)
    };
    
    useEffect(()=>{
        const data : any =  localStorage.getItem('countryCode')
        setCountryCodeList(JSON.parse(data))   
        setCountryCodeCopy(JSON.parse(data))    
    },[])

    const filterCountry = (e:any)=>{
        // debugger
      let searchText = e.target.value.toLowerCase();
      if (
        searchText === "" ||
        searchText === null ||
        searchText === undefined
      ) {
        setCountryCodeList(countryCodeCopy)
        return;
      }

      let arr = [];
      arr = countryCodeList?.filter((element:any) => {
        return (
          element.name.toLowerCase().includes(searchText) ||
          element.dial_code.toLowerCase().includes(searchText)
        );
      });
      setCountryCodeList(arr)
    }
    
      return (
        <>
            <div className="">
                <div className="focus:outline-none py-2 px-2 text-slate-100 cursor-pointer text-sm flex" onClick={()=> setIsOpen(!isOpen)}>
                    <p className="mr-[0.3rem]">{country}</p> <Image src={DownArrow} alt="Success Image" width={10} height={10} className={`transition-transform duration-500 ${isOpen ? 'rotate-180' : ''}`}/>
                </div>
                {
                    isOpen && 
                    <div className="absolute w-full bg-[#151617]">                                     
                        <input type="text" className="w-full bg-primaryBgColor text-sm transition-all outline-none py-2 px-2" placeholder="search country" onChange={filterCountry} />
                            <div className={`max-h-[20vh] mt-2 modal-content overflow-y-scroll`}>
                                {
                                    countryCodeList && countryCodeList?.map((item:any,i:any)=>{
                                        return <div key={i} className="flex justify-between p-1 text-xs cursor-pointer" 
                                                onClick={(e)=>handleSelectChange(item.dial_code)}>
                                                    <span>{item.dial_code}</span>
                                                    <span>{item.name}</span>
                                                </div>                     
                                    })
                                }
                            </div>                
                    </div>
                }
            </div>
        </>
      );
}
