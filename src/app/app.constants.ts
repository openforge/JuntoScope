import { InAppBrowserOptions } from "@ionic-native/in-app-browser";

export const MORE_INFO_NEEDED = 0;
export const NOT_APPLICABLE = -1;

// Time for seconds to show task result view before auto navigating to next task
export const TIMER_FOR_NEXT_TASK = 5000;

export const IAB_OPTIONS: InAppBrowserOptions = {
  location: "no",

  // Android Only
  zoom: "no",
  hardwareback: "no",
  shouldPauseOnSuspend: "yes",

  // iOS Only
  closebuttoncaption: "Close"
};
