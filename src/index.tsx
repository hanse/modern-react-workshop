import React, { Suspense } from 'react';
import { render } from 'react-dom';
import App from './App';
import { TranslationsProvider } from './Translations';
import { ThemeProvider } from './Theming';
import ErrorBoundary from './ErrorBoundary';

render(
  <Suspense fallback={<div />}>
    <ErrorBoundary>
      <ThemeProvider>
        <TranslationsProvider>
          <App />
        </TranslationsProvider>
      </ThemeProvider>
    </ErrorBoundary>
  </Suspense>,
  document.getElementById('root')
);
