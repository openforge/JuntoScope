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

  async getProjects(token: string) {
    let authData;
    try {
      authData = await this.validateToken(token);
      const uri = `${authData.baseUrl}/projects.json`;
      const headers = this.getReqHeaders(token);

      const options: request.OptionsWithUri = {
        uri,
        method: 'GET',
        headers,
        json: true,
      };

      return request(options)
        .then(response => {
          const projects = response.projects;

          return {
            projects: projects.map(
              p => {
                return {
                  id: p.id,
                  name: p.name,
                  description: p.description,
                  created: p['created-on']
                };
              }
            )
          };
        })
        .catch(error => { throw new Error('Unable to get projects from Teamwork. Please try again later.') });
    } catch (error) {
      throw error;
    }
  }

  private getReqHeaders(token: string) {
    const encodedToken = new Buffer(`${token}:X`).toString('base64');
    return {
      'Content-Type': 'application/json',
      Authorization: `BASIC ${encodedToken}`,
    };
  }
}
