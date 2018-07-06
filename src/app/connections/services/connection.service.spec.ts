import { TestBed, inject } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { ConnectionService } from './connection.service';

import { AppFacade } from '../../state/app.facade';
import { AppFacadeMock } from './../../mocks/facades/app-facade.mock';
import { Observable } from 'rxjs/Observable';

import { AngularFirestore } from 'angularfire2/firestore';
import { AngularFirestoreMock } from './../../mocks/angularfire/firestore.mock';
import { HttpClient } from '@angular/common/http';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { environment } from '../../../environments/environment';

import { cold, getTestScheduler } from 'jasmine-marbles';

describe('ConnectionService', () => {
  let service: ConnectionService;
  let httpClient: HttpClient;
  let httpMock: HttpTestingController;
  let angularFirestore: AngularFirestore;
  // let appFacade: AppFacade;

  const collectionStub = {
    valueChanges: jasmine
      .createSpy('valueChanges')
      .and.returnValue(Observable.from([])),
  };
  const angularFirestoreStub = {
    collection: jasmine
      .createSpy('collection')
      .and.returnValue(this.collectionStub),
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        ConnectionService,
        AppFacade,
        {
          provide: AppFacade,
          useValue: AppFacadeMock,
        },
        {
          provide: AngularFirestore,
          useValue: angularFirestoreStub,
        },
        {
          provide: AppFacade,
          useValue: AppFacadeMock,
        },
      ],
    });

    service = TestBed.get(ConnectionService);
    httpClient = TestBed.get(HttpClient);
    httpMock = TestBed.get(HttpTestingController);
    angularFirestore = TestBed.get(AngularFirestore);
  });

  it('Should create service', () => {
    expect(service).toBeTruthy();
  });

  describe('Functions', () => {
    describe('addConnection()', () => {
      it('Should make a post request with the connection', () => {
        const testConnection: any = {
          id: 'djd8277',
          type: 'any',
          token: 'testToken287',
          externalData: [],
          projects: [
            {
              id: 'gh3e773',
              name: 'JuntoScope',
            },
          ],
        };

        service.addConnection(testConnection).subscribe(data => {
          expect(data).toEqual(testConnection);
        });

        const req = httpMock.expectOne(
          `${environment.apiBaseUrl}/connections`,
          testConnection
        );

        expect(req.request.method).toEqual('POST');
      });
    });

    describe('getProjects()', () => {
      it('Should make a get request with the connection id', () => {
        const testProject: any = [
          {
            id: 'gh3e773',
            name: 'JuntoScope',
            taskLists: [
              {
                id: 'hsh299',
                name: 'Test JuntoScope Task',
              },
            ],
          },
          {
            id: 'djsi081',
            name: 'OpenForaging',
            taskLists: [
              {
                id: 'yds929',
                name: 'Test Task',
              },
            ],
          },
        ];
        // Assign
        const connectionId = 'eyt6223';
        // Act
        service.getProjects(connectionId).subscribe(data => {
          expect(data).toEqual(testProject);
        });

        const req = httpMock.expectOne(
          `${environment.apiBaseUrl}/connections/${connectionId}/projects/`
        );

        expect(req.request.method).toEqual('GET');
      });
    });

    describe('getTaskLists()', () => {
      it('Should make a get request with the project id and associated task lists', () => {
        const testTaskLists: any = [
          {
            id: 'yds929',
            name: 'Test Task',
          },
          {
            id: 'yds930',
            name: 'Test Task 2',
          },
        ];
        // Assign
        const connectionId = 'cid282';
        const projectId = 'skh8292';
        // Act
        service.getTaskLists(connectionId, projectId).subscribe(data => {
          expect(data).toEqual(testTaskLists);
        });
        // Assert
        const req = httpMock.expectOne(
          `${
            environment.apiBaseUrl
          }/connections/${connectionId}/projects/${projectId}/taskLists`
        );

        expect(req.request.method).toEqual('GET');
      });
    });

    describe('getConnections()', () => {
      xit('Should create an afs collection', () => {
        // Revisit
        jasmine
          .createSpy('connectionsClnPath$')
          .and.returnValue(cold('--x|', { x: [{ id: 1 }] }));

        service.getConnections().subscribe(() => {
          expect(angularFirestoreStub.collection).toHaveBeenCalled();
        });
      });
    });

    describe('createSession()', () => {
      it('Should make a post request with the session', () => {
        // Assign
        const testConnectionId = 'dk29811';
        const testProjectId = 'sjb2b21';
        const testTaskListIds = ['sjb2b21', 'sjb2b21', 'sjb2b21'];

        // Act
        service
          .createSession(testConnectionId, testProjectId, testTaskListIds)
          .subscribe(data => {});

        const req = httpMock.expectOne(
          `${
            environment.apiBaseUrl
          }/connections/${testConnectionId}/projects/${testProjectId}/sessions`
        );

        expect(req.request.method).toEqual('POST');
      });
    });

    afterEach(() => {
      // After every test, assert that there are no more pending requests.
      httpMock.verify();
    });
  });
});
