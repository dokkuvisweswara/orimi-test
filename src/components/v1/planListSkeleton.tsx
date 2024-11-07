export default function PlanSkeletonCard() {
    return (
      <>         
        <div className="flex flex-wrap justify-between my-auto gap-2">
          <div role="status" className="animate-pulse rtl:space-y-reverse hidden sm:block md:block lg:block">
            <div className="flex items-center justify-center w-[90vw] sm:w-[45vw] md:w-[45vw] lg:w-[20vw] h-[30vh] sm:h-[30vh] md:h-[35vh] lg:h-[50vh] bg-skeletonColor rounded dark:bg-detailsbordercolor">          
            </div>       
          </div>
          <div role="status" className="animate-pulse rtl:space-y-reverse">
            <div className="flex items-center justify-center w-[90vw] sm:w-[45vw] md:w-[45vw] lg:w-[20vw] h-[30vh] sm:h-[30vh] md:h-[35vh] lg:h-[50vh] bg-skeletonColor rounded dark:bg-detailsbordercolor">          
            </div>                  
          </div>
          <div role="status" className="animate-pulse rtl:space-y-reverse">
            <div className="flex items-center justify-center w-[90vw] sm:w-[45vw] md:w-[45vw] lg:w-[20vw] h-[30vh] sm:h-[30vh] md:h-[35vh] lg:h-[50vh] bg-skeletonColor rounded dark:bg-detailsbordercolor">          
            </div>                    
          </div>        
        </div> 
      </>
    );
  }