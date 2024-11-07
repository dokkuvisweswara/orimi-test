
export type LangDictionary = Awaited<ReturnType<typeof getDictionary>>;

const dictionaries:any = {
  'en': () => import('./en.json').then((r) => r.default),
  'mn': () => import('./mn.json').then((r) => r.default),
};

export const getDictionary = (lang: any) => {
  return dictionaries[lang]();
};

export const i18nInterpolator = (
  str: string | undefined,
  ...args: (string | undefined)[]
): string => {
  if (!str) {
    return '';
  }
  if (!args?.length) {
    return str;
  }

  return str.replace(/{([^{}]*)}/g, (match) => {
    const arg = args.shift();
    return typeof arg !== 'undefined' ? arg : match;
  });
};
