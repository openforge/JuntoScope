import * as express from 'express';

import { sessionService } from '../../services';


export async function deleteSession (
  req: express.Request,
  res: express.Response
) {

  const uid = res.locals.user.uid;
  const sessionLink = req.params.sessionLink;

  if (!sessionLink) {
    return res.status(400).json({ message: 'Session Link is required.' });
  }

  try {
    await sessionService.deleteSession(uid, sessionLink);
  } catch (error) {
    return res.status(400).json({ message: error });
  }

  return res.send(204);
}
