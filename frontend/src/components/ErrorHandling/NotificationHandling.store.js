import { makeAutoObservable } from "mobx";
import { createContext } from "react";

export class NotificationStore {
    snackBar = false;
    severity = "success";
    errorMessage = "";

    constructor() {
        makeAutoObservable(this);
    }

    setSnackBar = (value) => this.snackBar = value;
    setSeverity = (value) => this.severity = value;
    setErrorMessage = (value) => this.errorMessage = value;
}

export const notificationStore = new NotificationStore();
export const NotificationContext = createContext(notificationStore);