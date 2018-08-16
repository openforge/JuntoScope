import {
  FIREBASE_PROD_FUNCTIONS,
  FIREBASE_PROD_CONFIG
} from "../config/config";

export const environment = {
  production: true,
  apiBaseUrl: FIREBASE_PROD_FUNCTIONS,
  firebase: FIREBASE_PROD_CONFIG
};
