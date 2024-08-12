import { useState, useEffect } from "react";
import commentsAPI from "../api/comments-api";

export function useCreateComment() {
    const createHandler = (adId, text) =>  commentsAPI.createComment(adId, text)
    
    return createHandler;
};

export function useGetAllComments(adId) {
    const [comments, setComments] = useState([]);
    const [fetchTrigger, setFetchTrigger] = useState(false);

    useEffect(() => {
        (async () => {
            const result = await commentsAPI.getAllComments(adId);
                
            setComments(result);
        })();
    }, [adId, fetchTrigger]);
    
    const refetchComments = () => {
        setFetchTrigger(prev => !prev);
    };

    return [comments, setComments, refetchComments];
}