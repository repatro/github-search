import React from 'react';
import { render } from '@testing-library/react';
import { get } from 'lodash/fp';

import ReposList from '../ReposList';
import { IFetchedData, IGithubRepo } from '../../types';

describe('ReposList', () => {
  it('should show top 3 starred repos', () => {
    const exampleReposData: IFetchedData<Array<IGithubRepo>> = {
      data: [
        { id: 1, name: 'Repo 1', stargazers_count: 0, html_url: 'https://url-example.com' },
        { id: 2, name: 'Repo 2', stargazers_count: 15, html_url: 'https://url-example.com' },
        { id: 3, name: 'Repo 3', stargazers_count: 5, html_url: 'https://url-example.com' },
        { id: 4, name: 'Repo 4', stargazers_count: 2, html_url: 'https://url-example.com' },
        { id: 5, name: 'Repo 5', stargazers_count: 7, html_url: 'https://url-example.com' }
      ],
      isLoading: false
    };
    const { queryAllByText } = render(<ReposList reposData={exampleReposData} />);
    const reposElements = queryAllByText(/Repo \d/);

    const expectedOrder = ['Repo 2', 'Repo 5', 'Repo 3'];

    expect(reposElements.length).toBe(3);
    expect(reposElements.map(get('textContent'))).toEqual(expectedOrder);
  });

  it('should show info when no repos to display', () => {
    const exampleReposData: IFetchedData<Array<IGithubRepo>> = {
      data: [],
      isLoading: false
    };

    const { getByText } = render(<ReposList reposData={exampleReposData} />);
    expect(getByText(/No repositories/)).toBeInTheDocument();
  });
});
