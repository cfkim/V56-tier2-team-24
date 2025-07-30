export let navigate = (p0: string, p1: { state: { redirectUrl: string; }; }) => {};

export const setNavigate = (fn) => {
  navigate = fn;
};