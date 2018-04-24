import * as express from 'express';

import { connectionsRouter } from './connections';

export const apiRouter = express.Router();

apiRouter.use('/connections', connectionsRouter);
