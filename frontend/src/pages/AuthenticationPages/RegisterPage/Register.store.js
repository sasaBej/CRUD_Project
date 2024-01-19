import { makeAutoObservable } from "mobx";
import { createContext } from "react";
import { Register } from "../../../api/AuthenticationAPI";
import { userServiceStore } from "../../../services/userService/UserService.store";
import { notificationStore } from "../../../components/ErrorHandling/NotificationHandling.store";

const Empty_Data = {
    username: "",
    email: "",
    password: ""
};

const Empty_ErrorData = {
    username: {
        message: ""
    }
}

export class RegisterStore {
    userData = Empty_Data;
    errorData = Empty_ErrorData;

    constructor() {
        makeAutoObservable(this);
    }

    reset = () => {
        this.userData = Empty_Data;
    }

    setUsername = value => this.userData.username = value;
    setEmail = value => this.userData.email = value;
    setPassword = value => this.userData.password = value;

    setUsernameError = value => this.errorData.username.message = value;

    registerUser = async () => {
        try {
            const result = await Register(this.userData);
            userServiceStore.setUserData(result);
            notificationStore.setErrorMessage("Successful registration");
            notificationStore.setSeverity("success");
            notificationStore.setSnackBar(true);
        } catch (error) {
            // here we can add error message from backend, now I cannot define the port adn the message and I get the default error message from strapi 
            notificationStore.setErrorMessage(error.response.data.error.message);
            notificationStore.setSeverity("error");
            notificationStore.setSnackBar(true);
        }
    }

}

export const registerStore = new RegisterStore();
export const RegisterContext = createContext(registerStore);