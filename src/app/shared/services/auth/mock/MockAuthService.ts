export const MockAuthService: any = {
  fireAuth: jasmine.createSpyObj('auth', {
    signInAnonymously: Promise.reject({
      code: 'auth/operation-not-allowed'
    }).catch(c => console.log(c)),
    // 'signInWithPopup': Promise.reject(),
    // 'signOut': Promise.reject()
  }),
};
