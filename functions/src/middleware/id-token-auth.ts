import * as express from 'express';

import { auth } from './../services';

/**
 * Middleware function that will intercept the id token
 * from Authorization Headers of all incoming requests.
 * And will validate the token assigning the user object
 * to the locals response object.
 */
export function idTokenAuth(req: express.Request, res: express.Response, next: express.NextFunction) {
  const authHeader = req.headers && req.headers.authorization;
  const headerValue = authHeader
    ? Array.isArray(authHeader) ? authHeader[0] : authHeader
    : '';

  if (!headerValue || !headerValue.startsWith('Bearer ')) {
    res.status(403).send('Unauthorized');
    return;
  }

  const idToken = headerValue.split('Bearer ')[1];

  auth.verifyIdToken(idToken)
    .then(decodedIdToken => {
      res.locals.user = decodedIdToken;
      return next();
    })
    .catch(error => {
      res.status(403).send('Unauthorized');
    });
}
