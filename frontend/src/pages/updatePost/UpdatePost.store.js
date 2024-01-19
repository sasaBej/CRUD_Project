import { makeAutoObservable } from "mobx";
import { createContext } from "react";
import { deleteOnePost, fetchPost, updatePost } from "../../api/PostApi";
import { notificationStore } from "../../components/ErrorHandling/NotificationHandling.store";

const EMPTY_POST = {
    title: "",
    description: "",
    type: "",
    author: ""
};

export class UpdatePostStore {
    onePost = {};
    editedPost = EMPTY_POST;
    loading = true;

    constructor() {
        makeAutoObservable(this);
    }

    setLoading = value => this.loading = value;
    setEditTitle = (value) => this.editedPost.title = value;
    setEditDescription = (value) => this.editedPost.description = value;
    setEditType = (value) => this.editedPost.type = value;
    setEditAuthor = (value) => this.editedPost.author = value;


    getPost = async (id) => {
        try {
            const result = await fetchPost(id);
            this.onePost = result.data?.attributes;
        } catch (error) {
            notificationStore.setErrorMessage(error.response.data.error.message);
            notificationStore.setSeverity("error");
            notificationStore.setSnackBar(true);
        }
    }

    updatePost = async (id) => {
        try {
            await updatePost({ data: { ...this.editedPost } }, id);
            // modify component error, It have to be used also with green notification
            notificationStore.setErrorMessage("Post updated!");
            notificationStore.setSeverity("success");
            notificationStore.setSnackBar(true);
            return true;
        } catch (error) {
            notificationStore.setErrorMessage(error.response.data.error.message);
            notificationStore.setSeverity("error");
            notificationStore.setSnackBar(true);
        }
    }

    deletePost = async (id) => {
        try {
            await deleteOnePost(id);
            // modify component error, It have to be used also with green notification
            notificationStore.setErrorMessage("Post Deleted!");
            notificationStore.setSeverity("success");
            notificationStore.setSnackBar(true);
            return true;
        } catch (error) {
            notificationStore.setErrorMessage(error.response.data.error.message);
            notificationStore.setSeverity("error");
            notificationStore.setSnackBar(true);
        }
    }
}

export const updatePostStore = new UpdatePostStore();
export const UpdatePostContext = createContext(updatePostStore);