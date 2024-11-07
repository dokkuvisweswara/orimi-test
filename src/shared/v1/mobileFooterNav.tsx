import Link from "next/link";

export default function MobileFooterNav() {
  return (
    <section>
      <div className="h-full overflow-y-auto rounded-sm text-primaryColor">
        <div className="category-list">
          <ul className="space-y-2 font-medium flex items-center bg-selectedBGSecondaryColor justify-between ">
            <li key={"Home"}>
              <Link
                href="/"
                className="flex flex-col items-center p-1 ml-2 rounded-lg dark:text-primaryColor bg-selectedBGSecondaryColor hover:bg-selectedBGSecondaryColor dark:hover:bg-selectedBGSecondaryColor group max-xs:flex-col"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="28"
                  height="28"
                  viewBox="0 0 32 32"
                  fill="none"
                  className="mt-[0.55rem]"
            
                >
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M16 32C24.8366 32 32 24.8366 32 16C32 7.16344 24.8366 0 16 0C7.16344 0 0 7.16344 0 16C0 24.8366 7.16344 32 16 32Z"
                    fill="#C0C0C0"
                  />
                  <path
                    d="M9.5 24C9.0875 24 8.73438 23.8583 8.44063 23.575C8.14688 23.2917 8 22.9511 8 22.5532V13.1489C8 12.9199 8.05312 12.7028 8.15937 12.4979C8.26562 12.2929 8.4125 12.1241 8.6 11.9915L15.1 7.28936C15.2382 7.19291 15.3828 7.12057 15.5336 7.07234C15.6844 7.02411 15.8415 7 16.0049 7C16.1683 7 16.3243 7.02411 16.4728 7.07234C16.6214 7.12057 16.7638 7.19291 16.9 7.28936L23.4 11.9915C23.5875 12.1241 23.7344 12.2929 23.8406 12.4979C23.9469 12.7028 24 12.9199 24 13.1489V22.5532C24 22.9511 23.8531 23.2917 23.5594 23.575C23.2656 23.8583 22.9125 24 22.5 24H17.25V17.9716H14.75V24H9.5Z"
                    fill="#222222"
                  />
                </svg>
                <span className="m-auto  text-base ml-1 ">Home</span>
              </Link>
            </li>
            <li key={"Discover"}>
              <Link
                href="/search"
                className="flex flex-col items-center p-1  rounded-lg dark:text-primaryColor bg-selectedBGSecondaryColor hover:bg-selectedBGSecondaryColor dark:hover:bg-selectedBGSecondaryColor group max-xs:flex-col"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="28"
                  height="28"
                  viewBox="0 0 32 32"
                  fill="none"
                >
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M16 32C24.8366 32 32 24.8366 32 16C32 7.16341 24.8366 0 16 0C7.16344 0 0 7.16341 0 16C0 24.8366 7.16344 32 16 32Z"
                    fill="#C0C0C0"
                  />
                  <path
                    d="M13.2873 19.5747C11.5301 19.5747 10.0429 18.9661 8.82575 17.7489C7.60858 16.5318 7 15.0446 7 13.2873C7 11.5301 7.60858 10.0429 8.82575 8.82575C10.0429 7.60858 11.5301 7 13.2873 7C15.0446 7 16.5318 7.60858 17.7489 8.82575C18.9661 10.0429 19.5747 11.5301 19.5747 13.2873C19.5747 13.9967 19.4618 14.6657 19.2361 15.2945C19.0104 15.9232 18.7041 16.4794 18.3172 16.963L23.734 22.3798C23.9113 22.5571 24 22.7828 24 23.0569C24 23.331 23.9113 23.5567 23.734 23.734C23.5567 23.9113 23.331 24 23.0569 24C22.7828 24 22.5571 23.9113 22.3798 23.734L16.963 18.3172C16.4794 18.7041 15.9232 19.0104 15.2945 19.2361C14.6657 19.4618 13.9967 19.5747 13.2873 19.5747ZM13.2873 17.6401C14.4964 17.6401 15.5242 17.2169 16.3706 16.3706C17.2169 15.5242 17.6401 14.4964 17.6401 13.2873C17.6401 12.0782 17.2169 11.0505 16.3706 10.2041C15.5242 9.35775 14.4964 8.93457 13.2873 8.93457C12.0782 8.93457 11.0505 9.35775 10.2041 10.2041C9.35775 11.0505 8.93457 12.0782 8.93457 13.2873C8.93457 14.4964 9.35775 15.5242 10.2041 16.3706C11.0505 17.2169 12.0782 17.6401 13.2873 17.6401Z"
                    fill="#222222"
                  />
                </svg>
                <span className="m-auto text-base ">Discover</span>
              </Link>
            </li>
            <li key={"Library"}>
              <Link
                href="/library"
                className="flex flex-col items-center p-1 mr-2 rounded-lg dark:text-primaryColor bg-selectedBGSecondaryColor hover:bg-selectedBGSecondaryColor dark:hover:bg-selectedBGSecondaryColor group max-xs:flex-col"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="28"
                  height="28"
                  viewBox="0 0 32 32"
                  fill="none"
                >
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M16 32C24.8366 32 32 24.8366 32 16C32 7.16341 24.8366 0 16 0C7.16344 0 0 7.16341 0 16C0 24.8366 7.16344 32 16 32Z"
                    fill="#C0C0C0"
                  />
                  <path
                    d="M9.77778 7H11.7222C12.1518 7 12.5 7.36244 12.5 7.80952V23.1905C12.5 23.6376 12.1518 24 11.7222 24H9.77778C9.34822 24 9 23.6376 9 23.1905V7.80952C9 7.36244 9.34822 7 9.77778 7Z"
                    fill="#222222"
                  />
                  <path
                    d="M14.2778 7H16.2222C16.6518 7 17 7.36244 17 7.80952V23.1905C17 23.6376 16.6518 24 16.2222 24H14.2778C13.8482 24 13.5 23.6376 13.5 23.1905V7.80952C13.5 7.36244 13.8482 7 14.2778 7Z"
                    fill="#222222"
                  />
                  <path
                    d="M18.611 7.42078L20.513 7.0165C20.9332 6.92719 21.3491 7.20931 21.4421 7.64663L24.64 22.6915C24.7329 23.1288 24.4677 23.5557 24.0475 23.645L22.1455 24.0493C21.7254 24.1386 21.3094 23.8565 21.2164 23.4192L18.0186 8.37432C17.9256 7.937 18.1909 7.51009 18.611 7.42078Z"
                    fill="#222222"
                  />
                </svg>
                <span className="m-auto text-base mr-1">Library</span>
                {/* <span class="inline-flex items-center justify-center px-2 ms-3 text-sm font-medium text-dropdownBgColor bg-gray-100 rounded-full dark:bg-detailsbordercolor dark:text-gray-300">Pro</span> */}
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}
