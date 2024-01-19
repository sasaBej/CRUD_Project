import { createContext } from "react";
import { makeAutoObservable } from "mobx";
import { createPost } from "../../api/PostApi";
import { notificationStore } from "../../components/ErrorHandling/NotificationHandling.store";

const EMPTY_POST = {
    title: "",
    description: "",
    type: "",
    author: ""
};

export class CreatePostStore {
    post = EMPTY_POST;

    constructor() {
        makeAutoObservable(this);
    }

    setTitle = (value) => this.post.title = value;
    setDescription = (value) => this.post.description = value;
    setType = (value) => this.post.type = value;
    setAuthor = (value) => this.post.author = value;

    reset = () => {
        this.post = EMPTY_POST;
    }

    addPost = async () => {
        try {
            await createPost({ data: { ...this.post } });
        } catch (error) {
            notificationStore.setErrorMessage(error.response.data.error.message);
            notificationStore.setSeverity("error");
            notificationStore.setSnackBar(true);
        }
    }
};

export const createPostStore = new CreatePostStore();
export const CreatePostContext = createContext(createPostStore);