export let navigate = (
  _route: string,
  _redirect: { state: { redirectUrl: string } },
) => {};

export const setNavigate = (
  fn: (route: string, redirect: { state: { redirectUrl: string } }) => void,
) => {
  navigate = fn;
};
