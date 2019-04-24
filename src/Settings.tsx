import React, { useContext } from 'react';
import {
  useTranslations,
  TranslationContext,
  withTranslations
} from './Translations';
import RadioGroup, { RadioGroupContext } from './RadioGroup';
import { ThemeContext, withTheme } from './Theming';

/**
 * A custom Radio input that can be used as a drop-in replacement
 * for a <Radio />, since both consumes the same context.
 */
function Flag({ value, name, ...props }: any) {
  const { selectedValue, onChange } = useContext(RadioGroupContext);
  const checked = selectedValue === value;
  return (
    <label style={{ fontWeight: checked ? 700 : 400 }}>
      <input
        {...props}
        type="radio"
        checked={checked}
        onChange={() => onChange(value)}
        style={{ WebkitAppearance: 'none' }}
      />
      {name}
    </label>
  );
}

export function Settings() {
  const { language, setLanguage } = useTranslations();
  const { darkMode, toggleDarkMode } = useContext(ThemeContext); // or useTheme() (function composition, yay!)

  return (
    <div className="row end">
      <div>
        <label>
          <input type="checkbox" checked={darkMode} onChange={toggleDarkMode} />{' '}
          Use dark theme
        </label>
        <RadioGroup
          as="div"
          name="preferred-language"
          value={language}
          onChange={setLanguage}
          style={{}}
        >
          <Flag value="en" name="English" />
          <Flag value="no" name="Norsk" />
          <Flag value="de" name="Deutsch" />
        </RadioGroup>
      </div>
    </div>
  );
}

/**
 * A version of Settings consuming Context the way you'd have to
 * do it before Hooks.
 *
 * Notice the required level of nesting.
 */
export function SettingsWithoutHooks() {
  return (
    <ThemeContext.Consumer>
      {({ darkMode, toggleDarkMode }) => (
        <TranslationContext.Consumer>
          {({ language, setLanguage }) => (
            <div className="row end">
              <div>
                <label>
                  <input
                    type="checkbox"
                    checked={darkMode}
                    onChange={toggleDarkMode}
                  />{' '}
                  Use dark theme
                </label>
                <RadioGroup
                  as="div"
                  name="preferred-language"
                  value={language}
                  onChange={setLanguage}
                  style={{}}
                >
                  <Flag value="en" name="English" />
                  <Flag value="no" name="Norsk" />
                  <Flag value="de" name="Deutsch" />
                </RadioGroup>
              </div>
            </div>
          )}
        </TranslationContext.Consumer>
      )}
    </ThemeContext.Consumer>
  );
}

//
/**
 * A version of Settings using the Higher-Order-Component pattern.
 *
 * Wrap the render-props of SettingsWithoutHooks using HOCs.
 *
 * Using this, one Context Consumer becomes 3 components in the component tree:
 *
 * HOC > Context.Consumer > Wrapped Component. So when consuming two contexts
 * we get six nested components.
 *
 * Notice how all the are props merged together possibly causing trouble
 * if more hocs provide the same props. You can't easily spot which hoc provided
 * which prop.
 *
 * HOCs are much harder to type using TS/Flow as well.
 */
export const SettingsWithHOC = withTheme(
  withTranslations(
    ({ darkMode, toggleDarkMode, language, setLanguage }: any) => (
      <div className="row end">
        <div>
          <label>
            <input
              type="checkbox"
              checked={darkMode}
              onChange={toggleDarkMode}
            />{' '}
            Use dark theme
          </label>
          <RadioGroup
            as="div"
            name="preferred-language"
            value={language}
            onChange={setLanguage}
            style={{}}
          >
            <Flag value="en" name="English" />
            <Flag value="no" name="Norsk" />
            <Flag value="de" name="Deutsch" />
          </RadioGroup>
        </div>
      </div>
    )
  )
);

export default Settings;
