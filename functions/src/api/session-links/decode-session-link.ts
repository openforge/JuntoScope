import * as express from 'express';

import { sessionCodeService, encryptionService, firestore } from '../../services'

export async function decodeSessionLink(req: express.Request, res: express.Response) {

  // Should find UserId/ConnectionId/ProjectId/SessionId values from decoded route param sessionLink.

  // Should receive access code from request Query Params
  //   and validate it against stored access code for given LinkId.

  // If valid, add user to the session.users property & return the session data
  // otherwise, return appropriate error

  const uid = res.locals.user.uid;
  const sessionLink = sessionCodeService.decode(req.params.sessionLink);
  const sessionsRef = firestore.doc('/public/sessions');
  const linksRef = sessionsRef.collection('/links');
  const linkSeshRef = linksRef.doc(sessionLink.toString());
  const accessCode = req.query.accessCode;

  let seshInfo;
  let seshUri;
  let sessionRef;
  let encryptedCode;

  await linkSeshRef.get().then((doc) => {
    seshInfo = doc.data();
    seshUri = `/users/${seshInfo.userId}/connections/${seshInfo.connectionId}/projects/${seshInfo.projectId}/sessions/${seshInfo.sessionId}`;
  })

  sessionRef = firestore.doc(seshUri);

  await sessionRef.get().then((doc) => {
    encryptedCode = doc.data().accessCode;
  });

  if (accessCode == encryptionService.decrypt(encryptedCode)) {
    console.log("Congratulations!!!");
    linkSeshRef.set({ users: {
      [uid]: true,
    }, }, { merge: true });
  }



  res.send(seshInfo);
}
