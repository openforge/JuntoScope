import * as express from 'express';
import { firestore, teamworkService, encryptionService } from './../../../services';

export async function getProjects(req: express.Request, res: express.Response) {
  const uid = res.locals.user.uid;
  const connectionId = req.params.connectionId;

  let connectionRef;
  try {
  	connectionRef = await firestore.collection(`/users/${uid}/connections`).doc(connectionId).get();
  } catch(error) {
  	return res.status(400).json({ message: 'Error getting connection' });
  }

  const connection = connectionRef.data();

  switch (connection.type.toLowerCase()) {
    case 'teamwork': {
      
      let teamworkResponse;
      try {
        teamworkResponse = await teamworkService.getProjects(encryptionService.decrypt(connection.token), connection.externalData.baseUrl);
      } catch(error) {
        return res.status(400).json({ message: error.message });
      }

      return res.json(teamworkResponse);
    }

    default: {
      return res.status(400).json({ message: 'Unknown Connection Type' });
    }
  }
}
