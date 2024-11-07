"use client"
import React, { useState, useEffect } from 'react';
import { getDictionary } from '@/i18n/dictionaries';
import { actGetCurrentLanguage } from "@/utils/accessCurrentLang";

export default function PrivacySection() {
  const [dataset, setDataset] = useState('');
  const [lang, setLang] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        window.scrollTo(0, 0);

        // Get the current language
        let langSelected = await actGetCurrentLanguage();
  

        // Get dictionary based on the current language
        const lang:any = await getDictionary(langSelected);
        setLang(lang);

        // Fetch terms of use content
        const result = await fetch('https://static-templates.web.app/orimedia/mn/privacypolicy.html');
        const textResult = await result.text();

        setDataset(textResult);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []); // Empty dependency array means this effect will only run once after the initial render

  return (
    <div>
      <div className="text-center">
        <u className="text-secondaryItemColor">{lang?.privacy_policy}</u>
      </div>
      <div dangerouslySetInnerHTML={{ __html: dataset }} />
    </div>
  );
}
