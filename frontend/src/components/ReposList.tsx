import React, { useMemo } from 'react';
import styled from 'styled-components';
import { take, orderBy, isEmpty } from 'lodash/fp';

import RepoCard from './RepoCard';
import LoadingWrapper from './LoadingWrapper';
import { IFetchedData, IGithubRepo } from '../types';

interface IReposListProps {
  reposData: IFetchedData<Array<IGithubRepo>>;
}
function ReposList({ reposData }: IReposListProps) {
  const preparedTopRepos = useMemo(() => take(3, orderBy(['stargazers_count'], ['desc'], reposData.data || [])), [
    reposData.data
  ]);

  function renderRepos() {
    return (
      <TopReposList>
        {preparedTopRepos.map((repo) => (
          <RepoCard key={repo.id} repo={repo} />
        ))}
      </TopReposList>
    );
  }

  function renderNoReposInfo() {
    return <NoReposText>No repositories found</NoReposText>;
  }

  return (
    <div>
      <HeaderText>Top repositories</HeaderText>
      <LoadingWrapper
        isLoading={reposData.isLoading}
        error={reposData.error}
        loadingHeight={100}
        spinningIndicatorSize={45}
      >
        {!isEmpty(preparedTopRepos) ? renderRepos() : !reposData.isLoading && renderNoReposInfo()}
      </LoadingWrapper>
    </div>
  );
}

const HeaderText = styled.h2`
  margin-bottom: 25px;
`;

const TopReposList = styled.div`
  > div {
    margin-bottom: 15px;
  }
`;

const NoReposText = styled.p`
  text-align: center;
  font-size: 18px;
`;

export default ReposList;
