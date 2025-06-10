"use client";

import { useCallback, useState } from "react";
import { useRouter } from "next/navigation";
import { useFirebaseAuth } from "@/contexts";
import { useMessage } from "@/hooks";
import Icons from "@/components/common/icons";
import { Actions, RemoveButton } from "./Comments.style";

interface Props {
    commentId: string;
    commentAuthor: string;
    projectID: string;
}

const CommentActions = ({ commentId, commentAuthor, projectID }: Props) => {
    const { user, isLogged } = useFirebaseAuth();
    const [isRemoving, setIsRemoving] = useState(false);
    const router = useRouter();
    const showMessage = useMessage();

    const handleError = useCallback(
        (message: string) => {
            showMessage.error("Error: " + message);
            setIsRemoving(false);
        },
        [showMessage]
    );

    const handleSuccess = useCallback(() => {
        showMessage.success("Your comment has been removed");
        router.refresh();
        setIsRemoving(false);
    }, [showMessage, router]);

    const handleRemoveComment = useCallback(async () => {
        if (isRemoving) {
            showMessage.warning("Comment is already being removed");
            return;
        }
        setIsRemoving(true);
        showMessage.info("Removing comment...");
        try {
            const response = await fetch(`/api/remove-comment`, {
                method: "DELETE",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ projectID, commentId }),
            });

            if (!response.ok) {
                const { error } = await response.json();
                throw new Error(error || "Failed to removed comment");
            }

            handleSuccess();
        } catch (error) {
            handleError(error instanceof Error ? error.message : "Unknown error");
        }
    }, [commentId, projectID, handleSuccess, handleError]);

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
