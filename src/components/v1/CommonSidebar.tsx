'use client'
import React, { useEffect, useState } from 'react';
import SideNavBar from '@/components/v1/sideNavBar';


const CommonSidebar = (props: any) => {
  return (
    <aside id="separator-sidebar" className="w-52 max-lg:!hidden" aria-label="Sidebar">
      {<SideNavBar config={props.config} deckingconfig={props.deckingconfig} lang={props.lang}></SideNavBar>}
    </aside>
  );
};

export default CommonSidebar;

