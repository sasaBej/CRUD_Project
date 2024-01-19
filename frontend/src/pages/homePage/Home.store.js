import { makeAutoObservable, runInAction } from "mobx";
import { createContext } from "react";
import { fetchPosts } from "../../api/PostApi";

export class HomeStore {
    postsData = [];

    constructor() {
        makeAutoObservable(this);
    }

    getAllPosts = async () => {
        try {
            const result = await fetchPosts();
            runInAction(() => this.postsData = result.data);
        } catch (error) {
            console.log("error", error)
        }
    }
}

export const homeStore = new HomeStore();
export const HomeStoreContext = createContext(homeStore);