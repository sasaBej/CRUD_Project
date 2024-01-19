import { forwardRef } from "react";
import { useNavigate } from 'react-router-dom';
import { observer } from "mobx-react-lite";
import { ROUTES_CONSTANTS } from "../../shared/RoutesConstants";
import { useUserService } from '../../services/userService/UseUserService';
import { NavigationBarItem } from "./NavigationBarItem";
import { Box } from '@mui/material';
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'

export const NavigationBar = observer(forwardRef((_, ref) => {
  const { isAuthenticated, clearUserData } = useUserService();

  const navigate = useNavigate();

  const handleAddPost = async () => {
    const access = isAuthenticated();

    if (access) {
      navigate(ROUTES_CONSTANTS.CreatePostRoute);
    } else {
      navigate(ROUTES_CONSTANTS.LoginRoute);
    }
  };

  return (
    <Box style={{ flexGrow: 1, zIndex: "100", position: "fixed", width: "100%", top: "0" }} ref={ref}>
      <AppBar position="static" sx={{ bgcolor: "#16883c", display: "flex" }}>
        <Toolbar>
          <NavigationBarItem
            fGrow={1}
            variant="h6"
            url={ROUTES_CONSTANTS.BaseRoute}
            text="Home"
          />
          <NavigationBarItem
            url={ROUTES_CONSTANTS.CreatePostRoute}
            text="Add Post"
            onClick={handleAddPost}
          />
          {
            !isAuthenticated() ? (
              <NavigationBarItem
                url={ROUTES_CONSTANTS.LoginRoute}
                text="Login"
              />
            ) : (
              <NavigationBarItem
                url={ROUTES_CONSTANTS.LoginRoute}
                text="Logout"
                onClick={clearUserData}
              />
            )
          }
        </Toolbar>
      </AppBar>
    </Box >
  );
}));