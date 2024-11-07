import React from "react";
import DropdownBasic from "@/shared/v1/dropdownFooter";
import Link from "next/link";
import { APP_VERSION } from "@/constants/v1/constants";

export default function FooterBottem({lang} : any) {
  return (
      <footer className="w-full text-secondaryItemColor">
        <div className="border-t border-primaryfooterBgColor bg-primaryfooterBgColor py-4 text-sm">
          <div className="mx-auto pl-2 pr-2">
            <div>
              <div className="mt-[-0.7rem]">
                <p className="text-[0.65rem] max-sm:text-[0.5rem] text-secondaryItemColor select-none">
                  © {new Date().getFullYear()} ORI MI Entertainment Inc.{lang?.All_rights_reserved}
                </p>
              </div>
              
              <nav
                className="col-span-2 md:col-span-4 lg:col-span-4 text-primaryColor flex justify-start md:justify-betweenn sm:justify-between lg:justify-between gap-10 max-sm:block"
                aria-labelledby="subfooter-links-5-logo-sub"
              >
              <div className="mt-4 max-md:mt-0 max-sm:mt-0 items-center">
                <ul
                  className="flex flex-wrap items-center gap-2 sm:gap-8 md:gap-8 lg:gap-10 w-full
                justify-start sm:justify-end md:justify-end lg:justify-end max-sm:flex max-sm:justify-between  footer-fix"
                >
                  <li className="leading-6">
                    <Link href="/termsofuse" className="transition-colors duration-300 text-secondaryItemColor slow-underline max-md:text-xs max-sm:text-[0.5rem]">{lang?.terms_of_use}</Link>
                  </li>
                  <li className="leading-6">
                  <Link href="/privacypolicy" className="transition-colors duration-300 text-secondaryItemColor slow-underline max-md:text-xs max-sm:text-[0.5rem]">{lang?.privacy_policy}</Link>
                  </li>
                  <li className="leading-6">
                  <Link href="/faq" className="transition-colors duration-300 text-secondaryItemColor slow-underline  max-md:text-xs max-sm:text-[0.5rem]">{lang?.help_faq}</Link>
                  </li>
                </ul>
                </div>
                <ul className="sm:flex md:flex lg:flex  gap-6 mx-4 items-center justify-end col-span-2 max-sm:flex max-sm:flex-row max-sm:justify-start max-sm:p-2">
                  <li className="select-none text-secondaryItemColor hover:text-primaryColor">{lang?.language}</li>
                  <li className="">
                    <DropdownBasic lang={lang}/>
                  </li>
                  <li className="text-[0.7rem] text-secondaryItemColor">{APP_VERSION}</li>
                </ul>
              </nav>
            </div>
          </div>
        </div>
      </footer>
  );
}
