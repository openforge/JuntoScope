import * as express from 'express';

import { sessionCodeService, encryptionService, firestore } from '../../services'

export async function decodeSessionLink(req: express.Request, res: express.Response) {

  // Should find UserId/ConnectionId/ProjectId/SessionId values from decoded route param sessionLink.

  // Should receive access code from request Query Params
  //   and validate it against stored access code for given LinkId.

  // If valid, add user to the session.users property & return the session data
  // otherwise, return appropriate error

  const sessionLink = sessionCodeService.decode(req.params.sessionLink);
  const sessionsRef = firestore.doc('/public/sessions');
  const linksRef = sessionsRef.collection('/links');
  const linkRef = linksRef.doc(sessionLink.toString());

  const code = req.body.accessCode;

  let seshInfo;
  let queryString;
  let sessionRef;

  linkRef.get().then((doc) => {
    seshInfo = doc.data();
    queryString = `/users/${seshInfo.userId}/connections/${seshInfo.connectionId}/projects/${seshInfo.projectId}/sessions/${seshInfo.sessionId}`;
    sessionRef = firestore.doc(queryString);

    sessionRef.get().then((doc) => {
      let encryptedCode = doc.data().accessCode;

      if (code == encryptionService.decrypt(encryptedCode)) {
        console.log("Congratulations!!!");
      }
    })
  })



  res.send();
}
