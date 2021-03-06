const api = 'http://localhost:3001';

const headers = {
  Authorization: 'sergdenisov',
  Accept: 'application/json',
  'Content-Type': 'application/json',
};

export const getCategories = () =>
  fetch(`${api}/categories`, { headers })
    .then(res => res.json())
    .then(data => data.categories);

export const getPosts = () =>
  fetch(`${api}/posts`, { headers })
    .then(res => res.json())
    .then(posts => posts);

export const getPostsByCategory = category =>
  fetch(`${api}/${category}/posts`, { headers })
    .then(res => res.json())
    .then(posts => posts);

export const addPost = postData =>
  fetch(`${api}/posts`, {
    method: 'POST',
    headers,
    body: JSON.stringify(postData),
  })
    .then(res => res.json())
    .then(post => post);

export const votePost = data =>
  fetch(`${api}/posts/${data.id}`, {
    method: 'POST',
    headers,
    body: JSON.stringify(data),
  })
    .then(res => res.json())
    .then(post => post);

export const getPostComments = postId =>
  fetch(`${api}/posts/${postId}/comments`, { headers })
    .then(res => res.json())
    .then(comments => comments);

export const deletePost = postId =>
  fetch(`${api}/posts/${postId}`, {
    method: 'DELETE',
    headers,
    body: JSON.stringify(postId),
  })
    .then(res => res.json())
    .then(post => post);

export const editPost = data =>
  fetch(`${api}/posts/${data.id}`, {
    method: 'PUT',
    headers,
    body: JSON.stringify(data),
  })
    .then(res => res.json())
    .then(post => post);

export const getPost = postId =>
  fetch(`${api}/posts/${postId}`, { headers })
    .then(res => res.json())
    .then(post => post);

export const getComment = commentId =>
  fetch(`${api}/comments/${commentId}`, { headers })
    .then(res => res.json())
    .then(post => post);

export const addComment = commentData =>
  fetch(`${api}/comments`, {
    method: 'POST',
    headers,
    body: JSON.stringify(commentData),
  })
    .then(res => res.json())
    .then(comment => comment);

export const voteComment = data =>
  fetch(`${api}/comments/${data.id}`, {
    method: 'POST',
    headers,
    body: JSON.stringify(data),
  })
    .then(res => res.json())
    .then(comment => comment);

export const editComment = data =>
  fetch(`${api}/comments/${data.id}`, {
    method: 'PUT',
    headers,
    body: JSON.stringify(data),
  })
    .then(res => res.json())
    .then(comment => comment);

export const deleteComment = commentId =>
  fetch(`${api}/comments/${commentId}`, {
    method: 'DELETE',
    headers,
    body: JSON.stringify(commentId),
  })
    .then(res => res.json())
    .then(comment => comment);
