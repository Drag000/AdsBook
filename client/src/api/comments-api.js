import * as request from './requester'
import { BASE_URL} from './config-api'

const COMMENTS_BASE_URL = `${BASE_URL}/common/comments`;

const createComment = (adId, text) => request.post(`${COMMENTS_BASE_URL}/${adId}/create/`, { ad_id: adId, text });

const getAllComments = (adId) => request.get(`${COMMENTS_BASE_URL}/${adId}/all/`);

export const removeComment = async (commentId) => await request.del(`${COMMENTS_BASE_URL}/delete/${commentId}`);

const commentsAPI = {
    createComment,
    getAllComments,
    removeComment,
};

export default commentsAPI;