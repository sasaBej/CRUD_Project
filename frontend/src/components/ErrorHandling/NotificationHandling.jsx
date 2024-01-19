import { useContext } from "react";
import { Alert, Snackbar } from "@mui/material";
import { observer } from "mobx-react-lite";
import { NotificationContext } from "./NotificationHandling.store";

const NotificationHandling = observer(() => {
    const {
        setSnackBar,
        snackBar,
        severity,
        errorMessage
    } = useContext(NotificationContext);

    const handleClose = (_, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setSnackBar(!snackBar);
    };

    return (
        <Snackbar open={snackBar} autoHideDuration={5000} onClose={handleClose}>
            <Alert
                onClose={handleClose}
                severity={severity.toLocaleLowerCase()}
                variant="filled"
                sx={{ width: '100%' }}
            >
                {errorMessage}
            </Alert>
        </Snackbar>

    )
});

export default NotificationHandling;