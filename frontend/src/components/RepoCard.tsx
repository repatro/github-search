import React from 'react';
import styled from 'styled-components';

import { IGithubRepo } from '../types';

interface IRepoCardProps {
  repo: IGithubRepo;
}
function RepoCard({ repo }: IRepoCardProps) {
  return (
    <SegmentLink href={repo.html_url} rel='noreferrer' target='_blank' aria-label='Github repository link'>
      {repo.name}
    </SegmentLink>
  );
}

const SegmentLink = styled.a`
  display: flex;
  align-items: center;
  padding-left: 20px;
  margin-bottom: 20px;
  background-color: white;
  height: 70px;
  border-radius: 12px;
  box-shadow: 0 0 6pt 0pt #e7e7e7;
  transition: box-shadow 0.1s linear;
  text-decoration: none;
  color: #458be1;
  font-size: 18px;

  :hover {
    box-shadow: 0 0 4pt 0pt #c0bebe;
  }
`;

export default RepoCard;
