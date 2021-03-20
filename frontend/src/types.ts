export interface IGithubUser {
  login: string;
  name: string | null;
  bio: string | null;
  avatar_url: string | null;
}

export interface IGithubRepo {
  id: number;
  name: string;
  html_url: string;
  stargazers_count: number;
}
export interface IFetchedData<T> {
  data: T | null;
  isLoading: boolean;
  error?: string;
}
