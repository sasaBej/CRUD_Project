import { Box, Button, MenuItem, Select, TextField, Typography } from "@mui/material";
import { useContext, useEffect } from "react";
import { CreatePostContext } from "./CreatePost.store";
import { observer } from "mobx-react-lite";

const CreatePost = observer(() => {
    const {
        post,
        reset,
        setAuthor,
        setDescription,
        setTitle,
        setType,
        addPost
    } = useContext(CreatePostContext);

    const createPost = async () => {
        await addPost();
        reset();
    };

    useEffect(() => {
        return () => {
            reset();
        };
    }, [reset]);

    return (
        <Box sx={{
            minHeight: "100%",
            padding: "1rem",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
        }}>
            <Box
                style={{
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
                <Typography variant="h6">Create a post:</Typography>
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
                            value={post.title}
                            onChange={e => setTitle(e.target.value)}
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
                    <Box
                        sx={{
                            minWidth: 120,
                            display: "flex",
                            flexDirection: "column",
                            gap: "0.3rem",

                            '@media (max-width: 800px)': {
                                alignSelf: "end"
                            },
                        }}
                    >
                        <Typography>Types:</Typography>
                        <Select
                            required
                            value={post.type}
                            onChange={e => setType(e.target.value)}
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
                        value={post.description}
                        onChange={e => setDescription(e.target.value)}
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
                        value={post.author}
                        onChange={e => setAuthor(e.target.value)}
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
                <Button
                    onClick={createPost}
                    style={{
                        backgroundColor: "#0a6a29",
                        alignSelf: "end"
                    }}
                    variant="contained">
                    Post
                </Button>
            </Box>
        </Box >
    )
});

export default CreatePost;