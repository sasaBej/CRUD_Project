import { Box, Button, Container, TextField, Typography } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { ROUTES_CONSTANTS } from "../../../shared/RoutesConstants";
import { useContext, useEffect } from "react";
import { RegisterContext } from "./Register.store";
import { observer } from "mobx-react-lite";
import { useUserService } from "../../../services/userService/UseUserService";

const Register = observer(() => {
    const {
        registerUser,
        reset,
        setEmail,
        setPassword,
        setUsername,
        userData
    } = useContext(RegisterContext);

    const { isAuthenticated } = useUserService();

    const navigate = useNavigate();

    const handleClick = async () => {
        await registerUser();
        if (isAuthenticated()) {
            navigate(ROUTES_CONSTANTS.LoginRoute);
        }
    };

    useEffect(() => {
        return () => {
            reset();
        };
    }, [reset]);

    return (
        <Box sx={{
            minHeight: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center", bgcolor: "white",
            padding: "1rem 0"
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
                        value={userData.username}
                        onChange={e => setUsername(e.target.value)}
                        style={{
                            backgroundColor: "#ffffff"
                        }}
                        label="Username"
                        type="text"
                        required
                        fullWidth />
                    <TextField
                        value={userData.email}
                        onChange={e => setEmail(e.target.value)}
                        style={{
                            backgroundColor: "#ffffff"
                        }}
                        label="Email"
                        type="email"
                        required
                        fullWidth />
                    <TextField
                        value={userData.password}
                        onChange={e => setPassword(e.target.value)}
                        style={{
                            backgroundColor: "#ffffff"
                        }}
                        label="Password"
                        type="password"
                        required
                        fullWidth />
                    <Button
                        onClick={handleClick}
                        style={{
                            backgroundColor: "#0a6a29",
                        }}
                        variant="contained" >Register</Button>
                    <Box

                        style={{ display: "flex", gap: ".5rem", justifyContent: "center" }}
                    >
                        <Typography>
                            Already have an account?
                        </Typography>
                        <Link to={ROUTES_CONSTANTS.LoginRoute}>
                            Login
                        </Link>
                    </Box>
                </Box>
            </Container >
        </Box >
    )
});

export default Register;