import { useContext, useEffect } from "react";
import { observer } from "mobx-react-lite";
import { Link, useNavigate } from "react-router-dom";
import { LoginStoreContext } from "./Login.store";
import { useUserService } from "../../../services/userService/UseUserService";
import { ROUTES_CONSTANTS } from "../../../shared/RoutesConstants";
import { Box, Button, Container, TextField, Typography } from "@mui/material";

const Login = observer(() => {
    const {
        loginData,
        reset,
        setIdentifierValue,
        setPasswordValue,
        loginUser
    } = useContext(LoginStoreContext);

    const { isAuthenticated } = useUserService();

    const navigate = useNavigate();

    const handleClick = async () => {
        await loginUser();
        if (isAuthenticated()) {
            navigate(ROUTES_CONSTANTS.BaseRoute);
        }
    }

    useEffect(() => {
        return () => {
            reset();
        };
    }, [reset]);

    return (
        <Box sx={{
            minHeight: "100%",
            padding: "1rem 0",
            display: "flex",
            justifyContent: "center",
            alignItems: "center", bgcolor: "white",
        }}>
            <Container maxWidth="xs" disableGutters >
                <Box
                    style={{
                        backgroundColor: "#e8e8e8",
                        maxWidth: "23rem",
                        display: "flex",
                        gap: "1rem",
                        flexDirection: "column",
                        padding: "2rem",
                        borderRadius: "6px",
                    }}>
                    <TextField
                        style={{
                            backgroundColor: "#ffffff"
                        }}
                        value={loginData.identifier}
                        onChange={(event) => setIdentifierValue(event.target.value)}
                        label="Username"
                        placeholder="Username or email"
                        type="text"
                        required
                        fullWidth
                        inputProps={{ maxLength: 100 }}
                    />
                    <TextField
                        style={{
                            backgroundColor: "#ffffff"
                        }}
                        value={loginData.password}
                        onChange={(event) => setPasswordValue(event.target.value)}
                        label="Password"
                        type="password"
                        required
                        fullWidth
                        inputProps={{ maxLength: 100 }}
                    />
                    <Button
                        style={{
                            backgroundColor: "#0a6a29",
                        }}
                        variant="contained"
                        onClick={handleClick}
                    >
                        Login
                    </Button>
                    <Box
                        style={{ display: "flex", gap: ".5rem", justifyContent: "center" }}
                    >
                        <Typography>
                            New here?
                        </Typography>
                        <Link to={ROUTES_CONSTANTS.RegisterRoute}>
                            Create an account
                        </Link>
                    </Box>
                </Box>
            </Container >
        </Box >
    )
});

export default Login;