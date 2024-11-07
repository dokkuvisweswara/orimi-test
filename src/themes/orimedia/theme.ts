export const Theme = {
  extend: {
    backgroundImage: {
      'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      'gradient-conic':
      'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      'tranparentPlayBtnColor': "linear-gradient(50deg, rgba(255, 255, 255, 0.4) 12%, rgba(255, 255, 255, 0.1) 77%)",
      'pinkLineargradient': "linear-gradient(134deg, rgba(232, 13, 116, 1), rgba(177, 177, 177, 1) 99%)"
    },
    colors: {
      'primaryColor': "rgba(255, 255, 255)",
      'primaryheadingColor': "rgba(255, 255, 255, 1)",
      'primaryItemColor': "rgba(255, 255, 255, 0.9)",
      'secondaryItemColor': "rgba(255, 255, 255, 0.6)",
      'commonPopupBackgroundColor': "rgba(0, 0, 0, 0.6)",
      'ordinaryItemColor': "rgba(255, 255, 255, 0.7)",
      'gradientColor1': "from-stone-600 from-10% via-zinc-800 from-10% to-black",
      'gradientColor2': "from-pink-600 via-indigo-600 via-blue-600  to-yellow-300",
      'gradientColor3': "fr#om-neutral-700  via-stone-700 to-zinc-950",
      'primaryBgColor': "rgba(0, 0, 0, 1)",
      'secondaryBgColor': "rgba(15, 15, 15, 10)",
      'selectedBGPrimaryColor': "rgba(232, 13, 116, 1)",
      'selectedBGSecondaryColor': "rgba(35, 35, 35, 1)",
      'onhoverBGcolor': "rgba(186, 11, 93, 1)",
      'primaryfooterBgColor': "rgba(15,23,42)",
      'secondaryfooterBgColor': "rgba(10,11,11)",
      'leftBorderColor1': "rgba(0, 174, 0, 1)",
      'leftBorderColor2': "rgba(255, 235, 109, 1)",
      'leftBorderColor3': "rgba(0, 242, 255, 1)",
      'leftBorderColor4': "rgba(255, 128, 0, 1)",
      'searchBgColor': "rgba(64, 64, 64, 1)",
      'serchBorderColor': "#979797",
      'modalbtnprimaryColor': "rgba(232, 13, 116, 1)",
      'detailsbordercolor': "rgba(55,65,81, 0.7)", //gray-700
      'detailpagecontentBorderColor':"rgba(255, 255, 255, 0.1)",
      'popupTransparentBgColor': "rgba(0, 0, 0, .6)",
      'footerbordercolor': "rgba(26, 32, 44, 1)", //gray-900
      'loginSecondaryBgColor':"rgba(24, 24, 27, 1)", //zinc-900
      'profilePageBgColor': "rgba(29, 29, 29, 1)", //#1d1d1d
      'BadgeringColor': "rgb(107 114 128 / 0.1)", //gray-500/10
      'primaryFocusBgColor': "rgba(236, 253, 245, 1)", //emerald-50
      'secondaryFocusBgColor': "rgba(16, 185, 129, 1)",//emerald-500
      'playlistfocusBgColor': "rgba(167, 243, 208, 1)", //emerald-200
      'detailpageBgColor': "rgba(22, 18, 19, 1)",//#161213
      'primaryErrorColor':"rgba(239, 68, 68, 1)",//red-500
      'dropdownBgColor': "rgba(31, 41, 55, 1)",//slate-800   
      'primaryfeedbackRingColor':"rgba(59, 130, 246, 1)", //blue-500
      'secondaryfeedbackRignColor': "rgba(147, 197, 253, 1)",//blue-300
      'feedbackOnhoverRingColor': "rgba(29, 78, 216, 1)",//blue-700
      'gridTagsBgColor': "rgba(39, 39, 42, 1)", //zinc-800
      'gridTagsBorderColor': "rgba(17, 24, 39, 1)", //gray-800
      'gridTagsonhoverColor': "rgba(64, 64, 64, 1)",//#404040
      'plancardBgcolor':"rgba(34, 197, 94, 1)",//green-500
      'planprimaryItemColor': "rgba(100, 116, 139, 1)" ,//slate-500
      'plansecondaryItemColor':"rgba(51, 65, 85, 1)",//slate-700
      'popupBgColor':"rgba(45, 45, 45, 1)",//#2D2D2D
      'popupItemColor':"rgba(47, 45, 46, 1)",//#2F2D2E
      'dotsLoaderBgColor':"rgba(107, 114, 128, 1)",//gray-500
      'playactionBgColor':"rgba(255, 255, 255, 0.24)",//white-24%
      'checkboxBeforeColor':"rgba(255, 255, 255, 0.4)",//white-40%
      'descriptionitemcolor': "rgba(255, 255, 255, 0.8)",
      'subtitleNotSelectedColor': "rgba(255, 255, 255, 0.4)",
      'skeletonColor': "rgba(30, 60, 40, 1)" //gray-800

    },
    fontSize: {
      'secondaryItemFont':'0.9rem',
      'primarynavFont':'1rem',
      'primaryctaFont':'1.125rem',
      'primaryIteFont':'1.2rem',
      'primaryHeadingFont':'1.5rem',
      'xsm':'0.8rem'
    },
    screens: {
      'max-3xl': {'max': '1920px'},
      'max-2xl-s': {'max': '1690px'},
      'max-2xl': {'max': '1535px'},
      'max-xl-s': {'max': '1366px'},
      'max-xl': {'max': '1279px'},
      'max-lg-s': {'max': '1200px'},
      'max-lg': {'max': '1023px'},
      'max-md': {'max': '767px'},
      'max-sm': {'max': '639px'},
      'max-xs': {'max': '480px'},
    }
  }
}