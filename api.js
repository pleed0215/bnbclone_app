import axios from "axios";

//const URL = "http://127.0.0.1:8000/";
const URL = "http://222.104.218.3:8000/";
const API_VERSION_ROUTE = "api/v1/";

const USERS_ROUTES = {
  users: "users/",
  login: "users/login/",
  logout: "users/logout/",
  me: "users/me/",
  update: "users/update/",
  partialUpdate: "users/partial_update",
  toggleFavs: (id) => `users/${id}/favs/`,
  favs: (id) => `users/${id}/favs/`,
};

const ROOMS_ROUTE = {
  rooms: (page = 1) => `rooms/?page=${page}`,
  create: "rooms/create/",
  search: "rooms/search/",
};

const makeUrl = (route) => `${URL}${API_VERSION_ROUTE}${route}`;
const callApi = async (method, path, data, jwt, url = false) => {
  const headers = {
    Authorization: `X-JWT ${jwt}`,
    "Content-Type": "application/json",
  };

  if (method === "get" || method === "delete") {
    return axios[method](!url ? makeUrl(path) : path, {
      headers,
      params: data,
    });
  } else {
    return axios[method](!url ? makeUrl(path) : path, data, { headers });
  }
};

export const createAccount = (form) =>
  callApi("post", USERS_ROUTES.users, form);
export const userLogin = (form) => callApi("post", USERS_ROUTES.login, form);

export default {
  createAccount: (form) => callApi("post", USERS_ROUTES.users, form),
  userLogin: (form) => callApi("post", USERS_ROUTES.login, form),
  rooms: (page = 1, jwt = "") =>
    callApi("get", ROOMS_ROUTE.rooms(page), null, jwt),
  getFavs: (id, jwt) => callApi("get", USERS_ROUTES.favs(id), null, jwt),
  toggleFavs: (id, jwt) =>
    callApi("put", USERS_ROUTES.toggleFavs(id), null, jwt),
  search: (jwt, form) => callApi("get", ROOMS_ROUTE.search, form, jwt),
  callApi: (method, path, data, jwt, url) =>
    callApi(method, path, data, jwt, url),
};
