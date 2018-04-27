import * as express from 'express';

import { addSession } from './add-session'

export const sessionsRouter = express.Router({ mergeParams: true });

sessionsRouter.get('/', addSession);
