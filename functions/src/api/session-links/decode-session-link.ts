import * as express from 'express';

import { sessionCodeService, encryptionService, firestore } from '../../services'

export async function decodeSessionLink(req: express.Request, res: express.Response) {

  // Should find UserId/ConnectionId/ProjectId/SessionId values from decoded route param sessionLink.

  // Should receive access code from request Query Params
  //   and validate it against stored access code for given LinkId.

  // If valid, add user to the session.users property & return the session data
  // otherwise, return appropriate error

  const uid = res.locals.user.uid;
  const sessionLink = req.params.sessionLink;
  const accessCode = req.query.accessCode;

  res.send(await sessionCodeService.validateSession(sessionLink, accessCode, uid));
}
