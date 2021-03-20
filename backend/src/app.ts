import cors from 'cors';
import express, { Request, Response } from 'express';

import { getGithubUser } from './controllers';

const app = express();
const port = 3001;

app.use(cors());

app.get('/githubUser', async (req: Request, res: Response) => {
  try {
    const foundUser = await getGithubUser(req, res);
    return res.status(200).json({
      status: 'succes',
      data: foundUser
    });
  } catch (e) {
    console.error(e.message);
    return res.status(e.isAxiosError ? e.response.status : 500).json({
      status: 'error',
      error: e.isAxiosError ? e.response.statusText : e.message
    });
  }
});

app.listen(port, () => {
  console.log(`App listening at port: ${port}`);
});
