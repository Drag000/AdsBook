import { useState, useEffect } from "react";
import commentsAPI from "../api/comments-api";



export function useGetAllComments(adId) {
    const [comments, setComments] = useState([]);
    const [fetchTrigger, setFetchTrigger] = useState(false);

    useEffect(() => {
        (async () => {
            const result = await commentsAPI.getAllComments(adId);
            console.log('COMMENTS', result);
            setComments(result);
        })();
    }, [adId, fetchTrigger]);

    const refetchComments = () => {
        console.log('BBBBBBBBB')
        setFetchTrigger(prev => !prev);
        console.log('fetchTrigger', fetchTrigger)
    };

    return [comments, refetchComments];
}

export function useCreateComment() {
    const createHandler = async (adId, text) => {
        const ad_id = adId


        await commentsAPI.createComment(ad_id, text)


    }
    return createHandler;
};



export function useDeleteComment() {
    const deleteHandler = async (commentId) => {

        await commentsAPI.removeComment(commentId)

    }
    return deleteHandler;
};