import {
  FIREBASE_PROD_FUNCTIONS,
  FIREBASE_PROD_CONFIG,
  GOOGLE_WEB_CLIENT_ID_PROD
} from "../config/config";

export const environment = {
  production: true,
  apiBaseUrl: FIREBASE_PROD_FUNCTIONS,
  firebase: FIREBASE_PROD_CONFIG,
  webClientId: GOOGLE_WEB_CLIENT_ID_PROD
};
