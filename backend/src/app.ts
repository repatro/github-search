import cors from 'cors';
import express, { Request, Response } from 'express';

import { getGithubUser, getGithubUserRepos } from './controllers';

const app = express();
const port = 3001;

app.use(cors());

app.get('/githubUser', getRouteControllerWrapper(getGithubUser));

app.get('/githubUserRepos', getRouteControllerWrapper(getGithubUserRepos));

app.listen(port, () => {
  console.log(`App listening at port: ${port}`);
});

function getRouteControllerWrapper(getData: (req: Request, res: Response) => Promise<Object | Array<Object>>) {
  return async function (req: Request, res: Response) {
    try {
      const data = await getData(req, res);
      return res.status(200).json({
        status: 'succes',
        data
      });
    } catch (e) {
      console.error(e.message);
      return res.status(e.isAxiosError ? e.response.status : 500).json({
        status: 'error',
        error: e.isAxiosError ? e.response.statusText : e.message
      });
    }
  };
}
