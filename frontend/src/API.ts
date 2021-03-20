import { IGithubUser } from './types';

const API_URL: string = process.env.REACT_APP_API_URL || 'http://localhost:3001';

export async function getGithubUser(user: string): Promise<IGithubUser> {
  const response = await fetch(`${API_URL}/githubUser?user=${user}`);
  if (response.ok) {
    const fetchedUser: IGithubUser = (await response.json()).data;
    return fetchedUser;
  } else {
    return Promise.reject(new Error(response.status === 404 ? 'Not found' : 'Fetching user failed'));
  }
}
