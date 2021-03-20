import { Request, Response } from 'express';
import axios from 'axios';
import { getOr, pick } from 'lodash/fp';

import { IGithubRepo, IGithubUser, IGithubUserSearch } from './types';

const GITHUB_API_URL = 'https://api.github.com';
const AUTHORIZATION_HEADER = process.env.GITHUB_TOKEN ? `token ${process.env.GITHUB_TOKEN}` : '';

export async function getGithubUser(req: Request, res: Response): Promise<IGithubUser> {
  const queryUser = getUserFromRequest(req);
  return getGithubUserByUsername(await getGithubUsername(queryUser));
}

export async function getGithubUserRepos(req: Request, res: Response): Promise<Array<IGithubRepo>> {
  const queryUser = getUserFromRequest(req);
  const { data: repos } = await axios.get<Array<IGithubRepo>>(`${GITHUB_API_URL}/users/${queryUser}/repos`, {
    headers: {
      Authorization: AUTHORIZATION_HEADER
    }
  });
  return repos.map(pick(['id', 'name', 'html_url', 'stargazers_count']));
}

function getUserFromRequest(req: Request) {
  if (!req.query.user || typeof req.query.user !== 'string' || req.query.user.length === 0) {
    throw Error('Invalid or missing user passed');
  }
  return String(req.query.user);
}

async function getGithubUsername(user: string): Promise<string> {
  const { data } = await axios.get<IGithubUserSearch>(`${GITHUB_API_URL}/search/users?q=fullname:${user}`, {
    headers: {
      Authorization: AUTHORIZATION_HEADER
    }
  });
  return getOr(user, 'items.0.login', data);
}

async function getGithubUserByUsername(username: string) {
  const res = await axios.get<IGithubUser>(`${GITHUB_API_URL}/users/${username}`, {
    headers: {
      Authorization: AUTHORIZATION_HEADER
    }
  });
  const { data: foundUser } = res;
  return pick(['login', 'name', 'bio', 'avatar_url'], foundUser);
}
