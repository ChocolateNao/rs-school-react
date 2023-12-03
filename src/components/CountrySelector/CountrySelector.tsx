import { ChangeEvent, useState } from 'react';

import ICountry from 'models/Country.interface';

import styles from './CountrySelector.module.scss';

interface CountrySelectorProps {
  countries: ICountry[];
  onSelect: (selectedCountry: ICountry | null) => void;
}

function CountrySelector({ countries, onSelect }: CountrySelectorProps) {
  const [inputValue, setInputValue] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const [suggestions, setSuggestions] = useState<ICountry[]>([]);

  const getSuggestions = (inputValue: string): ICountry[] => {
    const inputValueLower = inputValue.toLowerCase();
    return countries.filter((country) =>
      country.name.toLowerCase().includes(inputValueLower)
    );
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setInputValue(value);
    setSuggestions(getSuggestions(value));
  };

  const handleSuggestionClick = (selectedCountry: ICountry) => {
    setInputValue(selectedCountry.name);
    setSuggestions([]);
    onSelect(selectedCountry);
  };

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setTimeout(() => {
      setIsFocused(false);
    }, 100);
  };

  return (
    <div className={styles.countryselector}>
      <input
        type="text"
        id="country"
        value={inputValue}
        onChange={handleInputChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        placeholder="Type a country"
      />
      {isFocused && suggestions.length > 0 && (
        <ul className={styles.countryselector__suggestions}>
          {suggestions.map((country) => (
            // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-noninteractive-element-interactions
            <li
              key={country.code}
              onClick={() => handleSuggestionClick(country)}
            >
              {country.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default CountrySelector;
