/*
export const POST_API = {
    GET_POSTS: '/api/posts',
    GET_POST_BY_ID: (id) => `/api/posts/${id}`,
    CREATE_POST: '/api/posts/create',
};
*/

export const POST_API = {
    GET_POSTS : '/api/posts/',
    GET_POSTS_TYPE : (type) => `/api/posts/?type=${type}`,
    GET_POSTS_ID_TYPE : (id) => `/api/posts/read_post/?id=${id}`,
    DELETE_POST: (postId) => `/api/posts/${postId}/`,
    EDIT_POST : (postId) => `/api/posts/${postId}/`,
    CREATE_POSTS:'/api/posts/'
}