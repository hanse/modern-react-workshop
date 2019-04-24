import React, { createContext, useMemo, useState, useContext } from 'react';

export const ThemeContext = createContext({
  darkMode: false,
  toggleDarkMode: () => {}
});

type Props = any;

export function ThemeProvider({ children }: Props) {
  const [darkMode, setDarkMode] = useState(false);
  const value = useMemo(
    () => ({
      darkMode,
      toggleDarkMode: () => setDarkMode(darkMode => !darkMode)
    }),
    [darkMode, setDarkMode]
  );

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}

// Hard to type correctly
// Tree nesting
export function withTheme(WrappedComponent: any) {
  return function ThemedComponent(props: any) {
    return (
      <ThemeContext.Consumer>
        {context => <WrappedComponent {...props} {...context} />}
      </ThemeContext.Consumer>
    );
  };
}
