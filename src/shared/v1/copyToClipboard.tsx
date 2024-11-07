'use client'

import { useState } from 'react';

const CopyToClipboard = ({ text }: any) => {
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setIsCopied(true);

      // Reset the "Copied" state after a certain time (e.g., 2 seconds)
      setTimeout(() => {
        setIsCopied(false);
      }, 2000);
    } catch (err) {
      console.error('Unable to copy to clipboard', err);
    }
  };

  return (
    <div>
      <button onClick={handleCopy} className='inline-block px-3 pt-1 pb-[0.4rem] bg-[#232323] rounded'>
        {isCopied ? 'Copied!' : 'Copy'}
      </button>
    </div>
  );
};

export default CopyToClipboard;