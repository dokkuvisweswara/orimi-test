export default function Description({description}:any) {
    return (
        <>
            <article>
               {description && <p className=" text-[0.9rem] p-2 text-secondaryItemColor">{description}
                    {/* <a href="#" className="text-primaryColor no-underline text-1.5xl mx-1 w-6 h-6">...Show more</a> */}
               </p>}
            </article>
        </>
    )
}