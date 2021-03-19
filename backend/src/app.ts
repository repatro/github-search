import cors from 'cors';
import express, { Request, Response } from 'express';

import { getGithubUser } from './controllers';

const app = express();
const port = 3001;

app.use(cors());

app.get('/helloWorld', (req: Request, res: Response) => {
  res.send('Hello World!');
});

app.get('/githubUser', async (req: Request, res: Response) => {
  try {
    const foundUser = await getGithubUser(req, res);
    return res.status(200).json({
      status: 'succes',
      data: foundUser
    });
  } catch (e) {
    console.error(e.message);
    return res.status(400).json({
      status: 'error',
      error: e.message
    });
  }
});

app.listen(port, () => {
  console.log(`App listening at port: ${port}`);
});
