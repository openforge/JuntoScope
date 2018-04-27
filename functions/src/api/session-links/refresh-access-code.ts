import * as express from 'express'

import { sessionService } from '../.././services';

export async function refreshAccessCode(req: express.Request, res: express.Response) {
  const uid = res.locals.user.uid;
  const sessionLink = req.params.sessionLink;

  res.send(await sessionService.refreshAccessCode(sessionLink, uid));
}
