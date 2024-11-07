import React from 'react';

const ThreeDotLoading = () => {
  return (
    <div className="flex justify-center items-center mt-8">
      <div className="flex space-x-2">
        <div className="w-4 h-4 bg-dotsLoaderBgColor rounded-full animate-bounce"></div>
        <div className="w-4 h-4 bg-dotsLoaderBgColor rounded-full animate-bounce"></div>
        <div className="w-4 h-4 bg-dotsLoaderBgColor rounded-full animate-bounce"></div>
      </div>
    </div>
  );
};

export default ThreeDotLoading;
