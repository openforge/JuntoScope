import * as express from 'express';

import { connectionsRouter } from './connections';
import { sessionLinksRouter } from './session-links';
import { estimateRouter } from './estimate';

export const apiRouter = express.Router();

apiRouter.use('/connections', connectionsRouter);
apiRouter.use('/session-links', sessionLinksRouter);
apiRouter.use('/estimate', estimateRouter);
