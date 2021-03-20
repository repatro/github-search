import React from 'react';
import styled from 'styled-components';

import { IGithubRepo } from '../types';

interface IRepoCardProps {
  repo: IGithubRepo;
}
function RepoCard({ repo }: IRepoCardProps) {
  return (
    <Segment>
      <Link href={repo.html_url} rel='noreferrer' target='_blank' aria-label='Github repository link'>
        {repo.name}
      </Link>
    </Segment>
  );
}

const Segment = styled.div`
  display: flex;
  align-items: center;
  padding-left: 20px;
  background-color: white;
  height: 70px;
  border-radius: 12px;
  box-shadow: 0 0 6pt 0pt #e7e7e7;
`;

const Link = styled.a`
  text-decoration: none;
  color: #458be1;
  font-size: 18px;
  :hover {
    color: #317cd8;
  }
`;

export default RepoCard;
