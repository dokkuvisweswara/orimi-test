'use client'

import FooterBottom from "@/components/v1/footer-bottom";
import FooterTop from "@/components/v1/footer-top";
import { useEffect } from "react";
import { usePathname } from "next/navigation";

export default function FooterUI({config , lang}: any) {

  const pathname = usePathname();

      
  useEffect(() => {
    let removeSideNavTitle = ['/subscribe', '/profile', '/login'];
    let sideNavId: any = document.querySelector('#footer-ui');
    let result = removeSideNavTitle.filter((item) => {
      if (pathname.includes(item)) return item;
    })
    if (sideNavId) {
      if (result.length > 0 || screen.width < 1024) {
        sideNavId.style.marginLeft = '0.2rem';
      } else {
        sideNavId.style.marginLeft = '14rem';
      }
    }
   
  }, [pathname]);

  return (
      <footer id="footer-ui" className=" mt-10 max-md:mb-6">
        <FooterTop config={config} lang={lang}/>
        <FooterBottom lang={lang} />
        <div className="h-[0.5rem]" id="extra-footer-height"></div>
      </footer>      
  )
}