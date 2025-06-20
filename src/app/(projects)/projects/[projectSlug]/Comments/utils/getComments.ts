import { getDocs, collection, query, where, getFirestore } from "firebase/firestore";
import firebase_app from "@/fbase/config";
import { CommentType } from "@/types";

interface FetchError {
    message: string;
    code?: string;
}

interface GetCommentsResult {
    comments: CommentType[];
    error: FetchError | null;
}

export async function getComments(projectID: string): Promise<GetCommentsResult> {
    const db = getFirestore(firebase_app);
    let comments: CommentType[] = [];
    let error: FetchError | null = null;

    try {
        const commentsQuery = query(collection(db, "comments"), where("projectID", "==", projectID));
        const querySnapshot = await getDocs(commentsQuery);
        // if (querySnapshot.empty) {
        //     return { comments: [], error: null }; // No comments found
        // }

        comments = querySnapshot.docs.map(
            doc =>
                ({
                    ...doc.data(),
                    ID: doc.id,
                } as CommentType)
        );
    } catch (err) {
        const firebaseError = err as { code?: string; message: string };
        error = {
            message: firebaseError.message || `Failed to fetch comments for project ${projectID}`,
            code: firebaseError.code,
        };
    }

    return { comments, error };
}
