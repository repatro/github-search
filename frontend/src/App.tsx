import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

import { getGithubUser, getGithubUserRepos } from './API';
import { IFetchedData, IGithubRepo, IGithubUser } from './types';
import UserSearch from './components/UserSearch';
import UserInfo from './components/UserInfo';
import LoadingWrapper from './components/LoadingWrapper';
import ReposList from './components/ReposList';

function App() {
  const [githubUserData, setGithubUserData] = useState<IFetchedData<IGithubUser>>({ data: null, isLoading: false });
  const [githubReposData, setGithubReposData] = useState<IFetchedData<Array<IGithubRepo>>>({
    data: null,
    isLoading: false
  });

  useEffect(() => {
    if (!githubUserData.data) {
      setGithubReposData({ data: null, isLoading: false });
    } else {
      fetchUserRepos(githubUserData.data.login);
    }
  }, [githubUserData.data]);

  async function fetchUserRepos(user: string) {
    if (githubUserData.data?.login) {
      try {
        setGithubReposData({ data: null, isLoading: true });
        const fetchedRepos = await getGithubUserRepos(user);
        setGithubReposData({ data: fetchedRepos, isLoading: false });
      } catch (e) {
        setGithubReposData({ data: null, isLoading: false, error: e.message });
      }
    }
  }

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
          {githubUserData.data && <ReposList reposData={githubReposData} />}
        </NarrowCentered>
      </ContentSection>
    </div>
  );
}

const NarrowCentered = styled.div`
  max-width: 600px;
  width: 100%;
  margin: auto;
  padding: 25px;
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
  margin-bottom: 50px;
`;

export default App;
