import { addDoc, collection, getFirestore } from "firebase/firestore";
import firebase_app from "@/fbase/config";
import { CommentType } from "@/types";
import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";

export async function POST(request: NextRequest) {
    try {
        const comment: CommentType = await request.json();

        if (!comment.projectID || !comment.content || !comment.author || !comment.authorEmail) {
            return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
        }

        const db = getFirestore(firebase_app);

        const docRef = await addDoc(collection(db, "comments"), {
            author: comment.author,
            active: comment.active,
            content: comment.content,
            created: comment.created,
            authorEmail: comment.authorEmail,
            project: comment.project,
            projectID: comment.projectID,
        });

        const path = `/projects/${comment.projectID}`;
        revalidatePath(path);

        return NextResponse.json({ id: docRef.id }, { status: 200 });
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : "Unknown error occurred";
        return NextResponse.json({ error: `Failed to save comment: ${errorMessage}` }, { status: 500 });
    }
}
