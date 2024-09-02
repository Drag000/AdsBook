import * as request from './requester'

const BASE_URL = 'http://localhost:8000/common/comments';

const createComment = (adId, text) => request.post(`${BASE_URL}/${adId}/create/`, { ad_id: adId, text });

const getAllComments = (adId) => {

    return request.get(`${BASE_URL}/${adId}/all/`);

}

export const removeComment = async (commentId) => await request.del(`${BASE_URL}/delete/${commentId}`);

const commentsAPI = {
    createComment,
    getAllComments,
    removeComment,
};

export default commentsAPI;