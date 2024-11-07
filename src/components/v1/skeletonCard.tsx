

'use client'

export default function SkeletonCard() {

    const sectionData = [1, 2, 3, 4, 5, 6];
    return (
        <>
            <div role="status" className="space-y-8 animate-pulse md:space-y-0 md:space-x-8 rtl:space-x-reverse sm:flex md:flex md:items-center mt-4 py-3 justify-between">
                <div className="w-48 bg-skeletonColor h-6 rounded-sm dark:bg-detailsbordercolor"></div>
                <div className="w-48 bg-skeletonColor h-6 rounded-sm dark:bg-detailsbordercolor hidden sm:hidden md:block lg:block"></div>
            </div>
            <div className='mt-2 ml-5'>
                <div className="grid grid-cols-6 xs:grid-cols-1  sm:grid-cols-3  md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-6 2xl:grid-cols-6 gap-4 max-sm:grid-cols-3">
                    {sectionData && sectionData.map((item: any, i: number) => {
                        return (
                            <div key={i}>
                                <div role="status" className="animate-pulse rtl:space-x-reverse hidden sm:hidden md:block lg:block">
                                    <div className="flex items-center justify-center w-full h-36 bg-skeletonColor rounded dark:bg-detailsbordercolor">
                                    </div>
                                    <div role="status" className="animate-pulse rtl:space-x-reverse my-1">
                                        <div className="w-full bg-skeletonColor h-6 rounded-sm dark:bg-detailsbordercolor"></div>
                                    </div>
                                </div>
                            </div>
                        )
                    })
                    }
                </div>
            </div>

        </>
    );
}
