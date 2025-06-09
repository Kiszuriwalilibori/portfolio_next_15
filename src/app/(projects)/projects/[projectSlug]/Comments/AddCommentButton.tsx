"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useBoolean, useMessage } from "@/hooks";
import { requestLogin } from "@/fbase";
import { useFirebaseAuth } from "@/contexts";
import { CommentsButton } from "./Comments.style";
import { CommentInputModal } from "./CommentInputModal";

interface Props {
    title: string;
    ID: string;
}

export const AddCommentButton = (props: Props) => {
    const { title, ID } = props;
    const [isModalOpen, openModal, closeModal] = useBoolean(false);
    const { user, isLogged } = useFirebaseAuth();
    const showMessage = useMessage();

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

    const handleCommentAdded = useCallback(() => {
        router.refresh();
        closeModal();
    }, [router]);

    return (
        <>
            <CommentsButton variant="contained" onClick={handleLeaveACommentClick} id="add-comment-button" aria-label="Leave a comment on the project">
                Leave a comment
            </CommentsButton>

            {isModalOpen && user && <CommentInputModal isOpen={isModalOpen} onClose={closeModal} author={user.displayName || "Anonymous"} authorEmail={user.email || ""} project={title} ID={ID} onCommentAdded={handleCommentAdded} />}
        </>
    );
};

export default AddCommentButton;
