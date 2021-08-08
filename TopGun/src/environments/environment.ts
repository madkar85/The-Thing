// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  authenticate_url: 'https://localhost:44365/miraclemile/authenticate',
  refreshToken_url: 'https://localhost:44365/miraclemile/newToken',
  register_url: 'https://localhost:44365/miraclemile/registerUser',
  update_user_url: 'https://localhost:44365/miraclemile/updateUser',
  get_user_url: 'https://localhost:44365/miraclemile/getUser',
  aktiebolag_url: 'https://localhost:44365/miraclemile/aktiebolag',
  upload_files_url: 'https://localhost:44365/miraclemile/upload'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
