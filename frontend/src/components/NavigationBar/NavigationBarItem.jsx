import { NavLink } from "react-router-dom";
import classNames from "classnames";
import { Typography } from "@mui/material";

import "./NavigationBarItem.css";

export const NavigationBarItem = ({ text, url, onClick, fGrow, variant }) => {

    return (
        <Typography component="div" sx={{ flexGrow: fGrow }} variant={variant}>
            <NavLink
                to={url}
                className={({ isActive }) => classNames("linkItem", {
                    "linkItem active": isActive
                })}
                onClick={onClick}>
                {text}
            </NavLink>
        </Typography >
    )
};