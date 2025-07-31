export let navigate = (route: string, redirect: { state: { redirectUrl: string; }; }) => {};

export const setNavigate = (fn: (route: string, redirect: { state: { redirectUrl: string; }; }) => void) => {
  console.log("setNavigate called with function:", fn);
  navigate = fn;
};