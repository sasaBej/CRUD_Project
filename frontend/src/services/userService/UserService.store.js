import { makeAutoObservable } from "mobx";
import { createContext } from "react";

export class UserServiceStore {
    userData = undefined;

    constructor() {
        makeAutoObservable(this);
    }

    isUserInitialized = () => this.userData !== undefined;

    isAuthenticated = () => !!this.userData;

    setUserData = (user) => {
        this.userData = user;
        sessionStorage.setItem("user", JSON.stringify(user));
    }

    clearUserData = () => {
        this.userData = null;
        sessionStorage.removeItem("user");
    }

    initialize = () => {
        const userDataAsString = sessionStorage.getItem("user");
        this.userData = userDataAsString && JSON.parse(userDataAsString);
    }
}

export const userServiceStore = new UserServiceStore();
export const UserServiceContext = createContext(userServiceStore);