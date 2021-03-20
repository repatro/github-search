import React, { useState } from 'react';
import styled from 'styled-components';

import { getGithubUser } from './API';
import { IFetchedData, IGithubUser } from './types';
import UserSearch from './components/UserSearch';

function App() {
  const [githubUserData, setGithubUserData] = useState<IFetchedData<IGithubUser>>({ data: null, isLoading: false });

  async function handleSearch(userInput: string) {
    setGithubUserData({ data: null, isLoading: true });
    try {
      const fetchedUser = await getGithubUser(userInput);
      setGithubUserData({ data: fetchedUser, isLoading: false });
    } catch (e) {
      setGithubUserData({ data: null, isLoading: false, error: e.message });
    }
  }

  return (
    <AppWrapper>
      <UserSearchContainer>
        <UserSearch onSearch={handleSearch} isLoading={githubUserData.isLoading} />
      </UserSearchContainer>

      {JSON.stringify(githubUserData)}
    </AppWrapper>
  );
}

const AppWrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
`;

const UserSearchContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: white;
  width: 100%;
  height: 12vh;
  box-shadow: 0 0 2pt 1pt #d4d4d4;
`;

export default App;
