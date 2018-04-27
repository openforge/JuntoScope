import * as express from 'express';

import { decodeSessionLink } from './decode-session-link';
import { refreshAccessCode } from './refresh-access-code';

export const sessionLinksRouter = express.Router({ mergeParams: true });

sessionLinksRouter.get('/:sessionLink', decodeSessionLink);
sessionLinksRouter.get('/:sessionLink/refresh', refreshAccessCode);
