import {
  FIREBASE_DEV_CONFIG,
  FIREBASE_DEV_FUNCTIONS,
  GOOGLE_WEB_CLIENT_ID_DEV
} from "../config/config";

export const environment = {
  production: false,
  apiBaseUrl: FIREBASE_DEV_FUNCTIONS,
  firebase: FIREBASE_DEV_CONFIG,
  webClientId: GOOGLE_WEB_CLIENT_ID_DEV
};
