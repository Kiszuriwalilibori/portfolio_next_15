"use client";

import { useCallback } from "react";
import { useRouter } from "next/navigation";
import { useFirebaseAuth } from "@/contexts";
import { useMessage } from "@/hooks";
import Icons from "@/components/common/icons";
import removeComment from "@/fbase/firestore/removeComment";
import { Actions, RemoveButton } from "./Comments.style";

interface Props {
    commentId: string;
    commentAuthor: string;
}

const CommentActions = ({ commentId, commentAuthor }: Props) => {
    const { user, isLogged } = useFirebaseAuth();
    const router = useRouter();
    const showMessage = useMessage();

    const handleError = useCallback(
        (message: string) => {
            showMessage.error("Error: " + message);
        },
        [showMessage]
    );

    const handleSuccess = useCallback(() => {
        showMessage.success("Your comment has been removed");
        router.refresh();
    }, [showMessage]);

    const handleRemoveComment = useCallback(() => {
        removeComment(commentId, handleSuccess, handleError);
    }, [commentId, handleSuccess, handleError]);

    if (!isLogged || !user || user.displayName !== commentAuthor) {
        return <Actions />;
    }

    return (
        <Actions id="Actions">
            <RemoveButton id="remove-button" aria-label="remove comment" onClick={handleRemoveComment}>
                {Icons.close}
            </RemoveButton>
        </Actions>
    );
};

export default CommentActions;
