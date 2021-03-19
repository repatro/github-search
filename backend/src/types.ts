export interface IGithubUser {
  login: string;
  name: string | null;
  bio: string | null;
  avatar_url: string | null;
}

export interface IGithubUserSearch {
  items: Array<{
    login: string;
  }>;
}
