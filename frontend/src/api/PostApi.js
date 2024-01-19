import { BaseApi, getAuthorizationHeader } from "./BaseApi";

const API_PATH = "api/posts";

export const fetchPost = async (id) => {
    const { data } = await BaseApi.get(`${API_PATH}/${id}`, getAuthorizationHeader());
    return data;
};

export const fetchPosts = async () => {
    const { data } = await BaseApi.get(API_PATH);
    return data;
};

export const createPost = async (post) => {
    await BaseApi.post(API_PATH, post, getAuthorizationHeader());
};

export const updatePost = async (post, id) => {
    const { data } = await BaseApi.put(`${API_PATH}/${id}`, post, getAuthorizationHeader());
    return data;
};
export const deleteOnePost = async (id) => {
    await BaseApi.delete(`${API_PATH}/${id}`, getAuthorizationHeader());
};