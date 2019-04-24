import React, { useContext, createContext, useMemo, memo } from 'react';
import styles from './RadioGroup.module.css';

// Demonstrate
// 1. Remove memo
// 2. Remove useMemo
// 3.

// The argument sent to createContext is the default context value
// It will be used if the Consumer is not surrounded by a Provider
export const RadioGroupContext = createContext<any>({
  selectedValue: null,
  onChange: () => {},
  name: ''
});

function RadioGroup({
  as: Component = 'div',
  name,
  children,
  value,
  onChange,
  ...props
}: any) {
  const contextValue = useMemo(
    () => ({
      name,
      selectedValue: value,
      onChange
    }),
    [name, value, onChange]
  );

  // const contextValue = {
  //   name,
  //   selectedValue: value,
  //   onChange
  // };

  return (
    <RadioGroupContext.Provider value={contextValue}>
      <Component role="radiogroup" {...props}>
        {children}
      </Component>
    </RadioGroupContext.Provider>
  );
}

export const Radio = memo(({ value, label, ...props }: any) => {
  const { selectedValue, onChange } = useContext(RadioGroupContext);
  return (
    <label className={styles.root}>
      <input
        {...props}
        type="radio"
        checked={selectedValue === value}
        onChange={() => onChange(value)}
      />
      <span className={styles.checkmark} />
      {label}
    </label>
  );
});

export default RadioGroup;
