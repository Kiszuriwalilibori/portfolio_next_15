// "use client";

import moment from "moment";
import Gravatar from "./Gravatar";
// import Gravatar from "react-gravatar";
// import removeComment from "fbase/firestore/removeComment";

// import { MouseEventHandler, useCallback } from "react";

import { Box, Typography } from "@mui/material";
import { CommentType } from "@/types";
import { Actions, Author, CommentDivider, CommentPaper, SummaryStack, When } from "./Comments.style";

// import { useAuthContext } from "@/contexts";

// import { useMessage } from "@/hooks";
import Icons from "@/components/common/icons";

interface Props {
    comment: CommentType;
}
export const Comment = (props: Props) => {
    const { comment } = props;
    //     const { user, isLogged } = useAuthContext();
    //     const showMessage = useMessage();

    //     const handleError = useCallback((message: string) => {
    //         showMessage.error("Error: " + message);
    //     }, []);

    //     const handleSuccess = useCallback(() => {
    //         showMessage.success("Your comment has been removed");
    //     }, []);

    //     const handleRemoveComment = useCallback(() => {
    //         removeComment(comment.ID, handleSuccess, handleError);
    //         // eslint-disable-next-line react-hooks/exhaustive-deps
    //     }, [comment.ID]);

    return (
        <CommentPaper>
            <SummaryStack spacing={1} direction="row">
                <Gravatar authorEmail={comment.authorEmail} />
                <Author id="Author">{comment.author}</Author>
                <When id="When">{moment(comment.created).fromNow()}</When>
            </SummaryStack>
            <CommentDivider />
            <Box>
                <Typography>{comment.content}</Typography>
            </Box>

            <CommentDivider />
            <Actions>{/* TODO tu content od atentykacji                */}</Actions>
        </CommentPaper>
    );
};

export default Comment;
