import axios from "axios";

const URL = "http://127.0.0.1:8000/";
const API_VERSION_ROUTE = "api/v1/";

const USERS_ROUTES = {
    users: "users/",
    login: "users/login/",
    logout: "users/logout/",
    me: "users/me/",
    update: "users/update/",
    partialUpdate: "users/partial_update",
    toggleFavs: "users/toggle_favs",
    favs: (id) => `users/${id}/favs`,
}

const ROOMS_ROUTE = {
    rooms: "rooms/",
    create: "rooms/create",
    search: "rooms/search",
}

const makeUrl = (route) => `${URL}${API_VERSION_ROUTE}${route}`;
const callApi = async (method, path, data, jwt) => {
    const headers = {
        Authorization: jwt,
        "Content-Type": "application/json"
    }
    
    if (method === "get" || method === "delete") {
        return axios[method](makeUrl(path), { headers });
    } else {
        return axios[method](makeUrl(path), data, { headers });
    }
}

export const createAccount = form => callApi("post", USERS_ROUTES.users, form);