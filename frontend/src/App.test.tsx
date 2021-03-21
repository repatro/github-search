import React from 'react';
import { render, fireEvent, act } from '@testing-library/react';

import App from './App';
import * as api from './API';
import { IGithubRepo, IGithubUser } from './types';

const userExample: IGithubUser = {
  login: 'user',
  name: 'Name Surname',
  avatar_url: 'https://url-to-avatar.com',
  bio: 'Bio'
};
const reposExample: Array<IGithubRepo> = [
  { id: 1, name: 'Repo 1', stargazers_count: 0, html_url: 'https://repourl.com' }
];

jest.mock('./API');
const mockedApi = api as jest.Mocked<typeof api>;

test('search for an user repos', async () => {
  mockedApi.getGithubUser.mockReturnValue(Promise.resolve(userExample));
  mockedApi.getGithubUserRepos.mockReturnValue(Promise.resolve(reposExample));
  const { getByText, getByPlaceholderText, findByText } = render(<App />);
  const searchBtn = getByText('Search');
  const searchInput = getByPlaceholderText('Search for users');

  searchInput &&
    fireEvent.change(searchInput, {
      target: { value: 'user' }
    });
  searchBtn && fireEvent.click(searchBtn);

  expect(await findByText('Name Surname')).toBeTruthy();
  expect(await findByText('Repo 1')).toBeTruthy();
});
