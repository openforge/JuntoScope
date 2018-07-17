import * as express from 'express';

import { sessionService, encryptionService, firestore } from '../../services';

export async function decodeSessionLink(
  req: express.Request,
  res: express.Response
) {
  const uid = res.locals.user.uid;
  const sessionLink = req.params.sessionLink;
  const accessCode = req.query.accessCode;

  if (!sessionLink) {
    return res.status(400).json({ message: 'Session Link is required.' });
  }

  if (!accessCode) {
    return res.status(400).json({ message: 'Access Code is required.' });
  }

  try {
    await sessionService.validateSession(sessionLink, accessCode, uid);
  } catch (error) {
    return res.status(400).json({ message: error });
  }

  return res.send(204);
}
