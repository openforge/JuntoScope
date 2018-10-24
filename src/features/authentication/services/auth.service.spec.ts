// import { TestBed, inject, async } from "@angular/core/testing";

// import { BehaviorSubject } from "rxjs/BehaviorSubject";

// import { AngularFireAuth } from "angularfire2/auth";

// import { cold, hot } from "jest-marbles";

// import { ConfigureFn, configureTests } from "../../../test/jest-test.helper";
// import { AuthService } from "./auth.service";
// import { User } from "../../../models/user";
// const testUser: User = { uid: "testUid", displayName: "testName" };

// class MockAngularFireAuth {
//   authState = new BehaviorSubject(null);
//   auth = {
//     signInWithPopup: jest.fn(provider => {
//       this.authState.next(testUser);
//       return Promise.resolve();
//     }),
//     signOut: jest.fn(() => {
//       this.authState.next(null);
//       return Promise.resolve();
//     })
//   };
// }

// describe("AuthService", () => {
//   let afAuth: AngularFireAuth;
//   let service: AuthService;

//   beforeEach(async(() => {
//     const configure: ConfigureFn = testBed => {
//       testBed.configureTestingModule({
//         providers: [
//           {
//             provide: AngularFireAuth,
//             useClass: MockAngularFireAuth
//           },
//           AuthService
//         ]
//       });
//     };

//     configureTests(configure).then(testBed => {
//       afAuth = testBed.get(AngularFireAuth);
//       service = testBed.get(AuthService);
//     });
//   }));

//   it("should be created", () => {
//     expect(service instanceof AuthService).toBe(true);
//   });

//   describe("Method: login", () => {
//     it("should default to `google` provider", () => {
//       let actualProviderId: string;
//       const expectedProviderId = "google.com";
//       jest
//         .spyOn(afAuth.auth, "signInWithPopup")
//         .mockImplementation(provider => {
//           actualProviderId = provider.providerId;
//         });

//       service.login(""); // Might fail

//       expect(actualProviderId).toEqual(expectedProviderId);
//     });

//     it("should throw with unknown providers", () => {
//       const act = service.login("unknown");

//       expect(act).rejects.toEqual(Error("Unknown AuthProvider Passed"));
//     });
//   });

//   describe("Method: getUser", () => {
//     it("should observe mapped user from AF authState changes", () => {
//       const firebaseUser = { ...testUser, email: "test@email.com" };
//       const expected = cold("n-u-n", { n: null, u: testUser });
//       Object.defineProperty(afAuth, "authState", {
//         get: () => hot("n-u-n", { n: null, u: firebaseUser })
//       });

//       const actual = service.getUser();

//       expect(actual).toBeObservable(expected);
//     });
//   });

//   describe("Method: logout", () => {
//     it("should signout from AF", () => {
//       jest.spyOn(afAuth.auth, "signOut");

//       service.logout();

//       expect(afAuth.auth.signOut).toHaveBeenCalled();
//     });
//   });
// });
