import { BaseApi } from "./BaseApi";

const API_PATH = "api/auth/local";

export const Login = async (loginData) => {
    const { data } = await BaseApi.post(`${API_PATH}`, loginData);
    return data;
}

export const Register = async (registerData) => {
    const { data } = await BaseApi.post(`${API_PATH}/register`, registerData);
    return data;
}