import * as functions from 'firebase-functions';
import * as express from 'express';
import * as cors from 'cors';

import { idTokenAuth } from './middleware';
import { apiRouter } from './api';

const app = express();
app.disable('X-Powered-By');

app.use(cors({ origin: true }));

app.use(idTokenAuth);

app.use(apiRouter);
app.get('/*', (req: express.Request, res: express.Response) => {
  res.status(404).send();
});

exports.api = functions.https.onRequest(app);
