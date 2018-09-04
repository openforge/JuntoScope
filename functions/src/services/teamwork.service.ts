import * as request from "request-promise-native";
import { encryptionService } from "./";

import * as _ from "lodash";

export class TeamworkService {
  validateToken(token: string) {
    const uri = "https://www.teamwork.com/launchpad/v1/token.json";

    const options: request.OptionsWithUri = {
      uri,
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      json: true,
      body: {
        code: `${token}`
      }
    };

    return request(options)
      .then(response => {
        const account = response;

        return {
          accessToken: encryptionService.encrypt(account.access_token),
          id: account.installation.id,
          baseUrl: account.installation.apiEndPoint,
          company: account.installation.company.name,
          companyId: account.installation.company.id,
          userId: account.user.id,
          name: `${account.user.firstName} ${account.user.lastName}`
        };
      })
      .catch(error => {
        console.log(error);
        throw new Error(
          "Unable to authenticate with Teamwork. Please verify your token and try again later."
        );
      });
  }

  getProjects(token: string, baseUrl: string) {
    const uri = `${baseUrl}projects.json`;
    const headers = this.getReqHeaders(token);

    const options: request.OptionsWithUri = {
      uri,
      method: "GET",
      headers,
      json: true
    };

    return request(options)
      .then(response => {
        const projects = response.projects;

        return {
          projects: projects.map(p => {
            return {
              id: p.id,
              name: p.name,
              description: p.description,
              created: p["created-on"]
            };
          })
        };
      })
      .catch(error => {
        throw new Error(
          "Unable to get projects from Teamwork. Please verify your token and  try again later."
        );
      });
  }

  async getTaskLists(
    token: string,
    baseUrl: string,
    projectId: string,
    page: number
  ) {
    const uri = `${baseUrl}projects/${projectId}/tasklists.json?page=${page}`;
    const headers = this.getReqHeaders(token);

    const options: request.OptionsWithUri = {
      uri,
      method: "GET",
      headers,
      json: true,
      resolveWithFullResponse: true
    };

    return request(options)
      .then(response => {
        const taskLists = response.body.tasklists;
        const responseHeaders = response.headers;

        return {
          page: responseHeaders["x-page"],
          pages: responseHeaders["x-pages"],
          taskLists: taskLists.map(t => {
            return {
              id: t.id,
              name: t.name,
              description: t.description
            };
          })
        };
      })
      .catch(error => {
        throw new Error(
          "Unable to get task lists from Teamwork. Please verify your token and project id and  try again later."
        );
      });
  }

  async getTasks(token: string, baseUrl: string, tasklistId: string) {
    try {
      const teamworkResponse = await this.getTasksData(
        token,
        baseUrl,
        tasklistId,
        1
      );
      let tasks = teamworkResponse.tasks;

      if (teamworkResponse.pages > 1) {
        const promises = [];
        for (let i = 2; i <= teamworkResponse.pages; i++) {
          promises.push(this.getTasksData(token, baseUrl, tasklistId, i));
        }

        await Promise.all(promises).then(responses => {
          responses.forEach(t => {
            tasks = tasks.concat(t.tasks);
          });
        });
      }

      return { tasks: _.keyBy(tasks, "id") };
    } catch (error) {
      throw error;
    }
  }

  async getTask(token: string, baseUrl: string, taskId: string) {
    const uri = `${baseUrl}tasks/${taskId}.json`;
    const headers = this.getReqHeaders(token);

    const options: request.OptionsWithUri = {
      uri,
      method: "GET",
      headers,
      json: true
    };

    return request(options)
      .then(response => {
        const task = response["todo-item"];
        const estimatedHours = +task["estimated-minutes"] / 60;

        return {
          id: task.id,
          name: task.content,
          description: task.description,
          parent: task.parentTaskId,
          estimation: estimatedHours
        };
      })
      .catch(error => {
        throw new Error(
          "Unable to get task from Teamwork. Please verify your token and task id and try again later."
        );
      });
  }

  async putEstimate(
    token: string,
    baseUrl: string,
    taskId: string,
    hours: number
  ) {
    const uri = `${baseUrl}tasks/${taskId}.json`;
    const headers = this.getReqHeaders(token);

    const estimatedMinutes = hours * 60;
    const options: request.OptionsWithUri = {
      uri,
      method: "PUT",
      headers,
      json: true,
      body: {
        "todo-item": {
          "estimated-minutes": `${estimatedMinutes}`
        }
      }
    };

    return request(options)
      .then(response => {
        return true;
      })
      .catch(error => {
        throw new Error(
          "Unable to update task on Teamwork. Please verify your token and task id try again later."
        );
      });
  }

  private async getTasksData(
    token: string,
    baseUrl: string,
    tasklistId: string,
    startPage: number
  ) {
    const uri = `${baseUrl}tasklists/${tasklistId}/tasks.json?page=${startPage}`;
    const headers = this.getReqHeaders(token);

    const options: request.OptionsWithUri = {
      uri,
      method: "GET",
      headers,
      json: true,
      resolveWithFullResponse: true
    };

    try {
      const response = await request(options);
      const tasks = response.body["todo-items"];
      const responseHeaders = response.headers;
      const page = responseHeaders["x-page"];
      const pages = responseHeaders["x-pages"];

      return {
        page,
        pages,
        tasks: tasks.map(task => {
          const estimatedHours = parseInt(task["estimated-minutes"], 10) / 60;
          return {
            id: task.id.toString(),
            name: task.content,
            description: task.description,
            parentId: task.parentTaskId || null,
            estimate: estimatedHours
          };
        })
      };
    } catch (error) {
      return Promise.reject(
        "Unable to get tasks from Teamwork. Please verify your token and task list id and try again later."
      );
    }
  }

  private getReqHeaders(token: string) {
    const encodedToken = new Buffer(`${token}:X`).toString("base64");
    return {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    };
  }
}
