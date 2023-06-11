import { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Header,
  SearchForm,
  SearchFormBtn,
  SearchFormInput,
} from './Searchbar.styled';
import { HiMagnifyingGlass } from 'react-icons/hi2';

export default function Searchbar({ onSubmit }) {
  const [searchName, setSearchName] = useState('');
  const [inputValue, setInputValue] = useState('');

  const handleSearchChange = e => setInputValue(e.target.value);

  const handleSearchSubmit = e => {
    e.preventDefault();
    setSearchName(searchName.trim());
    onSubmit(inputValue);
    setInputValue('');
  };
  return (
    <Header>
      <SearchForm onSubmit={handleSearchSubmit}>
        <SearchFormBtn>
          <HiMagnifyingGlass size="24" />
        </SearchFormBtn>
        <SearchFormInput
          type="text"
          autocomplete="off"
          autoFocus
          placeholder="Search images and photos"
          value={inputValue}
          onChange={handleSearchChange}
        />
      </SearchForm>
    </Header>
  );
}

Searchbar.propType = {
  onSubmit: PropTypes.func.isRequired,
};
