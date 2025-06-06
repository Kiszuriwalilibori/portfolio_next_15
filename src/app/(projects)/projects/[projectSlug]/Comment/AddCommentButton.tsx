"use client";

import { useCallback, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { useRouter } from "next/navigation";
import { CommentType } from "@/types";
import { useBoolean, useMessage } from "@/hooks";
import { requestLogin } from "@/fbase";
import { useFirebaseAuth } from "@/contexts";
import { CommentsButton } from "./Comment.style";
import { CommentInputModal } from "../AddComment/CommentInputModal";
import { CommentsStack } from "../Comments/Comments.style";

import Comment from ".";

interface Props {
    title: string;
    ID: string;
}

export const AddCommentButton = (props: Props) => {
    const { title, ID } = props;
    const [isModalOpen, openModal, closeModal] = useBoolean(false);
    const { user, isLogged } = useFirebaseAuth();
    const showMessage = useMessage();
    const [optimisticComments, setOptimisticComments] = useState<CommentType[]>([]);
    const [refreshKey, setRefreshKey] = useState(0);
    const router = useRouter();

    const handleLeaveACommentClick = useCallback(() => {
        if (isLogged && user) {
            openModal();
        } else {
            requestLogin(
                () => openModal(),
                (error: string) => showMessage.error(`Login failed: ${error}`)
            );
        }
    }, [isLogged, user, openModal, showMessage]);

    const handleCommentAdded = useCallback(
        (comment: CommentType | null) => {
            if (comment === null) {
                setOptimisticComments([]);
                return;
            }
            setOptimisticComments([comment]);
            setRefreshKey(prev => prev + 1);

            router.refresh();
            closeModal();
        },
        [router]
    );
    useEffect(() => {
        setOptimisticComments([]);
    }, [refreshKey, ID]);

    const commentsContainer = typeof document !== "undefined" ? document.getElementById("comments-stack") : null;

    return (
        <>
            <CommentsButton variant="contained" onClick={handleLeaveACommentClick} id="add-comment-button" aria-label="Leave a comment on the project">
                Leave a comment
            </CommentsButton>
            {commentsContainer &&
                createPortal(
                    <CommentsStack spacing={1}>
                        {optimisticComments.map(comment => (
                            <Comment comment={comment} key={comment.ID} />
                        ))}
                    </CommentsStack>,
                    commentsContainer
                )}

            {isModalOpen && user && <CommentInputModal isOpen={isModalOpen} onClose={closeModal} author={user.displayName || "Anonymous"} authorEmail={user.email || ""} project={title} ID={ID} onCommentAdded={handleCommentAdded} />}
        </>
    );
};

export default AddCommentButton;

// <SnackbarContainer dense={false} anchorOrigin={{vertical:"top", ...}} classes={undefined}>
// >                             <div className="notistack-SnackbarContainer go3118922589 go4034260886 go1141946668"></div>
