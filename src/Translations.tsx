import React, {
  createContext,
  useContext,
  useMemo,
  useState,
  useEffect,
  useRef,
  Component
} from 'react';

export const TranslationContext = createContext({
  language: 'no',
  setLanguage: (language: string) => {},
  loading: false,
  t: (key: string) => `missing translation ${key}`
});

const textMap: any = {
  en: {
    'manual.radios': 'Manually wired Radios',
    'radios.with.context': 'Radios with Context',
    'favorite.language': 'Favorite language'
  },
  no: {
    'manual.radios': 'Manuelle radioknapper',
    'radios.with.context': 'Radioknapper ved bruk av Context',
    'favorite.language': 'Favorittspråk'
  }
};

export function TranslationsProvider({
  defaultLanguage = 'en',
  children
}: any) {
  const [language, setLanguage] = useState(defaultLanguage);
  const [texts, setTexts] = useState(textMap[defaultLanguage] || {});
  const [loading, setLoading] = useState(false);
  const initialMount = useRef(true);

  useEffect(() => {
    if (initialMount.current) {
      initialMount.current = false;
      return;
    }

    let current = true;
    (async () => {
      current && setLoading(true);

      await new Promise(resolve =>
        setTimeout(resolve, 200 + Math.random() * 500)
      );

      if (current) {
        setTexts(textMap[language] || {});
        setLoading(false);
      }
    })();

    return () => {
      current = false;
    };
  }, [language]);

  const value = useMemo(
    () => ({
      language,
      setLanguage,
      loading,
      t: (key: string) => texts[key] || `missing translation ${key}`
    }),
    [language, setLanguage, texts, loading]
  );

  return (
    <TranslationContext.Provider value={value}>
      {children}
    </TranslationContext.Provider>
  );
}

/**
 * Custom hook for easier context consumption
 */
export function useTranslations() {
  return useContext(TranslationContext);
}

/**
 * Higher-Order-Component version of the "old" Context Consumer.
 */
export function withTranslations(WrappedComponent: any) {
  return function TranslatedComponent(props: any) {
    return (
      <TranslationContext.Consumer>
        {context => <WrappedComponent {...props} {...context} />}
      </TranslationContext.Consumer>
    );
  };
}
