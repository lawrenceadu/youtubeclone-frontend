import { rootState } from ".";

export const login = (state, dispatch, payload) => {
  return { user: payload, isAuthenticated: true };
};

export const logout = () => {
  return rootState;
};

export const setToken = (accessToken) =>
  (localStorage["access_token"] = accessToken);
