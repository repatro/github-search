import React, { useState } from 'react';
import styled from 'styled-components';
import { Search } from '@styled-icons/bootstrap';

import TextInput from './TextInput';
import SpinningIndicator from './../styled/SpinningIndicator';

interface IUserSearch {
  isLoading: boolean;
  onSearch(value: string): void;
}
function UserSearch({ isLoading, onSearch }: IUserSearch) {
  const [userInput, setUserInput] = useState('');

  function handleSearch() {
    const trimmedInput = userInput.trim();
    if (trimmedInput.length > 0) {
      onSearch(trimmedInput);
    }
  }

  const isButtonDisabled = userInput.trim().length === 0 || isLoading;
  return (
    <Container>
      <TextInput value={userInput} icon={Search} fontSize={18} onChange={setUserInput} />
      <SearchButton disabled={isButtonDisabled} onClick={handleSearch}>
        {isLoading ? <SpinningIndicator /> : 'Search'}
      </SearchButton>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
`;

const SearchButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 80px;
  margin-left: 20px;
  color: white;
  font-size: 15px;
  font-weight: bold;
  line-height: 1em;
  border-radius: 8px;
  padding: 14px;
  cursor: pointer;
  border: none;
  background-color: #452ddd;

  &:hover {
    background-color: #3726a8;
  }
  &:active {
    background-color: #2b1e80;
  }
  &:focus {
    border: 1px solid #2b1e80;
  }
  &:disabled {
    background-color: #6351db;
    cursor: default;
  }
`;

export default UserSearch;
