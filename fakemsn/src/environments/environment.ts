// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  firebase: {
    apiKey: 'AIzaSyAbXZ8GJBY_9NoNA-v5ACMoajqywP9M9gc',
    authDomain: 'fakessenger.firebaseapp.com',
    databaseURL: 'https://fakessenger.firebaseio.com',
    projectId: 'fakessenger',
    storageBucket: 'fakessenger.appspot.com',
    messagingSenderId: '71506136147'
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
