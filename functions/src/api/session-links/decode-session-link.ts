import * as express from 'express';

export async function decodeSessionLink(req: express.Request, res: express.Response) {

  // Should find UserId/ConnectionId/ProjectId/SessionId values from decoded route param sessionLink.

  // Should receive access code from request Query Params
  //   and validate it against stored access code for given LinkId.

  // If valid, add user to the session.users property & return the session data
  // otherwise, return appropriate error

  res.send();
}
