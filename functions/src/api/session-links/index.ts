import * as express from 'express';

import { decodeSessionLink } from './decode-session-link';

export const sessionLinksRouter = express.Router({ mergeParams: true });

sessionLinksRouter.get('/:sessionLink', decodeSessionLink);
