'use client'
import React, { useEffect } from "react";
import Image from "next/image";
import Logo from "../../../public/oriMiLogo.svg";
import GoolePlay from "../../../public/google-paly.svg";
import Apple from "../../../public/apple-store.svg";
// import { HookIntersectionObserver } from "@/hooks/Intersection-observer";
import { SOCIAL_LINK , APP_LINK } from "@/constants/v1/constants";

export default  function FooterTop({ config, lang }: any) {

    // useEffect(() => {
    //   HookIntersectionObserver(document.getElementById('footer-top-section'), 'animate');
    // }, [])
     

  return (
    <>
      <footer className="w-full" id="footer-top-section">
        <div className="w-full bg-[#0A0B0B] border-gray-200 dark:bg-[#0A0B0B] dark:border-detailsbordercolor bg-secondaryBgColor">
          <div className="mx-1 px-2 sm:px-4 md:px-10 lg:px-10 py-6">
            <div className="grid grid-cols-4 md:grid-cols-12 lg:grid-cols-12">
              <nav className="col-span-4" aria-labelledby="footer-docs-5-logo">
                <Image
                  src={Logo}
                  alt="Logo"
                  className=""
                  width={210}
                  height={180}
                  loading="lazy"
                />
                <p className="w-full my-2 sm:my-0 md:py-0 lg:py-4 select-none sm:min-w-2 md:w-10/12 lg:w-11/12 text-slate-400 text-sm">
                  {lang?.Footer_About}
                </p>
              </nav>
              <nav className="col-span-4 ml-10 max-md:ml-0 max-sm:ml-0 max-lg:ml-0 max-xl:ml-5" aria-labelledby="footer-docs-5-logo">
                <h3
                  className="mb-1 text-primaryItemColor font-bold text-base select-none"
                  id="footer-docs-5-logo"
                >
                  {lang?.OUR_MOBILE_APPS}
                </h3>
                <p className="my-2 select-none text-slate-400 text-xs w-full md:w-11/12">
                  {lang?.Find_me_on}
                </p>
                <ul className=" w-10/12 grid grid-cols-2 gap-2 my-3">
                  <li className="">
                    <a href={APP_LINK.android} target="_blank" className="">
                      <Image
                        src={GoolePlay}
                        alt="Goole Play"
                        className="bg-footerbordercolor rounded-md hover:opacity-60"
                        loading="lazy"

                      />
                    </a>
                  </li>
                  <li className="">
                    <a href={APP_LINK.ios} target="_blank" className="">
                      <Image
                        src={Apple}
                        alt="Apple Play"
                        className="bg-footerbordercolor rounded-md hover:opacity-60"
                        loading="lazy"
                      />
                    </a>
                  </li>
                </ul>
              </nav>
              <nav
                className="col-span-4 my-2 ml-32 max-md:ml-0 max-sm:ml-0 max-lg:ml-2 max-lg:mr-5 max-xl-s:ml-14 sm:my-0 md:my-0 lg:my-0"
                aria-labelledby="footer-docs-5-logo"
              >
                <h3
                  className="mb-1 text-primaryItemColor font-bold text-base select-none"
                  id="footer-docs-5-logo"
                >
                  {lang?.Support}
                </h3>
                <p className="my-2 select-none w-full text-secondaryItemColor text-xs">
                  {
                    lang?.Contact_me_at
                  }
                </p>
                <ul className="text-secondaryItemColor text-xs">
                  <li className="leading-6 flex gap-2 my-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      version="1.1"
                      xmlnsXlink="http://www.w3.org/1999/xlink"
                      width="20"
                      height="20"
                      x="0"
                      y="0"
                      viewBox="0 0 513.64 513.64"
                      xmlSpace="preserve"
                      className=""
                    >
                      <g>
                        <path
                          d="m499.66 376.96-71.68-71.68c-25.6-25.6-69.12-15.359-79.36 17.92-7.68 23.041-33.28 35.841-56.32 30.72-51.2-12.8-120.32-79.36-133.12-133.12-7.68-23.041 7.68-48.641 30.72-56.32 33.28-10.24 43.52-53.76 17.92-79.36l-71.68-71.68c-20.48-17.92-51.2-17.92-69.12 0L18.38 62.08c-48.64 51.2 5.12 186.88 125.44 307.2s256 176.641 307.2 125.44l48.64-48.64c17.921-20.48 17.921-51.2 0-69.12z"
                          fill="purple"
                          opacity="1"
                          data-original="#000000"
                          className=""
                        />
                      </g>
                    </svg>
                    <p className="select-none">+976 77770022</p>
                  </li>
                  <li className="leading-6 flex gap-2 my-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      version="1.1"
                      xmlnsXlink="http://www.w3.org/1999/xlink"
                      width="20"
                      height="20"
                      x="0"
                      y="0"
                      viewBox="0 0 24 24"
                      xmlSpace="preserve"
                      className=""
                    >
                      <g>
                        <path
                          d="M8.75 17.612v4.638a.751.751 0 0 0 1.354.444l2.713-3.692zM23.685.139a.75.75 0 0 0-.782-.054l-22.5 11.75a.752.752 0 0 0 .104 1.375l6.255 2.138 13.321-11.39L9.775 16.377l10.483 3.583a.753.753 0 0 0 .984-.599l2.75-18.5a.751.751 0 0 0-.307-.722z"
                          fill="purple"
                          opacity="1"
                          data-original="#000000"
                          className=""
                        />
                      </g>
                    </svg>
                    <p>
                      <a href="mailto:info@orimedia.mn">info@orimedia.mn</a>
                    </p>
                  </li>
                </ul>
                <ul
                  className="flex justify-center sm:justify-center md:justify-normal lg:justify-normal py-1
                 gap-5 items-center "
                >
                  <li className="">
                    <a href={SOCIAL_LINK.facebook} target="_blank" className="">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 48 48"
                        width="45px"
                        height="45px"
                        className="cursor-pointer hover:bg-blue-600 rounded-full p-1.5"
                        fill="white"
                      >
                        <path d="M27.689453,2.0371094C24.410243,2.0371094,21.627143,3.0524604,19.751953,5.0898438C17.876763,7.1272271,16.998047,10.032839,16.998047,13.5L16.998047,17L13.517578,17C11.589931,17,9.9985023,18.604801,10.017578,20.533203L10.046875,23.537109A1.50015,1.50015,0,0,0,10.046875,23.539062C10.069385,25.440659,11.647206,27.005642,13.550781,27.003906L17,27.001953L17,43.5C17,45.414955,18.585045,47,20.5,47L24.5,47C26.414955,47,28,45.414955,28,43.5L28,27L31.095703,27C32.859472,27,34.367374,25.656297,34.572266,23.904297L34.921875,20.904297C35.160419,18.850746,33.513658,17,31.445312,17L28.019531,17L28.0625,13.712891A1.50015,1.50015,0,0,0,28.0625,13.693359C28.0625,13.00752,28.583692,12.486328,29.269531,12.486328L32.177734,12.486328C33.735895,12.486328,35.03125,11.190973,35.03125,9.6328125L35.03125,5.0625C35.03125,3.596878,33.891093,2.3503008,32.433594,2.21875A1.50015,1.50015,0,0,0,32.429688,2.21875C32.145313,2.1938679,30.177903,2.0371094,27.689453,2.0371094zM27.689453,5.0371094C29.967263,5.0371094,32.01319,5.2007464,32.03125,5.2011719L32.03125,9.4863281L29.269531,9.4863281C26.963371,9.4863281,25.0625,11.387199,25.0625,13.693359L25,18.480469A1.50015,1.50015,0,0,0,26.5,20L31.445312,20C31.770968,20,31.978863,20.236144,31.941406,20.558594L31.59375,23.556641C31.562642,23.82264,31.361935,24,31.095703,24L26.5,24A1.50015,1.50015,0,0,0,25,25.5L25,43.5C25,43.795045,24.795045,44,24.5,44L20.5,44C20.204955,44,20,43.795045,20,43.5L20,25.5A1.50015,1.50015,0,0,0,18.5,24L13.548828,24.003906A1.50015,1.50015,0,0,0,13.546875,24.003906C13.257582,24.00417,13.051932,23.798417,13.046875,23.505859L13.017578,20.503906C13.014704,20.208314,13.221226,20,13.517578,20L18.498047,20A1.50015,1.50015,0,0,0,19.998047,18.5L19.998047,13.5C19.998047,10.534161,20.731877,8.4584135,21.960938,7.1230469C23.189996,5.7876802,25.001663,5.0371094,27.689453,5.0371094z" />
                      </svg>
                    </a>
                  </li>
                  <li className="ml[-10]">
                    <a href={SOCIAL_LINK.instagram}  target="_blank" className="">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 48 48"
                        width="46px"
                        height="46px"
                        className="cursor-pointer hover:bg-white rounded-full p-1"
                      >
                        <radialGradient
                          id="yOrnnhliCrdS2gy~4tD8ma"
                          cx="19.38"
                          cy="42.035"
                          r="44.899"
                          gradientUnits="userSpaceOnUse"
                        >
                          <stop offset="0" stopColor="#fd5" />
                          <stop offset=".328" stopColor="#ff543f" />
                          <stop offset=".348" stopColor="#fc5245" />
                          <stop offset=".504" stopColor="#e64771" />
                          <stop offset=".643" stopColor="#d53e91" />
                          <stop offset=".761" stopColor="#cc39a4" />
                          <stop offset=".841" stopColor="#c837ab" />
                        </radialGradient>
                        <path
                          fill="url(#yOrnnhliCrdS2gy~4tD8ma)"
                          d="M34.017,41.99l-20,0.019c-4.4,0.004-8.003-3.592-8.008-7.992l-0.019-20	c-0.004-4.4,3.592-8.003,7.992-8.008l20-0.019c4.4-0.004,8.003,3.592,8.008,7.992l0.019,20	C42.014,38.383,38.417,41.986,34.017,41.99z"
                        />
                        <radialGradient
                          id="yOrnnhliCrdS2gy~4tD8mb"
                          cx="11.786"
                          cy="5.54"
                          r="29.813"
                          gradientTransform="matrix(1 0 0 .6663 0 1.849)"
                          gradientUnits="userSpaceOnUse"
                        >
                          <stop offset="0" stopColor="#4168c9" />
                          <stop
                            offset=".999"
                            stopColor="#4168c9"
                            stopOpacity="0"
                          />
                        </radialGradient>
                        <path
                          fill="url(#yOrnnhliCrdS2gy~4tD8mb)"
                          d="M34.017,41.99l-20,0.019c-4.4,0.004-8.003-3.592-8.008-7.992l-0.019-20	c-0.004-4.4,3.592-8.003,7.992-8.008l20-0.019c4.4-0.004,8.003,3.592,8.008,7.992l0.019,20	C42.014,38.383,38.417,41.986,34.017,41.99z"
                        />
                        <path
                          fill="#fff"
                          d="M24,31c-3.859,0-7-3.14-7-7s3.141-7,7-7s7,3.14,7,7S27.859,31,24,31z M24,19c-2.757,0-5,2.243-5,5	s2.243,5,5,5s5-2.243,5-5S26.757,19,24,19z"
                        />
                        <circle cx="31.5" cy="16.5" r="1.5" fill="#fff" />
                        <path
                          fill="#fff"
                          d="M30,37H18c-3.859,0-7-3.14-7-7V18c0-3.86,3.141-7,7-7h12c3.859,0,7,3.14,7,7v12	C37,33.86,33.859,37,30,37z M18,13c-2.757,0-5,2.243-5,5v12c0,2.757,2.243,5,5,5h12c2.757,0,5-2.243,5-5V18c0-2.757-2.243-5-5-5H18z"
                        />
                      </svg>
                    </a>
                  </li>
                  <li className="">
                    <a href={SOCIAL_LINK.youtube}  target="_blank" className="">
                      {/* <Image
                        src={Youtube}
                        alt="Youtube"
                        className="cursor-pointer"
                        width={40}
                        height={40}
                        priority
                      /> */}
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 48 48"
                        width="45px"
                        height="45px"
                        className="cursor-pointer hover:bg-primaryColor rounded-full p-1"
                      >
                        <linearGradient
                          id="PgB_UHa29h0TpFV_moJI9a"
                          x1="9.816"
                          x2="41.246"
                          y1="9.871"
                          y2="41.301"
                          gradientUnits="userSpaceOnUse"
                        >
                          <stop offset="0" stop-color="#f44f5a" />
                          <stop offset=".443" stop-color="#ee3d4a" />
                          <stop offset="1" stop-color="#e52030" />
                        </linearGradient>
                        <path
                          fill="url(#PgB_UHa29h0TpFV_moJI9a)"
                          d="M45.012,34.56c-0.439,2.24-2.304,3.947-4.608,4.267C36.783,39.36,30.748,40,23.945,40	c-6.693,0-12.728-0.64-16.459-1.173c-2.304-0.32-4.17-2.027-4.608-4.267C2.439,32.107,2,28.48,2,24s0.439-8.107,0.878-10.56	c0.439-2.24,2.304-3.947,4.608-4.267C11.107,8.64,17.142,8,23.945,8s12.728,0.64,16.459,1.173c2.304,0.32,4.17,2.027,4.608,4.267	C45.451,15.893,46,19.52,46,24C45.89,28.48,45.451,32.107,45.012,34.56z"
                        />
                        <path
                          d="M32.352,22.44l-11.436-7.624c-0.577-0.385-1.314-0.421-1.925-0.093C18.38,15.05,18,15.683,18,16.376	v15.248c0,0.693,0.38,1.327,0.991,1.654c0.278,0.149,0.581,0.222,0.884,0.222c0.364,0,0.726-0.106,1.04-0.315l11.436-7.624	c0.523-0.349,0.835-0.932,0.835-1.56C33.187,23.372,32.874,22.789,32.352,22.44z"
                          opacity=".05"
                        />
                        <path
                          d="M20.681,15.237l10.79,7.194c0.689,0.495,1.153,0.938,1.153,1.513c0,0.575-0.224,0.976-0.715,1.334	c-0.371,0.27-11.045,7.364-11.045,7.364c-0.901,0.604-2.364,0.476-2.364-1.499V16.744C18.5,14.739,20.084,14.839,20.681,15.237z"
                          opacity=".07"
                        />
                        <path
                          fill="#fff"
                          d="M19,31.568V16.433c0-0.743,0.828-1.187,1.447-0.774l11.352,7.568c0.553,0.368,0.553,1.18,0,1.549	l-11.352,7.568C19.828,32.755,19,32.312,19,31.568z"
                        />
                      </svg>
                    </a>
                  </li>
                  <li className="">
                    <a href={SOCIAL_LINK.twitter}  target="_blank" className="">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 50 50"
                        width="40px"
                        height="40px"
                        fill="white"
                        className="cursor-pointer hover:bg-primaryBgColor rounded-lg p-1"
                      >
                        <path d="M 5.9199219 6 L 20.582031 27.375 L 6.2304688 44 L 9.4101562 44 L 21.986328 29.421875 L 31.986328 44 L 44 44 L 28.681641 21.669922 L 42.199219 6 L 39.029297 6 L 27.275391 19.617188 L 17.933594 6 L 5.9199219 6 z M 9.7167969 8 L 16.880859 8 L 40.203125 42 L 33.039062 42 L 9.7167969 8 z" />
                      </svg>
                    </a>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
