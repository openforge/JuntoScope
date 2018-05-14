import * as express from 'express';

import { decodeSessionLink } from './decode-session-link';
import { refreshAccessCode } from './refresh-access-code';
import { deleteSession } from './delete-session';

export const sessionLinksRouter = express.Router({ mergeParams: true });

sessionLinksRouter.get('/:sessionLink', decodeSessionLink);
sessionLinksRouter.get('/:sessionLink/refresh', refreshAccessCode);
sessionLinksRouter.delete('/:sessionLink', deleteSession);
