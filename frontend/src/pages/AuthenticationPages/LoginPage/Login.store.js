import { makeAutoObservable } from "mobx";
import { createContext } from "react";
import { Login } from "../../../api/AuthenticationAPI";
import { userServiceStore } from "../../../services/userService/UserService.store";
import { notificationStore } from "../../../components/ErrorHandling/NotificationHandling.store";

export class LoginStore {
    loginData = {
        identifier: "",
        password: ""
    };

    constructor() {
        makeAutoObservable(this);
    }

    setIdentifierValue = (value) => this.loginData.identifier = value;
    setPasswordValue = (value) => this.loginData.password = value;

    reset = () => {
        this.loginData.identifier = "";
        this.loginData.password = "";
    }

    loginUser = async () => {
        try {
            const result = await Login(this.loginData);
            userServiceStore.setUserData(result);
        } catch (error) {
            // here we can add error message from backend, now I cannot define the port adn the message and I get the default error message from strapi 
            notificationStore.setErrorMessage(error.response.data.error.message);
            notificationStore.setSeverity("error");
            notificationStore.setSnackBar(true);
        }
    }
};

export const loginStore = new LoginStore();
export const LoginStoreContext = createContext(loginStore);