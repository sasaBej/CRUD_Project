import { useEffect, useRef, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { observer } from "mobx-react-lite";
import { ROUTES_CONSTANTS } from "./shared/RoutesConstants";
import { useUserService } from "./services/userService/UseUserService";
import { NavigationBar } from "./components/NavigationBar/NavigationBar";
import Home from "./pages/homePage/Home";
import Register from "./pages/AuthenticationPages/RegisterPage/Register";
import Login from "./pages/AuthenticationPages/LoginPage/Login";
import CreatePost from "./pages/createPost/CreatePost";
import UpdatePost from "./pages/updatePost/UpdatePost";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import NotificationHandling from "./components/ErrorHandling/NotificationHandling";

export const App = observer(() => {
  const { isAuthenticated, isUserInitialized } = useUserService(true);
  const navbarRef = useRef();

  const [remainingHeight, setRemainingHeight] = useState(0);
  const [navbar, setNavbarHeight] = useState(0);

  const updateRemainingHeight = () => {
    if (navbarRef.current) {
      const navbarHeight = navbarRef.current.offsetHeight;
      const windowHeight = window.innerHeight;
      const calculatedRemainingHeight = windowHeight - navbarHeight;
      setRemainingHeight(calculatedRemainingHeight);
      setNavbarHeight(navbarHeight);
    }
  };

  useEffect(() => {
    updateRemainingHeight();

    const handleResize = () => {
      updateRemainingHeight();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [setRemainingHeight, setNavbarHeight, updateRemainingHeight]);


  if (!isUserInitialized()) {
    return null;
  }

  return (
    <>
      <CssBaseline />
      <BrowserRouter>
        <Box sx={{ minHeight: "100vh" }}>
          <NavigationBar ref={navbarRef} />
          <Container maxWidth="lg" disableGutters >
            <Box style={{ height: `${remainingHeight}px`, marginTop: `${navbar}px` }}>
              <NotificationHandling />
              <Routes>
                <Route index element={<Home />} />
                {
                  isAuthenticated() || (
                    <>
                      <Route path={ROUTES_CONSTANTS.LoginRoute} element={<Login />} />
                      <Route path={ROUTES_CONSTANTS.RegisterRoute} element={<Register />} />
                    </>
                  )
                }
                {
                  isAuthenticated() && (
                    <>
                      <Route path={`${ROUTES_CONSTANTS.EditPostRoute}/:postId`} element={<UpdatePost />} />
                      <Route path={ROUTES_CONSTANTS.CreatePostRoute} element={<CreatePost />} />
                    </>
                  )
                }
                <Route path="*" element={<Navigate to={ROUTES_CONSTANTS.BaseRoute} />} />
              </Routes>
            </Box>
          </Container>
        </Box >
      </BrowserRouter >
    </>
  );
})

export default App;