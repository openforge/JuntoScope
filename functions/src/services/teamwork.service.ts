import * as request from 'request-promise-native';

export class TeamworkService {
  validateToken(token: string) {
    const uri = 'https://authenticate.teamwork.com/authenticate.json';
    const headers = this.getReqHeaders(token);

    const options: request.OptionsWithUri = {
      uri,
      method: 'GET',
      headers,
      json: true,
    };

    return request(options)
      .then(response => {
        const { account } = response;

        return {
          id: account.id,
          baseUrl: account.URL,
          userId: account.userId,
          name: `${account.firstname} ${account.lastname}`,
          company: account.companyname,
          companyId: account.companyid,
        };
      })
      .catch(error => { throw new Error('Unable to authenticate with Teamwork. Please verify your token and try again later.') });
  }

  private getReqHeaders(token: string) {
    const encodedToken = new Buffer(`${token}:X`).toString('base64');
    return {
      'Content-Type': 'application/json',
      Authorization: `BASIC ${encodedToken}`,
    };
  }
}
