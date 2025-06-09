// "use client";

import moment from "moment";
import Gravatar from "./Gravatar";

// // import { MouseEventHandler, useCallback } from "react";

import { Box, Typography } from "@mui/material";
import { CommentType } from "@/types";
import { Author, CommentDivider, CommentPaper, SummaryStack, When } from "./Comments.style";

import CommentActions from "./CommentActions";

interface Props {
    comment: CommentType;
}
export const Comment = (props: Props) => {
    const { comment } = props;

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
            <CommentActions commentId={comment.ID} commentAuthor={comment.author} />
        </CommentPaper>
    );
};

export default Comment;
