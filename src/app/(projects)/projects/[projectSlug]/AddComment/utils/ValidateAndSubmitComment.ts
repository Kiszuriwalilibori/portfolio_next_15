import axios from "axios";
import { validateCommentIntents } from "./validateCommentIntents";
import { MessageMethods } from "@/hooks/useMessage";

let lastRequestTime = 0;
const MIN_REQUEST_INTERVAL = 1000;

export const PERSPECTIVE_API_URL = `https://commentanalyzer.googleapis.com/v1alpha1/comments:analyze?key=${process.env.NEXT_PUBLIC_FIREBASE_API_KEY}`;

const config = {
    languages: ["en"],
    requestedAttributes: {
        TOXICITY: {},
        INSULT: {},
        FLIRTATION: {},
        THREAT: {},
    },
};

export const validateAndSubmitComment = async (comment: string, onSuccess: (comment: string) => Promise<void>, handleInvalidComment: () => void, showMessage: MessageMethods): Promise<void> => {
    const currentTime = Date.now();
    if (currentTime - lastRequestTime < MIN_REQUEST_INTERVAL) {
        showMessage.warning("Please wait a moment before submitting another comment.");
        handleInvalidComment();
        return;
    }
    lastRequestTime = currentTime;

    try {
        const response = await axios.post(PERSPECTIVE_API_URL, {
            comment: { text: comment },
            ...config,
        });

        const intents = response.data.attributeScores;
        const isCommentValid = validateCommentIntents(intents);

        if (isCommentValid) {
            await onSuccess(comment);
        } else {
            handleInvalidComment();
        }
    } catch (error) {
        showMessage.error("Failed to analyze comment. Proceeding with submission.");
        await onSuccess(comment);
    }
};
export default validateAndSubmitComment;
