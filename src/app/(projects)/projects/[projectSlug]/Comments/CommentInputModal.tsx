"use client";

import Button from "@mui/material/Button";

import { useCallback, useEffect, useState } from "react";

import Modal from "@/components/modal";
import Icons from "@/components/common/icons";

import { ModalProps } from "@/types";
import { ButtonsStack, CommentTextField, MicrophoneButton, listeningMicrophoneSx } from "./Comments.style";
import { useComment, useMessage, useSpeech } from "@/hooks";
import { validateAndSubmitComment } from "../AddComment/utils";

interface Props extends Omit<ModalProps, "title"> {
    author: string;
    project: string;
    authorEmail: string;
    ID: string;
    onCommentAdded?: () => void;
}

const INITIAL_COMMENT = "" as string;

export const CommentInputModal = (props: Props) => {
    const { isOpen, onClose, author, authorEmail, project, ID, onCommentAdded } = props;
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { comment, createComment, clearComment } = useComment(INITIAL_COMMENT);
    const { toggleListening, listening, isSpeechRecognitionSupported } = useSpeech(createComment);
    const showMessage = useMessage();

    const handleError = useCallback(
        (message: string) => {
            showMessage.error("Error: " + message);
        },
        [showMessage]
    );

    const handleSuccess = useCallback(() => {
        showMessage.success("Comment posted successfully!");
    }, [showMessage]);

    const handleInvalidComment = useCallback(() => {
        showMessage.warning("Your comment was not published due to potentially toxic or abusive content.");
    }, [showMessage]);

    const sendComment = useCallback(async () => {
        if (!comment.trim()) {
            handleError("Comment cannot be empty");
            return;
        }
        if (isSubmitting) {
            handleError("Comment is already being submitted");
            return;
        }
        setIsSubmitting(true);
        const newCommentInfo = {
            author,
            active: true,
            content: comment,
            created: Date.now(),
            authorEmail,
            project,
            projectID: ID,
        };
        try {
            const response = await fetch("/api/add-comment", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(newCommentInfo),
            });

            if (!response.ok) {
                const { error } = await response.json();
                throw new Error(error || "Failed to submit comment");
            }

            if (onCommentAdded) {
                onCommentAdded();
            }

            handleSuccess();
            clearComment();
            onClose();
        } catch (error) {
            handleError(error instanceof Error ? error.message : "Unknown error");
        } finally {
            setIsSubmitting(false);
        }
    }, [comment, author, authorEmail, project, ID, clearComment, onClose, handleError, handleSuccess, onCommentAdded]);

    useEffect(() => {
        if (isSubmitting) {
            showMessage.info("Submitting your comment...");
        }
    }, [isSubmitting, showMessage]);

    return (
        <Modal
            title="Comment"
            subtitle="Type your comments in form below:"
            isOpen={isOpen}
            onClose={onClose}
            content={
                <CommentTextField
                    id="comment-text-field"
                    label="Comment"
                    multiline
                    rows={8}
                    value={comment}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                        createComment(event.target.value);
                    }}
                    aria-describedby="comment-error"
                />
            }
            actions={
                <ButtonsStack direction="row" spacing={2} id="Buttons stack">
                    <Button disabled={comment === INITIAL_COMMENT || isSubmitting} color="success" variant="contained" onClick={() => validateAndSubmitComment(comment, sendComment, handleInvalidComment, showMessage)} id="accept-button">
                        Accept
                    </Button>
                    <Button disabled={comment === INITIAL_COMMENT} variant="contained" color="warning" onClick={clearComment} id="clear-button">
                        Clear
                    </Button>
                    <MicrophoneButton sx={{ ...listeningMicrophoneSx(listening) }} className="with-tooltip" data-tooltip={"Switch microphone"} aria-label="Search by voice" disabled={!isSpeechRecognitionSupported} onClick={toggleListening}>
                        {Icons.microphone}
                    </MicrophoneButton>
                </ButtonsStack>
            }
        />
    );
};

export default CommentInputModal;
