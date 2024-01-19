import { useCallback, useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { observer } from "mobx-react-lite";
import { useNavigate } from "react-router-dom";
import { UpdatePostContext } from "./UpdatePost.store";
import { ROUTES_CONSTANTS } from "../../shared/RoutesConstants";
import { Box, Button, MenuItem, Select, TextField, Typography } from "@mui/material";
import CircularProgress from '@mui/material/CircularProgress';

const UpdatePost = observer(() => {
    const {
        onePost,
        getPost,
        editedPost,
        setEditAuthor,
        setEditDescription,
        setEditTitle,
        setEditType,
        updatePost,
        loading,
        setLoading,
        deletePost
    } = useContext(UpdatePostContext);

    const { postId } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            await getPost(postId);
            setLoading(false);
        };

        fetchData();
    }, [getPost, postId, setLoading]);

    useEffect(() => {
        if (onePost) {
            setEditTitle(onePost.title || '');
            setEditAuthor(onePost.author || '');
            setEditDescription(onePost.description || '');
            setEditType(onePost.type || '');
        }
    }, [onePost, setEditTitle, setEditAuthor, setEditDescription, setEditType]);

    const editPost = useCallback(async () => {
        const postIsEdited = await updatePost(postId);

        if (postIsEdited) {
            navigate(ROUTES_CONSTANTS.BaseRoute);
        }
    }, [navigate, updatePost, postId]);

    const removePost = useCallback(async () => {
        const postIsDeleted = await deletePost(postId);

        if (postIsDeleted) {
            navigate(ROUTES_CONSTANTS.BaseRoute);
        }
    }, [navigate, deletePost, postId]);

    if (loading) {
        return (
            <Box sx={{ height: "100%", display: 'flex', justifyContent: "center", alignItems: "center" }}>
                <CircularProgress />
            </Box>
        )
    };

    return (
        <Box sx={{
            minHeight: "100%",
            padding: "1rem",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
        }}>
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "1rem",
                    maxWidth: "800px",
                    width: "100%",
                    backgroundColor: "#e8e8e8",
                    padding: "2rem",
                    borderRadius: "6px",

                }}
            >
                <Typography variant="h6">Edit a post:</Typography>
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "flex-start",
                        gap: "1rem",

                        '@media (max-width: 800px)': {
                            flexDirection: "column",
                        },
                    }}>
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            gap: ".3rem",
                            width: "60%",

                            '@media (max-width: 800px)': {
                                width: "100%"
                            },
                        }}
                    >
                        {/* ResizeObserver loop completed with undelivered notifications (when resizing view with TextArea with scroll inside) #39105 */}
                        {/* // A solution */}
                        {/* // InputProps={{
                        //     // maxRows: 10,
                        //     multiline: true,
                        //     inputComponent: 'textarea',
                        // }} */}
                        <Typography>Title:</Typography>
                        <TextField
                            value={editedPost.title}
                            onChange={e => setEditTitle(e.target.value)}
                            placeholder="Maximum 50 characters."
                            required
                            multiline
                            minRows={2}
                            fullWidth
                            style={{
                                backgroundColor: "#fff"
                            }}
                            inputProps={{
                                maxLength: 50,
                            }}
                        />
                    </Box>
                    <Box sx={{
                        minWidth: 120,
                        display: "flex",
                        flexDirection: "column",
                        gap: "0.3rem",

                        '@media (max-width: 800px)': {
                            alignSelf: "end"
                        },
                    }}>
                        <Typography>Types:</Typography>
                        <Select
                            value={editedPost.type}
                            onChange={e => setEditType(e.target.value)}
                            required
                            style={{
                                backgroundColor: "#fff"
                            }}
                        >
                            <MenuItem value="comedy">Comedy</MenuItem>
                            <MenuItem value="adventure">Adventure</MenuItem>
                            <MenuItem value="science">Science</MenuItem>
                            <MenuItem value="education">Education</MenuItem>
                        </Select>
                    </Box>
                </Box>
                <Box sx={{ minWidth: 120, display: "flex", flexDirection: "column", gap: "0.3rem" }}>
                    <Typography>Description:</Typography>
                    <TextField
                        value={editedPost.description}
                        onChange={e => setEditDescription(e.target.value)}
                        multiline
                        required
                        placeholder="Maximum 255 characters."
                        minRows={3}
                        style={{
                            backgroundColor: "#fff",
                        }}
                        inputProps={{
                            maxLength: 255,
                        }}
                    />
                </Box>
                <Box sx={{ minWidth: 120, display: "flex", flexDirection: "column", gap: "0.3rem" }}>
                    <Typography>Author:</Typography>
                    <TextField
                        value={editedPost.author}
                        onChange={e => setEditAuthor(e.target.value)}
                        placeholder="Maximum 50 characters."
                        multiline
                        inputProps={{
                            maxLength: 50,
                        }}
                        style={{
                            backgroundColor: "#fff",
                        }}
                    />
                </Box>
                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                    <Button
                        onClick={removePost}
                        style={{
                            backgroundColor: "red",
                            alignSelf: "end"
                        }}
                        variant="contained">
                        Delete
                    </Button>
                    <Button
                        onClick={editPost}
                        style={{
                            backgroundColor: "#0a6a29",
                            alignSelf: "end"
                        }}
                        variant="contained">
                        Edit
                    </Button>
                </Box>
            </Box>
        </Box >
    )
});

export default UpdatePost;