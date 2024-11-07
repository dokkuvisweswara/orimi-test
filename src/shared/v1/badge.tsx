export default function Badge({whereIamFrom, cta, lang}: any) {
    
    return (
        <>
       {cta ? <span className={`inline-flex items-center rounded-sm bg-loginSecondaryBgColor  ${whereIamFrom == 'vertical' ? 'text-[0.65rem] px-2 py-1' : 'text-[0.65rem] px-[0.2rem] py-[0.08rem]'} font-medium text-primaryItemColor ring-1 ring-inset ring-BadgeringColor`}>
             {lang && lang[cta] ? lang[cta] : cta}
        </span>: ''}
        </>
    )
 }