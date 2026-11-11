// Whether this page load has navigated inside the app. Back goes to the previous page only then; a cold launch on a reader page has nothing in-app behind it.
let navigated = false;
export const markNavigated = () => { navigated = true; };
export const hasAppHistory = () => navigated;
