const COMMENTS_VALIDITY_THRESHOLD = 0.75;

export function validateCommentIntents(intents: { [x: string]: { summaryScore: { value: any } } }) {
    let validity = true;
    Object.keys(intents).forEach(key => {
        const probability = intents[key].summaryScore.value;
        if (probability >= COMMENTS_VALIDITY_THRESHOLD) {
            validity = false;
        }
    });
    return validity;
}
