"use client"

import { getDictionary } from '@/i18n/dictionaries';
import { actGetCurrentLanguage } from '@/utils/accessCurrentLang';
import React, { useState, useEffect } from 'react';

export default function TermsOfSection() {
  const [dataset, setDataset] = useState('');
  const [lang, setLang] = useState<any>(null);

  useEffect(() => {
    window.scrollTo(0, 0);

    // Fetch terms of use content
    actGetCurrentLanguage().then((langSelected) => {
      getDictionary(langSelected).then((language: any) => {
        setLang(language);        
      fetch(`https://static-templates.web.app/orimedia/${langSelected}/termsofuse.html`)
      .then((res) => res.text())
      .then((result) => setDataset(result));
      }, []);
      })
    })
  
  return (
    <div>
      <div className="text-center">
        <u className="text-secondaryItemColor">Terms of Use</u>
      </div>
      <div dangerouslySetInnerHTML={{ __html: dataset }} />
    </div>
  );
}
