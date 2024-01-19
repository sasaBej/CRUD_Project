import { useContext, useEffect } from "react";
import { observer } from "mobx-react-lite";
import { HomeStoreContext } from "./Home.store";
import Post from "../../components/PostComponent/Post";
import { Box } from "@mui/material";

const Home = observer(() => {
    const {
        getAllPosts,
        postsData
    } = useContext(HomeStoreContext);

    useEffect(() => {
        getAllPosts();

    }, [getAllPosts])

    return (
        <Box sx={{
            minHeight: "100%",
            padding: "1rem",
            display: "flex",
            gap: "1rem",
            flexDirection: "column",
            alignItems: "center",
        }}>
            {
                postsData.map((postData) => (
                    <Post props={postData} key={postData.id} />
                ))
            }
        </Box>
    )
});

export default Home;