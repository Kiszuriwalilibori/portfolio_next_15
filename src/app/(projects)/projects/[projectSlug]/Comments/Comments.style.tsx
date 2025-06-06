"use client";
import Stack from "@mui/material/Stack";
import theme from "@/themes";
import { styled } from "@mui/system";
import Paper from "@mui/material/Paper";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import { Button, TextField } from "@mui/material";

const INITIAL_BTN_MIC_COLOR = "rgba(67, 84, 22, 0.4)";
const COLOR_SUNNY_DARK = "#ffb800";
const COLOR_SUNNY_HOVER = "#ffe37e";

export const SummaryStack = styled(Stack)(({ theme }) => ({
    alignItems: "center",
}));

export const Author = styled("h3")(({ theme }) => ({
    lineHeight: 1,
    fontSize: "clamp(12px, 3.125vw, 16px) !important",
    fontWeight: 700,
}));

export const When = styled("span")(({ theme }) => ({
    color: theme.palette.primary.dark,
    fontWeight: 500,
    fontStyle: "italic",
}));

export const CommentPaper = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.grey[300],
    border: "2px solid grey",
    padding: theme.spacing(1),
}));

export const CommentDivider = styled(Divider)(({ theme }) => ({
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
    color: theme.palette.grey[900],
    borderBottomWidth: 2,
}));

export const RemoveButton = styled(IconButton)(({ theme }) => ({
    color: theme.palette.error.main,
    width: "40px",
    height: "40px",
}));

export const Actions = styled(Stack)(({ theme }) => ({
    alignItems: "center",
}));

export const CommentsButton = styled(Button)(({ theme }) => ({
    display: "block",
    margin: "0 auto",
    marginTop: theme.spacing(4),
}));

export const CommentTextField = styled(TextField)(({ theme }) => ({
    marginTop: theme.spacing(3),
}));
export const CommentsStack = styled(Stack)(({ theme }) => ({
    margin: theme.spacing(1),
}));
export const ButtonsStack = styled(Stack)(({ theme }) => ({
    margin: "0 auto",
    width: "180px",
    marginTop: theme.spacing(3),
}));

export const MicrophoneButton = styled(IconButton)(({ theme }) => ({
    backgroundColor: INITIAL_BTN_MIC_COLOR,
    marginLeft: theme.spacing(0.5),
    padding: "10px",
    width: "40px",
    height: "40px",
    color: theme.palette.common.black,
    "@media(max-width: 430px)": { display: "none" },
    "&.Mui-disabled": {
        opacity: 0.3,
    },
}));

export const listeningMicrophoneSx = (listening: boolean) => {
    if (listening) {
        return {
            backgroundColor: COLOR_SUNNY_DARK,
            animation: "bgr 1s infinite",
            "&:hover": {
                backgroundColor: COLOR_SUNNY_HOVER,
            },

            "@keyframes bgr": {
                "0%": {
                    backgroundColor: COLOR_SUNNY_DARK,
                },
                "50%": {
                    backgroundColor: COLOR_SUNNY_HOVER,
                },
                "100%": {
                    backgroundColor: COLOR_SUNNY_DARK,
                },
            },
        };
    } else {
        return {
            backgroundColor: INITIAL_BTN_MIC_COLOR,
            "&:hover": {
                backgroundColor: "lightgrey",
            },
        };
    }
};
