import EmptyDiv from "../emptyDiv";

export default function SideBarNavBarSkeleton() {
    return(
        <section>
            <div className='relative'>
                <div className='fixed'>
                    <div className=" w-[13rem] px-2 py-4 bg-skeletonColor rounded-lg text-skeletonColor dark:bg-skeletonColor h-full overflow-y-auto scrollbar-thin custom-scrollbar">
                        <div id="menuList">
                            <ul className="space-y-2 mt-2 mb-[1.5rem]">
                                <li id="newPlayList" className="flex items-center justify-center"></li>
                                <li><button className="flex items-center p-2 bg-selectedBGSecondaryColor rounded-lg w-full h-12"></button></li>
                                <li><button className="flex items-center p-2 bg-selectedBGSecondaryColor rounded-lg w-full h-12"></button></li>
                                <hr className="h-px my-8 bg-selectedBGSecondaryColor border-0"></hr>
                                <li><button className="flex items-center p-2 bg-selectedBGSecondaryColor rounded-lg w-full h-12"></button></li>
                                <li><button className="flex items-center p-2 bg-selectedBGSecondaryColor rounded-lg w-full h-12"></button></li>
                                <li><button className="flex items-center p-2 bg-selectedBGSecondaryColor rounded-lg w-full h-12"></button></li>
                                <hr className="h-px my-8 bg-selectedBGSecondaryColor border-0"></hr>
                            </ul>
                        </div>
                        <div id="playList">
                            <ul className="space-y-2 mt-4 mb-[1.5rem]">
                                <li id="newPlayList" className="flex items-center justify-center"></li>
                                <li><button className="flex items-center p-2 rounded-full bg-selectedBGSecondaryColor dark:hover:bg-selectedBGSecondaryColor group w-full h-12"></button></li>
                                <li><button className=" mt-4 flex items-center p-2 rounded-lg bg-selectedBGSecondaryColor dark:hover:bg-selectedBGSecondaryColor group w-full h-12"></button></li>
                                <li><button className="flex items-center p-2 rounded-lg bg-selectedBGSecondaryColor dark:hover:bg-selectedBGSecondaryColor group w-full h-12"></button></li>
                                <li><button className="flex items-center p-2 rounded-lg bg-selectedBGSecondaryColor dark:hover:bg-selectedBGSecondaryColor group w-full h-12"></button></li>
                                <li><button className="flex items-center p-2 rounded-lg bg-selectedBGSecondaryColor dark:hover:bg-selectedBGSecondaryColor group w-full h-12"></button></li>
                                <li><button className="flex items-center p-2 rounded-lg bg-selectedBGSecondaryColor dark:hover:bg-selectedBGSecondaryColor group w-full h-12"></button></li>
                            </ul>
                        </div>
                        <EmptyDiv></EmptyDiv>
                    </div>
                </div>
            </div>
        </section>
    );
};
