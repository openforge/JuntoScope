"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const request = require("request-promise-native");
const _ = require("lodash");
class TeamworkService {
    validateToken(token) {
        const uri = 'https://authenticate.teamwork.com/authenticate.json';
        const headers = this.getReqHeaders(token);
        const options = {
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
            .catch(error => {
            throw new Error('Unable to authenticate with Teamwork. Please verify your token and try again later.');
        });
    }
    getProjects(token, baseUrl) {
        const uri = `${baseUrl}projects.json`;
        const headers = this.getReqHeaders(token);
        const options = {
            uri,
            method: 'GET',
            headers,
            json: true,
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
                        created: p['created-on'],
                    };
                }),
            };
        })
            .catch(error => {
            throw new Error('Unable to get projects from Teamwork. Please verify your token and  try again later.');
        });
    }
    getTaskLists(token, baseUrl, projectId, page) {
        return __awaiter(this, void 0, void 0, function* () {
            const uri = `${baseUrl}projects/${projectId}/tasklists.json?page=${page}`;
            const headers = this.getReqHeaders(token);
            const options = {
                uri,
                method: 'GET',
                headers,
                json: true,
                resolveWithFullResponse: true,
            };
            return request(options)
                .then(response => {
                const taskLists = response.body.tasklists;
                const responseHeaders = response.headers;
                return {
                    page: responseHeaders['x-page'],
                    pages: responseHeaders['x-pages'],
                    taskLists: taskLists.map(t => {
                        return {
                            id: t.id,
                            name: t.name,
                            description: t.description,
                        };
                    }),
                };
            })
                .catch(error => {
                throw new Error('Unable to get task lists from Teamwork. Please verify your token and project id and  try again later.');
            });
        });
    }
    getTasks(token, baseUrl, tasklistId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const teamworkResponse = yield this.getTasksData(token, baseUrl, tasklistId, 1);
                let tasks = teamworkResponse.tasks;
                if (teamworkResponse.pages > 1) {
                    const promises = [];
                    for (let i = 2; i <= teamworkResponse.pages; i++) {
                        promises.push(this.getTasksData(token, baseUrl, tasklistId, i));
                    }
                    yield Promise.all(promises).then(responses => {
                        responses.forEach(t => {
                            tasks = tasks.concat(t.tasks);
                        });
                    });
                }
                return { tasks: _.keyBy(tasks, 'id') };
            }
            catch (error) {
                throw error;
            }
        });
    }
    getTask(token, baseUrl, taskId) {
        return __awaiter(this, void 0, void 0, function* () {
            const uri = `${baseUrl}tasks/${taskId}.json`;
            const headers = this.getReqHeaders(token);
            const options = {
                uri,
                method: 'GET',
                headers,
                json: true,
            };
            return request(options)
                .then(response => {
                const task = response['todo-item'];
                const estimatedHours = +task['estimated-minutes'] / 60;
                return {
                    id: task.id,
                    name: task.content,
                    description: task.description,
                    parent: task.parentTaskId,
                    estimation: estimatedHours,
                };
            })
                .catch(error => {
                throw new Error('Unable to get task from Teamwork. Please verify your token and task id and try again later.');
            });
        });
    }
    putEstimate(token, baseUrl, taskId, hours) {
        return __awaiter(this, void 0, void 0, function* () {
            const uri = `${baseUrl}tasks/${taskId}.json`;
            const headers = this.getReqHeaders(token);
            const estimatedMinutes = hours * 60;
            const options = {
                uri,
                method: 'PUT',
                headers,
                json: true,
                body: {
                    'todo-item': {
                        'estimated-minutes': `${estimatedMinutes}`,
                    },
                },
            };
            return request(options)
                .then(response => {
                return true;
            })
                .catch(error => {
                throw new Error('Unable to update task on Teamwork. Please verify your token and task id try again later.');
            });
        });
    }
    getTasksData(token, baseUrl, tasklistId, startPage) {
        return __awaiter(this, void 0, void 0, function* () {
            const uri = `${baseUrl}tasklists/${tasklistId}/tasks.json?page=${startPage}`;
            const headers = this.getReqHeaders(token);
            const options = {
                uri,
                method: 'GET',
                headers,
                json: true,
                resolveWithFullResponse: true,
            };
            try {
                const response = yield request(options);
                const tasks = response.body['todo-items'];
                const responseHeaders = response.headers;
                const page = responseHeaders['x-page'];
                const pages = responseHeaders['x-pages'];
                return {
                    page,
                    pages,
                    tasks: tasks.map(task => {
                        const estimatedHours = parseInt(task['estimated-minutes'], 10) / 60;
                        return {
                            id: task.id.toString(),
                            name: task.content,
                            description: task.description,
                            parentId: task.parentTaskId || null,
                            estimate: estimatedHours,
                        };
                    }),
                };
            }
            catch (error) {
                return Promise.reject('Unable to get tasks from Teamwork. Please verify your token and task list id and try again later.');
            }
        });
    }
    getReqHeaders(token) {
        const encodedToken = new Buffer(`${token}:X`).toString('base64');
        return {
            'Content-Type': 'application/json',
            Authorization: `BASIC ${encodedToken}`,
        };
    }
}
exports.TeamworkService = TeamworkService;
//# sourceMappingURL=teamwork.service.js.map