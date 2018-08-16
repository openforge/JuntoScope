import { FIREBASE_DEV_CONFIG, FIREBASE_DEV_FUNCTIONS } from "../config/config";

export const environment = {
  production: false,
  apiBaseUrl: FIREBASE_DEV_FUNCTIONS,
  firebase: FIREBASE_DEV_CONFIG
};
