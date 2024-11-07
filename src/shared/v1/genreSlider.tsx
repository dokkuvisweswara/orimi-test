import Image from 'next/image';
import { getPoster } from '@/utils/content';

interface SectionData {
    genereid: string;
    posterurl: string;
}

interface HeaderData {
    sectionData: SectionData[];
}

interface Props {
    headerData: HeaderData;
}

export default function GenreSlider(props: Props) {
    return (
        <div className="flex hover:cursor-pointer justify-between gap-4">
            {props.headerData.sectionData.map((item: SectionData, index: number) => (
                <div key={index} className="flex gap-2 items-center">
                    {/* Image */}
                    <div className="relative">
                        <Image
                            className="rounded-sm group-hover:brightness-50"
                            width={60}
                            height={60}
                            priority
                            src={item.posterurl}
                            alt={''}
                        />
                        <div className='hidden group-hover:inline-block absolute bottom-2 right-5'>
                            <svg width="16" height="22" viewBox="0 0 24 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M23.3222 12.7952C24.2259 13.3305 24.2259 14.6686 23.3222 15.2038L2.03354 27.8111C1.12975 28.3464 0 27.6773 0 26.6069V1.39217C0 0.3217 1.12974 -0.347348 2.03354 0.187889L23.3222 12.7952Z" fill="white"/>
                            </svg>
                        </div>
                    </div>
                    {/* Title */}
                    <div className="text-xs flex flex-col justify-center overflow-hidden">
                        <p className="text-primarynavFont font-bold text-primaryItemColor group-hover:text-selectedBGPrimaryColor text-primaryColor whitespace-no-wrap overflow-ellipsis">
                            {item.genereid}
                        </p>
                    </div>
                </div>
            ))}
            {/* Navigation Icons */}
            <div className={`hidden items-center justify-center mx-2 text-sm font-medium text-skeletonColor dark:text-gray-300 max-lg:inline-flex group-hover:flex ml-auto`}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M11 13H6C5.71667 13 5.47917 12.9042 5.2875 12.7125C5.09583 12.5208 5 12.2833 5 12C5 11.7167 5.09583 11.4792 5.2875 11.2875C5.47917 11.0958 5.71667 11 6 11H11V6C11 5.71667 11.0958 5.47917 11.2875 5.2875C11.4792 5.09583 11.7167 5 12 5C12.2833 5 12.5208 5.09583 12.7125 5.2875C12.9042 5.47917 13 5.71667 13 6V11H18C18.2833 11 18.5208 11.0958 18.7125 11.2875C18.9042 11.4792 19 11.7167 19 12C19 12.2833 18.9042 12.5208 18.7125 12.7125C18.5208 12.9042 18.2833 13 18 13H13V18C13 18.2833 12.9042 18.5208 12.7125 18.7125C12.5208 18.9042 12.2833 19 12 19C11.7167 19 11.4792 18.9042 11.2875 18.7125C11.0958 18.5208 11 18.2833 11 18V13Z" fill="white" fillOpacity="0.9"/>
                </svg>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M20 12C20 12.55 19.8042 13.0208 19.4125 13.4125C19.0208 13.8042 18.55 14 18 14C17.45 14 16.9792 13.8042 16.5875 13.4125C16.1958 13.0208 16 12.55 16 12C16 11.45 16.1958 10.9792 16.5875 10.5875C16.9792 10.1958 17.45 10 18 10C18.55 10 19.0208 10.1958 19.4125 10.5875C19.8042 10.9792 20 11.45 20 12ZM14 12C14 12.55 13.8042 13.0208 13.4125 13.4125C13.0208 13.8042 12.55 14 12 14C11.45 14 10.9792 13.8042 10.5875 13.4125C10.1958 13.0208 10 12.55 10 12C10 11.45 10.1958 10.9792 10.5875 10.5875C10.9792 10.1958 11.45 10 12 10C12.55 10 13.0208 10.1958 13.4125 10.5875C13.8042 10.9792 14 11.45 14 12ZM8 12C8 12.55 7.80417 13.0208 7.4125 13.4125C7.02083 13.8042 6.55 14 6 14C5.45 14 4.97917 13.8042 4.5875 13.4125C4.19583 13.0208 4 12.55 4 12C4 11.45 4.19583 10.9792 4.5875 10.5875C4.97917 10.1958 5.45 10 6 10C6.55 10 7.02083 10.1958 7.4125 10.5875C7.80417 10.9792 8 11.45 8 12Z" fill="white"/>
                </svg>
            </div>
        </div>
    );
}
