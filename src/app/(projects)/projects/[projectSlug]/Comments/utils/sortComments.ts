import { CommentType } from "@/types";

export function sortCommentsByCreated(comments: CommentType[]): CommentType[] {
    return [...comments].sort((a, b) => a.created - b.created);
}
