import { observer } from "mobx-react-lite";
import { Link } from "react-router-dom";
import { ROUTES_CONSTANTS } from "../../shared/RoutesConstants";
import { useUserService } from "../../services/userService/UseUserService";
import { capitalizeFirstLetter } from "../../shared/StringFunctions";
import { Box, Typography } from "@mui/material";

const Post = observer(({ props }) => {

    const { isAuthenticated } = useUserService();

    return (
        <Box
            sx={{
                width: "100%",
                padding: "1.5rem",
                backgroundColor: "white",
                borderRadius: "15px",
                display: "flex",
                flexDirection: "column",
                gap: "1rem",
                boxShadow: "rgba(0, 0, 0, 0.2) 0px 12px 28px 0px, rgba(0, 0, 0, 0.1) 0px 2px 4px 0px, rgba(255, 255, 255, 0.05) 0px 0px 0px 1px inset",
            }}
        >
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "space-between",

                    '@media (max-width: 800px)': {
                        gap: "3rem"
                    },
                }}
            >
                <Typography
                    sx={{
                        wordBreak: "break-word",

                        '@media (max-width: 800px)': {
                            fontSize: "1.2rem",
                        },
                    }}
                    variant="h5" fontWeight={600}>
                    {capitalizeFirstLetter(props.attributes.title)}
                </Typography>
                <Typography
                    sx={{
                        '@media (max-width: 800px)': {
                            fontSize: ".9rem",
                            color: "#0047ab",
                            fontWeight: 600,
                        },
                    }}
                >{capitalizeFirstLetter(props.attributes.type)}</Typography>
            </Box>
            <Typography
                sx={{
                    wordBreak: "break-word",
                }}
            >{capitalizeFirstLetter(props.attributes.description)}</Typography>
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "baseline",

                    '@media (max-width: 800px)': {
                        gap: "3rem"
                    },
                }}
            >
                <Box sx={{ display: "flex", gap: 1, wordBreak: "break-word", }}>
                    {
                        props.attributes.author && (
                            <>
                                <Typography
                                    sx={{ wordBreak: "normal" }}
                                    variant="subtitle2"
                                >
                                    Author:
                                </Typography>
                                <Typography
                                    variant="subtitle2"
                                    style={{
                                        color: "#808080"
                                    }}
                                >{
                                        capitalizeFirstLetter(props.attributes.author)
                                    }
                                </Typography>
                            </>
                        )
                    }
                </Box>
                <Typography
                    sx={{
                        alignSelf: "end"
                    }}
                >
                    <Link
                        to={isAuthenticated() ?
                            `${ROUTES_CONSTANTS.EditPostRoute}/${props.id}` :
                            `${ROUTES_CONSTANTS.LoginRoute}`}>
                        Edit
                    </Link>
                </Typography>
            </Box>
        </Box >
    )
})

export default Post;