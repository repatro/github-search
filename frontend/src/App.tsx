import React, { useState } from 'react';
import styled from 'styled-components';

import { getGithubUser } from './API';
import { IFetchedData, IGithubUser } from './types';
import UserSearch from './components/UserSearch';
import UserInfo from './components/UserInfo';
import LoadingWrapper from './components/LoadingWrapper';

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
    <div>
      <HeaderSection>
        <NarrowCentered>
          <UserSearch onSearch={handleSearch} isLoading={githubUserData.isLoading} />
        </NarrowCentered>
      </HeaderSection>
      <ContentSection>
        <NarrowCentered>
          <UserInfoContainer>
            <LoadingWrapper
              isLoading={githubUserData.isLoading}
              error={githubUserData.error}
              loadingHeight={80}
              spinningIndicatorSize={40}
            >
              {githubUserData.data && <UserInfo user={githubUserData.data} />}
            </LoadingWrapper>
          </UserInfoContainer>
        </NarrowCentered>
      </ContentSection>
    </div>
  );
}

const NarrowCentered = styled.div`
  max-width: 600px;
  width: 100%;
  margin: auto;
  padding: 20px;
`;

const HeaderSection = styled.div`
  display: flex;
  background-color: white;
  box-shadow: 0 0 3pt 2pt #e7e7e7;
`;

const ContentSection = styled.div`
  display: flex;
`;

const UserInfoContainer = styled.div`
  margin-right: 50px;
`;

export default App;
