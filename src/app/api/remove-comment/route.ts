import { deleteDoc, doc, getFirestore } from "firebase/firestore";
import firebase_app from "@/fbase/config";
import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";

export async function DELETE(request: NextRequest) {
    try {
        const body = await request.json().catch(() => null);

        if (!body) {
            return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
        }

        const { commentId, projectID } = body;

        if (!commentId || !projectID) {
            return NextResponse.json({ error: "Missing required fields: commentId and projectID are required" }, { status: 400 });
        }

        const db = getFirestore(firebase_app);
        const commentRef = doc(db, "comments", commentId);

        await deleteDoc(commentRef);

        const path = `/projects/${projectID}`;
        revalidatePath(path);

        return NextResponse.json({ message: "Comment removed successfully" }, { status: 200 });
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : "Unknown error occurred";

        return NextResponse.json({ error: `Failed to remove comment: ${errorMessage}` }, { status: 500 });
    }
}
