import { IGithubRepo, IGithubUser } from './types';

const API_URL: string = process.env.REACT_APP_API_URL || 'http://localhost:3001';

export async function getGithubUser(user: string): Promise<IGithubUser> {
  const response = await fetch(`${API_URL}/githubUser?user=${user}`);
  if (response.ok) {
    const fetchedUser: IGithubUser = (await response.json()).data;
    return fetchedUser;
  } else {
    return Promise.reject(
      new Error(response.status === 404 ? 'User not found' : 'Fetching user failed. Please try again')
    );
  }
}

export async function getGithubUserRepos(user: string): Promise<Array<IGithubRepo>> {
  const response = await fetch(`${API_URL}/githubUserRepos?user=${user}`);
  if (response.ok) {
    const fetchedRepos: Array<IGithubRepo> = (await response.json()).data;
    return fetchedRepos;
  } else {
    return Promise.reject(new Error('Fetching repos failed'));
  }
}
