export default function TicketSkeleton({lang}:any) {
  return (
    <>
    <div role="status" className="max-w-full p-4 border rounded shadow animate-pulse md:p-6 border-detailsbordercolor">
        <div className="flex items-center justify-center mb-2.5">        
            <div className="w-1/2 h-2.5 bg-gray-200 rounded-full dark:bg-detailsbordercolor me-3"></div>
            <div className="w-1/2 h-2 bg-gray-200 rounded-full dark:bg-detailsbordercolor"></div>
        </div>
        <div className="h-2 rounded-full bg-detailsbordercolor mb-2.5"></div>
        <div className="flex items-center justify-center mb-2.5">        
            <div className="w-3/5 h-2.5 bg-gray-200 rounded-full dark:bg-detailsbordercolor me-3"></div>
            <div className="w-2/5 h-2 bg-gray-200 rounded-full dark:bg-detailsbordercolor"></div>
        </div>
        <div className="h-2 rounded-full bg-detailsbordercolor mb-2.5"></div>
        <div className="flex items-center justify-center mb-2.5">        
            <div className="w-2/5 h-2.5 bg-gray-200 rounded-full dark:bg-detailsbordercolor me-3"></div>
            <div className="w-3/5 h-2 bg-gray-200 rounded-full dark:bg-detailsbordercolor"></div>
        </div>        
        <div className="h-2 rounded-full bg-detailsbordercolor"></div>
    </div>
    </>
  );
}
