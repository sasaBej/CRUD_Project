import axios from "axios";
import { userServiceStore } from "../services/userService/UserService.store";

const httpConfig = {
    baseURL: 'http://localhost:1337/',
    timeout: 50000,
    headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
    }
};

export const getAuthorizationHeader = () => ({ headers: { Authorization: `Bearer ${userServiceStore.userData?.jwt}` } });

export const BaseApi = axios.create(httpConfig);