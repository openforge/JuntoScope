import * as express from 'express';
import { auth } from 'firebase-admin';

import { firestore, teamworkService, encryptionService } from './../../services';

export async function addConnection(req: express.Request, res: express.Response) {
  const { type, token } = req.body as { type: string, token: string };
  const uid = res.locals.user.uid;

  if (!type) {
    return res.status(400).json({ message: 'Connection Type is required.' });
  }

  if (!token) {
    return res.status(400).json({ message: 'Connection Token is required.' });
  }

  switch (type.toLowerCase()) {
    case 'teamwork': {
      let teamworkResponse;
      try {
        teamworkResponse = await teamworkService.validateToken(token);
      } catch(error) {
        return res.status(400).json({ message: error.message });
      }

      let snapshot = await firestore.collection(`/users/${uid}/connections`)
        .where('type', '==', type.toLowerCase())
        .where('externalData.id', '==', teamworkResponse.id)
        .get();

      if (snapshot.size > 0) {
        return res.status(422).json({ message: 'Connection already exists!' });
      }

      await firestore.collection(`/users/${uid}/connections`).add({
        type: 'teamwork',
        token: encryptionService.encrypt(token),
        externalData: teamworkResponse
      });

      return res.status(201).send();
    }

    default: {
      return res.status(400).json({ message: 'Unknown Connection Type' });
    }
  }
}
