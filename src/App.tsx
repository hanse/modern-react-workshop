import React, { useState, lazy } from 'react';
import RadioGroup, { Radio } from './RadioGroup';
import './index.css';
import { useTranslations } from './Translations';
import { useTheme } from './Theming';
import Settings from './Settings';
import ErrorBoundary from './ErrorBoundary';

// This component is loaded on demand when needed
// as a separate JS chunk.
const Area41 = lazy(() => import('./Area41'));

const LANGUAGES = [
  'JavaScript',
  'TypeScript',
  'Rust',
  'ReasonML',
  'Kotlin',
  'Go'
];

/**
 * Wire radio inputs manually
 *
 * - Must give name, checked and onChange to each input
 */
function RadioGroupExample1() {
  const { t } = useTranslations();
  const [favoriteLanguage, setFavoriteLanguage] = useState<string | null>(null);

  return (
    <form>
      <fieldset>
        {LANGUAGES.map(language => (
          <label key={language}>
            <input
              type="radio"
              name="favorite_language"
              value={language}
              checked={language === favoriteLanguage}
              onChange={e => setFavoriteLanguage(e.target.value)}
            />
            {language}
          </label>
        ))}
      </fieldset>
      {t('favorite.language')}: {favoriteLanguage}
    </form>
  );
}

/**
 * Setup radio buttons using React.Context
 *
 * - No need to manage change handlers, name and checked status for each radio
 */
function RadioGroupExample2() {
  const { t } = useTranslations();
  const [favoriteLanguage, setFavoriteLanguage] = useState(null);

  return (
    <form>
      <RadioGroup
        name="favorite_language"
        value={favoriteLanguage}
        onChange={setFavoriteLanguage}
        className="fieldset"
      >
        {LANGUAGES.map(language => (
          <Radio key={language} value={language} label={language} />
        ))}
      </RadioGroup>
      {t('favorite.language')}: {favoriteLanguage}
    </form>
  );
}

function App() {
  const { t, loading } = useTranslations();
  const { darkMode } = useTheme();
  const [count, setCount] = useState(0);

  return (
    <div className={darkMode ? 'App-dark' : 'App'}>
      {loading && <LoadingOverlay />}
      <Settings />

      <h1>React 16 and beyond</h1>

      <div className="dev-tools">
        <button onClick={() => setCount(count => count + 1)}>
          Force Re-render from top {count}
        </button>
      </div>

      <Spacer />

      <h2>{t('manual.radios')}</h2>
      <RadioGroupExample1 />

      <Spacer />

      <h2>{t('radios.with.context')}</h2>
      <RadioGroupExample2 />

      <Spacer />

      <ErrorBoundary>{count > 2 && <Area41 />}</ErrorBoundary>
    </div>
  );
}

function Spacer() {
  return <div style={{ height: 50 }} />;
}

function LoadingOverlay() {
  return (
    <div
      style={{
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        background: 'rgba(0, 0, 0, .2)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }}
    >
      ...
    </div>
  );
}

export default App;
