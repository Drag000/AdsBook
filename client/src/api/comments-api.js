import * as request from './requester'

const BASE_URL = 'http://localhost:3030/data/comments';

const createComment = (adId, text) => request.post(BASE_URL, { adId, text });

const getAllComments = (adId) => {
    const params = new URLSearchParams({
        where: `adId="${adId}"`,
        load: `author=_ownerId:users`,
    });

    return request.get(`${BASE_URL}?${params.toString()}`);

}


const commentsAPI = {
    createComment,
    getAllComments,
};

export default commentsAPI;